import { useEffect, useState } from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../styles/favorites';

import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONT, SIZES } from '../../constants';
import RatingCard from '../ratings/RatingCard';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import NotFound from '../../assets/images/image-not-found.jpg';

const SelectRecipe = ({ data, id, addRecipe, removeRecipe }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const { breakfast, snacks, lunch, dinner } = useMealPlanRecipe();

  const [type] = useState(route.params.type);
  const [isExists, setIsExist] = useState(false);

  useEffect(() => {
    if (type == 'breakfast') {
      let res = breakfast.some((item) => item === id);
      setIsExist(res);
    } else if (type == 'snacks') {
      let res = snacks.some((item) => item === id);
      setIsExist(res);
    } else if (type == 'lunch') {
      let res = lunch.some((item) => item === id);
      setIsExist(res);
    } else {
      let res = dinner.some((item) => item === id);
      setIsExist(res);
    }
  }, []);

  const {
    card,
    cardAction,
    icon,
    title,
    usernameStyle,
    cardBottom,
    mb,
    AvatarIcon,
  } = styles;
  const [isFavorite, setIsFavorite] = useState(true);

  let calculated = 0;
  for (let i = 0; i < data.feedbacks.length; i++) {
    calculated += parseInt(data.feedbacks[i].rating);
  }

  return (
    <Pressable
      onPress={() => navigation.navigate('Recipe', { id: data._id })}
      style={card}
    >
      {!isExists ? (
        <Pressable
          onPress={() => {
            addRecipe({ id, type });
            setIsExist(!isExists);
          }}
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.accent,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.md,
              fontFamily: FONT.semiBold,
              color: COLORS.white,
            }}
          >
            Add Recipe
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            removeRecipe({ id, type });
            setIsExist(!isExists);
          }}
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.danger,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.md,
              fontFamily: FONT.semiBold,
              color: COLORS.white,
            }}
          >
            Remove Recipe
          </Text>
        </Pressable>
      )}
      <Card>
        {/* {data.image ? (
          <Card.Cover
            source={{ uri: data.image }}
            style={[mb, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}
          />
        ) : (
          )} */}
        <Card.Cover
          source={NotFound}
          style={[mb, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}
        />
        <Card.Content>
          <Text variant='titleLarge' style={title}>
            {data.name}
          </Text>
          <Text variant='bodyMedium' style={usernameStyle}>
            {data.user_id.username}
          </Text>
        </Card.Content>
        <View style={cardBottom}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RatingCard rating={calculated / data.feedbacks.length} />
            <Text>
              {' '}
              {(calculated / data.feedbacks.length).toFixed(1)} (
              {data.feedbacks.length})
            </Text>
          </View>
        </View>
        <Card.Actions style={cardAction}>
          <Pressable onPress={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? (
              <Avatar.Icon
                size={40}
                style={AvatarIcon}
                icon={() => <AntDesign name='heart' style={icon} color='red' />}
              />
            ) : (
              <Avatar.Icon
                size={40}
                style={AvatarIcon}
                icon={() => (
                  <AntDesign name='hearto' style={icon} color='red' />
                )}
              />
            )}
          </Pressable>
        </Card.Actions>
      </Card>
    </Pressable>
  );
};

export default SelectRecipe;
