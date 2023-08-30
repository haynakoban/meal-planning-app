import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import FavoriteCard from '../../components/favorites/FavoriteCard';
import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/homeRecipes';

import { DATA } from '../../constants';

const HomeRecipeCard = ({ headerTitle, subTitle }) => {
  const navigation = useNavigation();

  const {
    recipeContainer,
    headerContainer,
    headerTitleStyle,
    headerButtonContent,
    headerButtonStyle,
    headerButtonLabel,
    cardWrapper,
    cardContentWrapper,
  } = styles;

  return (
    <View style={recipeContainer}>
      <View style={headerContainer}>
        <Text style={headerTitleStyle}>{headerTitle}</Text>
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
              title: subTitle,
            });
          }}
        >
          See all
        </Button>
      </View>

      <View style={cardWrapper}>
        {DATA.map(({ id, name, username, ratings, image }) => (
          <View key={id} style={cardContentWrapper}>
            <FavoriteCard
              name={name}
              username={username}
              ratings={ratings}
              image={image}
              key={id}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default HomeRecipeCard;
