import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Anomaly, AnomalyType, AnomalySeverity } from '../store/primitives/Anomaly';
import { sqliteService } from '../../common/services/sqliteService';
import { metricsService } from './metricsService';

class AnalyticsService {
    private sessionStartTime = Date.now();
    private apiCallTimestamps: number[] = [];
    private visitedScreens: { screen: string; startTime: number; duration: number }[] = [];
    private interactionHeatMap: Record<string, number> = {};
    private currentScreen: string | null = null;
    private currentScreenStartTime = Date.now();

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

    public recordScreenVisit(screenName: string) {
        const now = Date.now();
        if (this.currentScreen) {
            const duration = now - this.currentScreenStartTime;
            this.visitedScreens.push({
                screen: this.currentScreen,
                startTime: this.currentScreenStartTime,
                duration,
            });
        }
        this.currentScreen = screenName;
        this.currentScreenStartTime = now;
    }

    public recordInteraction(componentId: string) {
        this.interactionHeatMap[componentId] = (this.interactionHeatMap[componentId] || 0) + 1;
    }

    public session_analytics() {
        this.recordScreenVisit(''); // Close the last visited screen
        const sessionDuration = Date.now() - this.sessionStartTime;

        const timeSpentPerPage: Record<string, number> = {};
        const visitCounts: Record<string, number> = {};

        for (const visit of this.visitedScreens) {
            if (visit.screen) {
                timeSpentPerPage[visit.screen] = (timeSpentPerPage[visit.screen] || 0) + visit.duration;
                visitCounts[visit.screen] = (visitCounts[visit.screen] || 0) + 1;
            }
        }

        const averageTimeSpentPerPage: Record<string, number> = {};
        for (const screen in timeSpentPerPage) {
            averageTimeSpentPerPage[screen] = timeSpentPerPage[screen] / visitCounts[screen];
        }

        return {
            visitedScreens: this.visitedScreens.map(v => v.screen).filter(Boolean),
            interactionHeatMap: this.interactionHeatMap,
            averageTimeSpentPerPage,
            sessionDuration,
            session_ontime: sessionDuration, // session_ontime is evaluated and merged inside session_analytics
        };
    }

    public async checkGameplayFraud(): Promise<void> {
        const now = Date.now();
        this.apiCallTimestamps.push(now);
        this.apiCallTimestamps = this.apiCallTimestamps.filter(t => now - t < 5000);

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

    // Concrete Mobile-Only resource deficiency check using NetInfo and RAM Heap thresholds configurable via Env Variables
    public async checkResourceDeficiency(): Promise<void> {
        if (Platform.OS === 'web') {
            return; // Skip on web client as requested
        }

        const MIN_BANDWIDTH_KBPS = (typeof process !== 'undefined' && process.env?.MIN_BANDWIDTH_KBPS)
            ? parseInt(process.env.MIN_BANDWIDTH_KBPS, 10)
            : 1000;

        const MAX_HEAP_BYTES = (typeof process !== 'undefined' && process.env?.MAX_HEAP_BYTES)
            ? parseInt(process.env.MAX_HEAP_BYTES, 10)
            : 150 * 1024 * 1024;

        const netState = await NetInfo.fetch();
        let isConstrained = false;
        const evidence: any[] = [];

        // Check network constraints
        if (!netState.isConnected) {
            isConstrained = true;
            evidence.push({ message: 'No active internet connection.' });
        } else if (netState.type === 'cellular' && (netState.details as any).cellularGeneration === '2g') {
            isConstrained = true;
            evidence.push({ message: 'Low network bandwidth (2G detected)', threshold: MIN_BANDWIDTH_KBPS });
        }

        // Check RAM heap limits
        const heapLimit = (typeof performance !== 'undefined' && (performance as any).memory)
            ? (performance as any).memory.usedJSHeapSize
            : null;

        if (heapLimit && heapLimit > MAX_HEAP_BYTES) {
            isConstrained = true;
            evidence.push({ message: 'High JS heap usage detected', heapLimit, maxAllowed: MAX_HEAP_BYTES });
        }

        if (isConstrained) {
            const anomaly = new Anomaly({
                type: AnomalyType.RESOURCE_DEFICIENCY,
                severity: AnomalySeverity.HIGH,
                evidence
            });
            await this.saveAnomaly(anomaly);
        }
    }
}

export const analyticsService = new AnalyticsService();
