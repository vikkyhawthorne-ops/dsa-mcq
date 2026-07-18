import { dbService } from '@/components/common/services/dbService';
import { hydrateCategories } from '@/components/learning/store/category.slice';
import { API_BASE_URL } from '../../../config';
import { hydrateLearningSession } from '@/components/learning/store/learningSession.slice';
import { hydrateUserQuestionData } from '@/components/learning/store/userQuestionData.slice';
import { hydrateNotifications } from '@/components/engagement/store/notification.slice';
import { hydrateUserEngagements } from '@/components/engagement/store/userEngagement.slice';
import { syncService } from '@/components/common/services/syncService';

/**
 * Initializes, checks, fetches initial server data if empty, and hydrates all local component stores.
 * This runs as a script/service during root store initialization.
 */
export const initializeDatabase = async (dispatch: any, getState: any) => {
  try {
    console.log('[dbInitService] Registering store entities dynamically...');
    if (typeof (dbService as any).registerEntity === 'function') {
      (dbService as any).registerEntity('categories', ['id', 'name', 'masteryScore', 'createdAt', 'updatedAt', 'is_dirty']);
      (dbService as any).registerEntity('learning_sessions', ['id', 'userId', 'allQuestionIds', 'questionIds', 'subsetHistory', 'currentQuestionIndex', 'answers', 'summary', 'startTime', 'endTime', 'createdAt', 'updatedAt', 'is_dirty']);
      (dbService as any).registerEntity('user_question_data', ['id', 'questionId', 'userId', 'correctAttempts', 'totalAttempts', 'recallStrength', 'lastAttemptTimestamp', 'techniqueTransferScores', 'sm2', 'createdAt', 'updatedAt', 'is_dirty']);
      (dbService as any).registerEntity('notifications', ['id', 'userId', 'message', 'type', 'isRead', 'createdAt', 'updatedAt', 'sendAt', 'is_dirty']);
      (dbService as any).registerEntity('user_engagement', ['userId', 'session_attendance', 'streak_length', 'response_latency', 'xp_progress', 'leaderboard_rank', 'last_session_timestamp', 'createdAt', 'updatedAt', 'is_dirty']);
      (dbService as any).registerEntity('anomalies', ['id', 'metricId', 'type', 'severity', 'timestamp', 'updatedAt', 'deviation', 'evidence', 'is_dirty']);
      (dbService as any).registerEntity('devops_metrics', ['id', 'type', 'payload', 'createdAt', 'updatedAt', 'is_dirty']);
    }

    console.log('[dbInitService] Starting database persistence initialization...');
    await dbService.init();

    // 1. Check if database is empty
    let isEmpty = true;
    const tables = ['categories', 'learning_sessions', 'user_question_data', 'notifications', 'user_engagement'];
    for (const table of tables) {
      try {
        const [resultSet] = await dbService.runQuery(`SELECT * FROM ${table}`);
        const records = resultSet?.rows?.raw() || [];
        if (records.length > 0) {
          isEmpty = false;
          break;
        }
      } catch (err) {
        console.warn(`[dbInitService] Querying table ${table} failed or table empty:`, err);
      }
    }

    // 2. Only fetch from server when client database is empty
    if (isEmpty) {
      console.log('[dbInitService] Client database is empty. Fetching initial state from server...');
      const state = getState();
      const token = state.user?.token;

      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/sync`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const serverData = await response.json();
            console.log('[dbInitService] Received initial state from server. Persisting to client DB...');

            // Persist the retrieved data to client database
            for (const table in serverData) {
              const records = serverData[table];
              if (Array.isArray(records)) {
                for (const record of records) {
                  record.is_dirty = 0; // Clean server record

                  const columns = Object.keys(record);
                  const placeholders = columns.map(() => '?').join(',');
                  const values = Object.values(record).map(val =>
                    (typeof val === 'object' && val !== null) ? JSON.stringify(val) : val
                  );

                  await dbService.runQuery(
                    `INSERT OR REPLACE INTO ${table} (${columns.join(',')}) VALUES (${placeholders})`,
                    values
                  );
                }
              }
            }
            console.log('[dbInitService] Initial state successfully persisted.');
          } else {
            console.warn('[dbInitService] Server responded with error status:', response.status);
          }
        } catch (error) {
          console.error('[dbInitService] Failed to fetch initial data from server:', error);
        }
      } else {
        console.log('[dbInitService] No user token found in store. Skipping initial data fetch.');
      }
    } else {
      console.log('[dbInitService] Client database is not empty. Skipping server fetch.');
    }

    // 3. Hydrate all component stores from DB
    console.log('[dbInitService] Hydrating component stores from DB...');
    const hydrationActions = [
      hydrateCategories,
      hydrateLearningSession,
      hydrateUserQuestionData,
      hydrateNotifications,
      hydrateUserEngagements
    ];

    for (const actionCreator of hydrationActions) {
      await dispatch(actionCreator());
    }
    console.log('[dbInitService] Hydration completed.');

    // 4. Perform final sync
    await syncService.performSync(dispatch, getState);

  } catch (error) {
    console.error('[dbInitService] Failed to initialize database and hydrate stores:', error);
  }
};
