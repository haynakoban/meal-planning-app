import { ScrollView, View } from 'react-native';

import PlansCard from '../../components/planner/PlansCard';
import styles from '../../styles/planner';
import { DATA } from '../../constants';

const PlannerScreen = () => {
  const { cardWrapper, plannerContainer, plannerWrapper } = styles;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={plannerContainer}>
        <View style={plannerWrapper}>
          {DATA.map(({ id, name, username, ratings, image, description }) => (
            <View key={id} style={cardWrapper}>
              <PlansCard
                name={name}
                username={username}
                ratings={ratings}
                image={image}
                key={id}
                description={description}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default PlannerScreen;
