import { useState, useEffect } from 'react';
import {
  Image,
  Text,
  Platform,
  TouchableHighlight,
  TextInput,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  SIZES,
  ingredients as INGREDIENTS,
  CT,
  privacyData,
  FONT,
  DATA,
} from '../../constants';
import styles from '../../styles/recipeForm';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import SearchRecipe from '../search/SearchRecipe';

import { useNavigation } from '@react-navigation/native';

import useMealPlanRecipe from '../../store/useMealPlanRecipe';

const MealFormScreen = () => {
  const breakfastArray = useMealPlanRecipe((state) => state.breakfast);
  const snacksArray = useMealPlanRecipe((state) => state.snacks);
  const lunchArray = useMealPlanRecipe((state) => state.lunch);
  const dinnerArray = useMealPlanRecipe((state) => state.dinner);

  useEffect(() => {
    let data = [
      { breakfast: breakfastArray },
      { snacks: snacksArray },
      { lunch: lunchArray },
      { dinner: dinnerArray },
    ];

    console.log(data);
  }, [breakfastArray, snacksArray, lunchArray, lunchArray, dinnerArray]);

  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '',
    description: '',
    procedure: '',
    image: null,
    privacy: 'public',
    cookingTime: 5,
  });

  const [permission, setPermission] = useState(false);
  const [openDay, setOpenDay] = useState(false);
  const [day, setDay] = useState([]);
  const [data, setData] = useState([
    {
      label: 'Monday',
      value: 1,
    },
    {
      label: 'Tuesday',
      value: 2,
    },
    {
      label: 'Wednesday',
      value: 3,
    },
    {
      label: 'Thursday',
      value: 4,
    },
    {
      label: 'Friday',
      value: 5,
    },
    {
      label: 'Saturday',
      value: 6,
    },
    {
      label: 'Sunday',
      value: 7,
    },
  ]);

  // ask for storage permission
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
          setPermission(true);
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    if (permission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setForm({
          ...form,
          image: result.assets[0].uri,
        });
      }
    } else {
      // ask for storage permission if not yet granted
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
          setPermission(true);
        }
      }
    }
  };

  // submit form
  function handleSubmit() {
    console.log('recipe submitted');
  }

  DropDownPicker.setListMode('MODAL');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.highlights}>Name & Photo</Text>
        {form.image != null ? (
          <TouchableHighlight onPress={pickImage} style={styles.mb}>
            <Image source={{ uri: image }} style={styles.hasImage} />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onPress={pickImage} style={styles.mb}>
            <View style={styles.noImage}>
              <AntDesign name='camerao' size={SIZES.xl} color={COLORS.black} />
              <Text style={styles.addLabel}>Add Cover Photo</Text>
            </View>
          </TouchableHighlight>
        )}

        <Text style={styles.labels}>Name</Text>
        <TextInput
          placeholder='Name of meal plan'
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={[styles.input, styles.mb, styles.borderWidth]}
        />

        <Text style={[styles.labels]}>Description</Text>
        <TextInput
          placeholder='Add meal plan description'
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          style={[styles.textarea, styles.mb, styles.borderWidth]}
          multiline={true}
          numberOfLines={10}
        />

        <Text style={[styles.highlights, styles.mtlg]}>
          Daily Plan Information
        </Text>
        <Text style={styles.labels}>Select Plan Meal Day</Text>
        <View style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={styles.dd}
            placeholder='Select day of the week'
            open={openDay}
            value={day}
            items={data}
            setOpen={setOpenDay}
            setValue={setDay}
            setItems={setData}
            showBadgeDot={false}
            // itemKey="value" (id)
          />
        </View>

        <View
          style={[
            styles.mtlg,
            { flexDirection: 'row', justifyContent: 'space-around' },
          ]}
        >
          <Pressable
            onPress={() =>
              navigation.navigate('Search Recipe', { type: 'breakfast' })
            }
            style={{ width: '24%' }}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: COLORS.secondary,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Ionicons name='add-circle-outline' size={24} color='black' />
              <Text>Breakfast</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate('Search Recipe', { type: 'snacks' })
            }
            style={{ width: '24%' }}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: COLORS.secondary,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Ionicons name='add-circle-outline' size={24} color='black' />
              <Text>Snacks</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate('Search Recipe', { type: 'lunch' })
            }
            style={{ width: '24%' }}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: COLORS.secondary,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Ionicons name='add-circle-outline' size={24} color='black' />
              <Text>Lunch</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate('Search Recipe', { type: 'dinner' })
            }
            style={{ width: '24%' }}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: COLORS.secondary,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Ionicons name='add-circle-outline' size={24} color='black' />
              <Text>Dinner</Text>
            </View>
          </Pressable>
        </View>
        <View>
          <View style={styles.mtlg}>
            <Text style={[styles.labels]}>Breakfast</Text>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={({ item }) => {
                  const { name, username, ratings, image, id } = item;
                  return (
                    <View style={{ width: 250 }}>
                      <FavoriteCard
                        name={name}
                        username={username}
                        ratings={ratings}
                        image={image}
                        key={id}
                      />
                    </View>
                  );
                }}
                horizontal
              />
            </View>
          </View>

          <View style={styles.mtlg}>
            <Text style={[styles.labels]}>Snacks</Text>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={({ item }) => {
                  const { name, username, ratings, image, id } = item;
                  return (
                    <View style={{ width: 250 }}>
                      <FavoriteCard
                        name={name}
                        username={username}
                        ratings={ratings}
                        image={image}
                        key={id}
                      />
                    </View>
                  );
                }}
                horizontal
              />
            </View>
          </View>

          <View style={styles.mtlg}>
            <Text style={[styles.labels]}>Lunch</Text>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={({ item }) => {
                  const { name, username, ratings, image, id } = item;
                  return (
                    <View style={{ width: 250 }}>
                      <FavoriteCard
                        name={name}
                        username={username}
                        ratings={ratings}
                        image={image}
                        key={id}
                      />
                    </View>
                  );
                }}
                horizontal
              />
            </View>
          </View>

          <View style={styles.mtlg}>
            <Text style={[styles.labels]}>Dinner</Text>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={({ item }) => {
                  const { name, username, ratings, image, id } = item;
                  return (
                    <View style={{ width: 250 }}>
                      <FavoriteCard
                        name={name}
                        username={username}
                        ratings={ratings}
                        image={image}
                        key={id}
                      />
                    </View>
                  );
                }}
                horizontal
              />
            </View>
          </View>
        </View>

        <Text style={[styles.highlights, styles.mtxl]}>Meal Plan Privacy</Text>

        <View>
          {privacyData.map((_, i) => {
            const { privacy, title, description } = _;
            return (
              <Pressable
                key={i}
                style={[
                  styles.privacyStyle,
                  ,
                  form.privacy === privacy
                    ? { backgroundColor: COLORS.primary }
                    : '',
                ]}
                onPress={() => setForm({ ...form, privacy: privacy })}
              >
                <RadioButton
                  value={privacy}
                  status={form.privacy === privacy ? 'checked' : 'unchecked'}
                  onPress={() => setForm({ ...form, privacy: privacy })}
                />
                <View>
                  <Text style={styles.fffs}>{title}</Text>
                  <Text style={styles.privactDescription}>{description}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[styles.submitButton, styles.mtxl]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default MealFormScreen;
