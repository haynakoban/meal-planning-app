import { FlatList, ScrollView, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  SHADOWS,
  SIZES,
  people,
  recipeSearchData,
  searchesScreens,
} from '../../constants';
import styles from '../../styles/search';

const SearchScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={[SHADOWS.small, styles.bg]}>
        <Text style={styles.headerTitle}>people recently searches</Text>
        <FlatList
          horizontal
          data={people}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <Avatar.Text
                size={45}
                label={item.i}
                labelStyle={styles.avatar}
              />
              <Text
                style={styles.itemText}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {item.name}
              </Text>
            </View>
          )}
          keyExtractor={(i) => i.key}
        />
      </View>
      <View style={styles.divider} />

      <View style={[SHADOWS.small, styles.bg]}>
        <Text style={styles.headerTitle}>recipes recently searches</Text>
        {recipeSearchData.map((_, i) => {
          return (
            <Button
              key={i}
              icon={() => (
                <Ionicons
                  name='search'
                  size={SIZES.lg}
                  color={COLORS.lightBlack}
                />
              )}
              style={styles.buttonStyle}
              textColor={COLORS.black}
              labelStyle={styles.buttonLabelStyle}
              contentStyle={styles.buttonContentStyle}
              onPress={() => console.log(_.search)}
            >
              {_.search}
            </Button>
          );
        })}
      </View>

      <View style={styles.divider} />
      <View style={[SHADOWS.small, styles.bg]}>
        {searchesScreens.map((_, i) => {
          return (
            <Button
              key={i}
              icon={() => (
                <Ionicons
                  name={_.icon}
                  size={SIZES.lg}
                  color={COLORS.lightBlack}
                />
              )}
              style={[styles.buttonStyle, styles.border]}
              textColor={COLORS.black}
              labelStyle={styles.buttonLabelStyle}
              contentStyle={styles.buttonContentStyle}
              onPress={() => navigation.navigate(_.screen)}
            >
              {_.label}
            </Button>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
