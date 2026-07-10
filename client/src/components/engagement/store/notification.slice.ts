import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createAsyncThunk,
  Update,
} from '@reduxjs/toolkit';
import { Notification } from './primitives/Notification';
import { dbService } from '../../common/services/dbService';
import { syncService } from '../../common/services/syncService';

// --- ENTITY ADAPTER ---
const notificationsAdapter = createEntityAdapter<Notification>({
  selectId: (notification) => notification.id,
});

// --- ASYNC THUNKS ---

export const hydrateNotifications = createAsyncThunk<Notification[], void, { state: any }>(
  'notifications/hydrate',
  async (_, thunkAPI) => {
    const notifications = await dbService.getAll('notifications');

    await syncService.performSync(thunkAPI.dispatch, thunkAPI.getState);

    const syncedNotifications = await dbService.getAll('notifications');
    // The data from DB is plain object, we can cast it if structure matches
    return syncedNotifications as Notification[];
  },
);

export const addNotificationDb = createAsyncThunk<
  Notification,
  { id: string; userId: string; message: string; type: 'reminder' | 'nudge'; sendAt: number }
>('notifications/add', async (notificationData) => {
  const newNotification = new Notification(
    notificationData.id,
    notificationData.userId,
    notificationData.message,
    notificationData.type,
    notificationData.sendAt,
  );
  const notifToSave = { ...newNotification, is_dirty: 1 };
  await dbService.create('notifications', notifToSave);
  return newNotification;
});

export const markAsReadDb = createAsyncThunk<Update<Notification>, string>(
  'notifications/markAsRead',
  async (notificationId) => {
    const update = { id: notificationId, changes: { isRead: 1, is_dirty: 1 } };
    await dbService.update('notifications', notificationId, update.changes);
    return update;
  },
);

export const removeNotificationDb = createAsyncThunk<string, string>(
  'notifications/remove',
  async (notificationId) => {
    await dbService.delete('notifications', notificationId);
    return notificationId;
  },
);


// --- SLICE DEFINITION ---
const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrateNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        notificationsAdapter.setAll(state, action.payload);
      })
      .addCase(addNotificationDb.fulfilled, (state, action: PayloadAction<Notification>) => {
        notificationsAdapter.addOne(state, action.payload);
      })
      .addCase(markAsReadDb.fulfilled, (state, action: PayloadAction<Update<Notification>>) => {
        notificationsAdapter.updateOne(state, action.payload);
      })
      .addCase(removeNotificationDb.fulfilled, (state, action: PayloadAction<string>) => {
        notificationsAdapter.removeOne(state, action.payload);
      });
  },
});

export default notificationSlice.reducer;
