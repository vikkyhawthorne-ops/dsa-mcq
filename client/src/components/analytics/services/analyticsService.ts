import { Anomaly, AnomalyType, AnomalySeverity } from '../store/primitives/Anomaly';
import { sqliteService } from '../../common/services/sqliteService';
import { metricsService } from './metricsService';

class AnalyticsService {
    private sessionStartTime = Date.now();
    private apiCallTimestamps: number[] = [];

    private async saveAnomaly(anomaly: Anomaly) {
        const anomalyToSave = {
            id: anomaly.id,
            metricId: anomaly.metricId,
            type: anomaly.type,
            severity: anomaly.severity,
            timestamp: anomaly.timestamp,
            deviation: anomaly.deviation,
            evidence: JSON.stringify(anomaly.evidence),
            is_dirty: 1,
        };
        await sqliteService.create('anomalies', anomalyToSave);
    }

    public session_ontime(): number {
        const durationMs = Date.now() - this.sessionStartTime;
        console.log(`[AnalyticsService] Client session on-time evaluated: ${durationMs}ms`);
        return durationMs;
    }

    public async checkGameplayFraud(): Promise<void> {
        const now = Date.now();
        this.apiCallTimestamps.push(now);
        // Keep only timestamps within the last 5 seconds
        this.apiCallTimestamps = this.apiCallTimestamps.filter(t => now - t < 5000);

        // Gameplay fraud triggers when APIs are firing at hyper human speeds
        // E.g. more than 10 requests in 5 seconds (interval < 500ms on average)
        if (this.apiCallTimestamps.length >= 10) {
            console.warn('[AnalyticsService] Gameplay fraud detected! APIs firing at hyper human speeds.');
            const anomaly = new Anomaly({
                type: AnomalyType.GAMEPLAY_FRAUD,
                severity: AnomalySeverity.HIGH,
                evidence: [{ message: 'APIs firing at hyper human speeds', callCount: this.apiCallTimestamps.length }]
            });
            await this.saveAnomaly(anomaly);
        }
    }

    public crash_log(error: Error): void {
        console.error('[AnalyticsService] Crash captured:', error);
        try {
            // Cache locally using temporary log list representation in localStorage
            if (typeof window !== 'undefined' && window.localStorage) {
                const cachedCrashes = JSON.parse(localStorage.getItem('temp_crash_logs') || '[]');
                cachedCrashes.push({ message: error.message, stack: error.stack, timestamp: Date.now() });
                localStorage.setItem('temp_crash_logs', JSON.stringify(cachedCrashes));
            }
            // Register DevOps crash metric
            metricsService.logCrash(error);
        } catch (e) {
            console.error('[AnalyticsService] Failed to cache crash event:', e);
        }
    }

    // --- Native-dependent resource check fallback ---
    public async checkResourceDeficiency(): Promise<void> {
        console.warn("Native check 'checkResourceDeficiency' is mocked.");
        const lowMemory = false;
        if (lowMemory) {
            const anomaly = new Anomaly({
                type: AnomalyType.RESOURCE_DEFICIENCY,
                severity: AnomalySeverity.HIGH,
                evidence: [{ message: 'Device memory is critically low.' }]
            });
            await this.saveAnomaly(anomaly);
        }
    }
}

export const analyticsService = new AnalyticsService();
