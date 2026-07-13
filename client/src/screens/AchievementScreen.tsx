import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { EngagementComponent } from '../components/engagement/interface';
import { UserComponent } from '../components/user/interface';
import BackButton from '../components/common/components/BackButton';
import BottomNav from '../components/common/components/BottomNav';
import BadgeDetails from '../components/engagement/components/BadgeDetails';
import { fetchAllAchievements } from '../components/engagement/store/userEngagement.slice';

type RootStackParamList = {
    Home: undefined;
    Achievement: { badgeId?: string };
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'Achievement'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Achievement'>;

interface ScreenProps {
    navigation: NavigationProp;
    route: ScreenRouteProp;
}

const AchievementScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
    const dispatch = useDispatch<any>();
    const engagementComponent = new EngagementComponent();
    const userComponent = new UserComponent();
    const badgeId = route.params?.badgeId;

    // TODO: Fetch all achievements dynamically using api thunks
    useEffect(() => {
        dispatch(fetchAllAchievements());
    }, [dispatch]);

    // Select achievements from Redux state
    const allAchievements = useSelector((state: any) => state.userEngagement?.allAchievements || []);
    const badge = allAchievements.find((a: any) => a.id === badgeId) || {
        id: badgeId || '',
        name: 'Fitness God',
        description: 'Achieve the highest rank in fitness quizzes.',
        achieved: true,
        unlockCriteria: 'Reach level 100 in Fitness.',
        imagePath: '',
    };

    const badgeImageMapping = {
        '1': null,
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton navigation={navigation} />
                <Text style={styles.headerTitle}>Achievements</Text>
                {userComponent.renderUserSettingsComponent()}
            </View>
            <View style={styles.content}>
                {badgeId ? (
                    <BadgeDetails
                        badge={badge}
                        imageSource={badgeImageMapping[badgeId as keyof typeof badgeImageMapping]}
                    />
                ) : (
                    engagementComponent.renderAchievements('achievements', navigation)
                )}
            </View>
            <BottomNav navigation={navigation} />
        </View>
    );
};

// ... styles from before
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingTop: 40, paddingBottom: 10 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    content: { flex: 1 },
});

export default AchievementScreen;
