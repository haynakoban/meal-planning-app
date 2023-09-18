import { RefreshControl, ScrollView } from 'react-native';

import HomeRecipeCard from '../../components/home/HomeRecipeCard';
import { HOMEDATA } from '../../constants';
import FilterProgressSteps from '../../components/modals/FilterProgressSteps';
import { Fragment, useState } from 'react';
import useFilterStore from '../../store/useFilterStore';
import useAuthStore from '../../store/useAuthStore';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { userInfo } = useAuthStore();
  const { filters, loadCachedFilters } = useFilterStore();

  const handleRefresh = () => {
    setRefreshing(true);

    loadCachedFilters();

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
        <Fragment>
          {HOMEDATA.map(({ id, headerTitle, subTitle }) => {
            return (
              <HomeRecipeCard
                key={id}
                headerTitle={headerTitle}
                subTitle={subTitle}
              />
            );
          })}
        </Fragment>
      ) : (
        <FilterProgressSteps filters={filters} />
      )}
    </ScrollView>
  );
};

export default HomeScreen;
