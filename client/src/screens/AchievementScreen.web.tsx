import React from 'react';
import { EngagementComponent } from '../components/engagement/interface';
import { UserComponent } from '../components/user/interface';
import BackButton from '../components/common/components/BackButton';
import BottomNav from '../components/common/components/BottomNav';
import BadgeDetails from '../components/engagement/components/BadgeDetails.web';

interface ScreenProps {
  navigation: any;
  route: any;
}

const AchievementScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const engagementComponent = new EngagementComponent();
  const userComponent = new UserComponent();
  const badgeId = route?.params?.badgeId;

  const getBadgeData = (id: string) => ({
    id: id,
    name: 'Fitness God',
    description: 'Achieve the highest rank in fitness quizzes.',
    achieved: true,
    unlockCriteria: 'Reach level 100 in Fitness.',
    imagePath: '',
  });

  const badgeImageMapping = {
    '1': null,
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <BackButton navigation={navigation} />
        <h2 style={styles.headerTitle}>Achievements</h2>
        {userComponent.renderUserSettingsComponent()}
      </header>
      <main style={styles.content}>
        {badgeId ? (
          <BadgeDetails
            badge={getBadgeData(badgeId)}
            imageSource={badgeImageMapping[badgeId as keyof typeof badgeImageMapping]}
          />
        ) : (
          engagementComponent.renderAchievements('achievements', navigation)
        )}
      </main>
      <BottomNav navigation={navigation} />
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eaeaea' },
  headerTitle: { fontSize: '18px', fontWeight: 'bold', margin: 0 },
  content: { flex: 1, padding: '20px' },
};

export default AchievementScreen;
