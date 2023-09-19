import { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  SectionList,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import FilterProgressSteps from '../../components/modals/FilterProgressSteps';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import useFilterStore from '../../store/useFilterStore';
import useAuthStore from '../../store/useAuthStore';
import useRecipeStore from '../../store/useRecipeStore';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/homeRecipes';

const HomeScreen = ({ navigation }) => {
  const {
    headerContainer,
    headerTitleStyle,
    headerButtonContent,
    headerButtonStyle,
    headerButtonLabel,
  } = styles;

  const [refreshing, setRefreshing] = useState(false);

  const { userInfo } = useAuthStore();
  const { homeRecipes, loadCachedRecipes } = useRecipeStore();
  const { filters, loadCachedFilters } = useFilterStore();

  const handleRefresh = () => {
    setRefreshing(true);

    loadCachedFilters();
    loadCachedRecipes();

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {userInfo?.filtered ? (
        <SectionList
          scrollEnabled={false}
          sections={homeRecipes}
          keyExtractor={(item, index) =>
            `${item?.recipes?._id.toString()}-${index}`
          }
          renderItem={({ item }) => {
            return (
              <FavoriteCard
                name={item?.recipes?.name}
                username={item?.recipes?.user_id?.username || 'anon'}
                reviews={item?.reviews || 0}
                ratings={item?.ratings || 0}
                image={item?.recipes?.image}
              />
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View
              style={[
                headerContainer,
                { marginTop: title === 'recommended' ? 0 : 30 },
              ]}
            >
              <Text style={[headerTitleStyle]}>{title}</Text>
              <Button
                mode='text'
                icon={() => (
                  <FontAwesome
                    name='angle-right'
                    size={SIZES.lg}
                    color={COLORS.black}
                  />
                )}
                contentStyle={headerButtonContent}
                style={headerButtonStyle}
                textColor={COLORS.black}
                labelStyle={headerButtonLabel}
                onPress={() => {
                  navigation.navigate('Show All Recipes', {
                    title: title,
                  });
                }}
              >
                See all
              </Button>
            </View>
          )}
        />
      ) : (
        <FilterProgressSteps filters={filters} />
      )}
    </ScrollView>
  );
};

export default HomeScreen;
