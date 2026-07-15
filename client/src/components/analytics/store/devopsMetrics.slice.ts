import { createSlice, createEntityAdapter, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { DevOpsMetric } from './primitives/DevOpsMetric';
import { sqliteService } from '../../common/services/sqliteService';

export const hydrateDevOpsMetrics = createAsyncThunk<DevOpsMetric[]>(
    'devopsMetrics/hydrate',
    async () => {
        const metrics = await sqliteService.getAll('devops_metrics');
        // The payload field needs to be parsed from JSON
        return metrics.map(m => ({ ...m, payload: JSON.parse(m.payload) })) as DevOpsMetric[];
    }
);

export const syncMetricsWithServer = createAsyncThunk<void, void, { state: any }>(
    'devopsMetrics/sync',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.user?.token;
            if (!token) return;

            const metrics = await sqliteService.getAll('devops_metrics');
            const dirtyMetrics = metrics.filter(m => m.is_dirty === 1);

            for (const metric of dirtyMetrics) {
                const response = await fetch('http://localhost:3000/api/analytics/devops', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        type: metric.type,
                        payload: JSON.parse(metric.payload),
                    }),
                });

                if (response.ok) {
                    await sqliteService.update('devops_metrics', metric.id, { ...metric, is_dirty: 0 });
                }
            }
        } catch (error) {
            console.error('[syncMetricsWithServer] Failed to sync devops metrics:', error);
        }
    }
);

const devopsMetricsAdapter = createEntityAdapter<DevOpsMetric, String>({
  selectId: (metric) => metric.id,
});

const devopsMetricsSlice = createSlice({
  name: 'devopsMetrics',
  initialState: devopsMetricsAdapter.getInitialState(),
  reducers: {
    addMetric: devopsMetricsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateDevOpsMetrics.fulfilled, (state, action) => {
        devopsMetricsAdapter.setAll(state, action.payload);
    });
  },
});

export const { addMetric } = devopsMetricsSlice.actions;
export default devopsMetricsSlice.reducer;
