import { Fragment, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import PlansCard from '../../components/planner/PlansCard';

import { COLORS, SIZES, useWeeks } from '../../constants';
import styles from '../../styles/planner';
import LoadingScreen from '../loading/LoadingScreen';
import useAuthStore from '../../store/useAuthStore';

const screenWidth = Dimensions.get('window').width - 16;

const PlannerScreen = ({ route }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const today = new Date();
  const dayName = daysOfWeek[today.getDay() || 'sunday'];

  const [currentDay, setCurrentDay] = useState(dayName);
  const [loading, setLoading] = useState(true);
  const { mealsWithDays, fetchMealsDays } = useMealPlanRecipe();

  useFocusEffect(
    useCallback(() => {
      const dayFromRoute = route.params?.day || dayName;
      setCurrentDay(dayFromRoute);
    }, [route.params?.day])
  );

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      await fetchMealsDays(currentDay, userInfo?._id);

      if (useMealPlanRecipe.getState(mealsWithDays)) {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentDay]);

  return (
    <View style={styles.mealView}>
      <View style={styles.weeksView}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weeksScrollView}
        >
          {useWeeks?.map((day) => (
            <DayButton
              item={day}
              state={setCurrentDay}
              value={currentDay}
              key={day.day}
            />
          ))}
        </ScrollView>
      </View>
      {!loading ? (
        <Fragment>
          {mealsWithDays?.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.mealPlanScrollView}
            >
              <View style={styles.plannerContainer}>
                <View style={styles.plannerWrapper}>
                  {mealsWithDays.map((meal) => (
                    <View key={meal?._id} style={styles.cardWrapper}>
                      <PlansCard
                        name={meal?.name}
                        image={meal?.image}
                        type={meal?.time}
                        id={meal?._id}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={styles.growView}>
              <Text style={styles.noMealPlan}>No available meal plan</Text>
            </View>
          )}
        </Fragment>
      ) : (
        <View style={styles.growView}>
          <LoadingScreen />
        </View>
      )}
    </View>
  );
};

const DayButton = ({ item, value, state }) => {
  return (
    <TouchableOpacity
      style={[
        styles.dayButton,
        {
          backgroundColor: item.day === value ? '#B2D3F9' : 'transparent',
          width: screenWidth / 7,
        },
      ]}
      onPress={() => state(item.day)}
    >
      <Text style={styles.dayText}>{item.day?.slice(0, 3).toUpperCase()}</Text>
      <Ionicons name={item.icon} size={SIZES.lg} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default PlannerScreen;
