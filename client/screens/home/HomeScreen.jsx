import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { data } from '../favorites/FavoritesScreen';
import FavoriteCard from '../favorites/FavoriteCard';
import { Button } from 'react-native-paper';
import { COLORS, FONT, SIZES } from '../../constants';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 16 }}>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
            Breakfast
          </Text>
          <Button
            mode='text'
            icon={() => (
              <FontAwesome
                name='angle-right'
                size={SIZES.lg}
                color={COLORS.black}
              />
            )}
            contentStyle={{
              flexDirection: 'row-reverse',
              justifyContent: 'flex-start',
            }}
            style={{ alignItems: 'center' }}
            textColor={COLORS.black}
            labelStyle={{
              fontFamily: FONT.semiBold,
              fontSize: SIZES.sm,
              paddingTop: 1,
            }}
          >
            See all
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 4,
          }}
        >
          {data.map((item) => (
            <View
              key={item.id}
              style={{
                width: '50%',
              }}
            >
              <FavoriteCard
                name={item.name}
                username={item.username}
                ratings={item.ratings}
                image={item.image}
                key={item.id}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    elevation: 5,
  },
});

export default HomeScreen;
