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
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

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
import useAuthStore from '../../store/useAuthStore';
import useRecipeStore from '../../store/useRecipeStore';

import { useNavigation } from '@react-navigation/native';

import useMealPlanRecipe from '../../store/useMealPlanRecipe';

const MealFormScreen = () => {
  const clearRecipe = useRecipeStore((state) => state.clearRecipe);
  const userInfo = useAuthStore((state) => state.userInfo);
  const breakfastArray = useMealPlanRecipe((state) => state.breakfast);
  const snacksArray = useMealPlanRecipe((state) => state.snacks);
  const lunchArray = useMealPlanRecipe((state) => state.lunch);
  const dinnerArray = useMealPlanRecipe((state) => state.dinner);

  const [permission, setPermission] = useState(false);
  const [openDay, setOpenDay] = useState(false);
  const [day, setDay] = useState(null);
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

  const [err, setErr] = useState({
    name: false,
    description: false,
    privacy: false,
    day: false,
    data: false,
  });

  useEffect(() => {
    console.log('breakfast: ', breakfastArray);
    console.log('snacks: ', snacksArray);
    console.log('lunch: ', lunchArray);
    console.log('dinner: ', dinnerArray);
  }, [breakfastArray, snacksArray, lunchArray, dinnerArray]);

  useEffect(() => {
    if (err.day === true) {
      setErr({ ...err, day: false });
    }
  }, [day]);

  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: null,
    privacy: 'public',
  });

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
    let meals = [
      { breakfast: breakfastArray },
      { snacks: snacksArray },
      { lunch: lunchArray },
      { dinner: dinnerArray },
    ];

    const isNameValid = form.name !== null && form.name !== '';
    const isDescriptionValid =
      form.description !== null && form.description !== '';
    const isDayValid = day !== null && day !== 0;
    // const isDataValid =
    //   meals[0].breakfast.length !== 0 &&
    //   meals[0].snacks.length !== 0 &&
    //   meals[0].lunch.length !== 0 &&
    //   meals[0].dinner.length !== 0;

    const err = {
      name: !isNameValid,
      description: !isDescriptionValid,
      day: !isDayValid,
      // data: !isDataValid,
    };

    if (Object.values(err).some((value) => value)) {
      setErr(err);
      return;
    }

    const data = {
      user_id: userInfo._id,
      name: form.name,
      description: form.description,
      image: form.image,
      privacy: form.privacy,
      day: day,
      data: meals,
    };

    console.log(data);
  }

  DropDownPicker.setListMode('MODAL');

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <View style={styles.container}>
        <Text style={styles.highlights}>Name & Photo</Text>
        {form.image != null ? (
          <TouchableHighlight onPress={pickImage} style={styles.mb}>
            <Image source={{ uri: form.image }} style={styles.hasImage} />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onPress={pickImage} style={styles.mb}>
            <View style={styles.noImage}>
              <AntDesign name='camerao' size={SIZES.xl} color={COLORS.black} />
              <Text style={styles.addLabel}>Add Cover Photo</Text>
            </View>
          </TouchableHighlight>
        )}

        {form.image && (
          <Pressable
            onPress={() =>
              setForm({
                ...form,
                image: null,
              })
            }
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: SIZES.sm,
              }}
            >
              <MaterialCommunityIcons
                name='delete-circle'
                size={SIZES.xxl}
                color={COLORS.danger}
              />
            </View>
          </Pressable>
        )}

        <Text style={styles.labels}>Name</Text>
        <TextInput
          placeholder='Name of meal plan'
          value={form.name}
          onChangeText={(text) => {
            setForm({ ...form, name: text.trim() });
            setErr({ ...err, name: false });
          }}
          style={[styles.input, styles.mb, styles.borderWidth]}
        />
        {err.name && (
          <Text
            style={{
              color: COLORS.danger,
              fontFamily: FONT.regular,
              fontSize: SIZES.sm,
              textAlign: 'center',
            }}
          >
            Name field is requried.
          </Text>
        )}

        <Text style={[styles.labels]}>Description</Text>
        <TextInput
          placeholder='Add meal plan description'
          value={form.description}
          onChangeText={(text) => {
            setForm({ ...form, description: text });
            setErr({ ...err, description: false });
          }}
          style={[styles.textarea, styles.mb, styles.borderWidth]}
          multiline={true}
          numberOfLines={10}
        />
        {err.description && (
          <Text
            style={{
              color: COLORS.danger,
              fontFamily: FONT.regular,
              fontSize: SIZES.sm,
              textAlign: 'center',
            }}
          >
            Description field is requried.
          </Text>
        )}

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
          />
        </View>
        {err.day && (
          <Text
            style={{
              color: COLORS.danger,
              fontFamily: FONT.regular,
              fontSize: SIZES.sm,
              textAlign: 'center',
            }}
          >
            Please select day of plan.
          </Text>
        )}

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
        {err.data && (
          <Text
            style={{
              color: COLORS.danger,
              fontFamily: FONT.regular,
              fontSize: SIZES.sm,
              textAlign: 'center',
            }}
          >
            Please add atleast 1 recipe.
          </Text>
        )}
        <View>
          <View style={styles.mtlg}>
            <Text style={[styles.labels]}>Breakfast</Text>
            <View>
              {breakfastArray.length > 0 ? (
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
              ) : (
                <Text style={styles.highlights}>Add Recipe</Text>
              )}
            </View>
          </View>

          <View style={styles.mtlg}>
            <Text style={[styles.labels]}>Snacks</Text>
            <View>
              {snacksArray.length > 0 ? (
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
              ) : (
                <Text style={styles.highlights}>Add Recipe</Text>
              )}
            </View>
          </View>

          <View style={styles.mtlg}>
            <Text style={[styles.labels]}>Lunch</Text>
            <View>
              {lunchArray.length > 0 ? (
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
              ) : (
                <Text style={styles.highlights}>Add Recipe</Text>
              )}
            </View>
          </View>

          <View style={styles.mtlg}>
            <Text style={[styles.labels]}>Dinner</Text>
            <View>
              {dinnerArray.length > 0 ? (
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
              ) : (
                <Text style={styles.highlights}>Add Recipe</Text>
              )}
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
