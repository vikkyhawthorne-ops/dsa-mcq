import { createSlice, createEntityAdapter, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Anomaly } from './primitives/Anomaly';
import { dbService } from '../../common/services/dbService';

export const hydrateAnomalies = createAsyncThunk<Anomaly[]>(
    'anomalies/hydrate',
    async () => {
        const anomalies = await dbService.getAll('anomalies');
        // The evidence field needs to be parsed from JSON
        return anomalies.map(a => ({ ...a, evidence: JSON.parse(a.evidence) })) as Anomaly[];
    }
);

const anomaliesAdapter = createEntityAdapter<Anomaly, string>({
  selectId: (anomaly) => anomaly.id,
});

const anomaliesSlice = createSlice({
  name: 'anomalies',
  initialState: anomaliesAdapter.getInitialState(),
  reducers: {
    addAnomaly: anomaliesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateAnomalies.fulfilled, (state, action) => {
        anomaliesAdapter.setAll(state, action.payload);
    });
  },
});

export const { addAnomaly } = anomaliesSlice.actions;

export default anomaliesSlice.reducer;
