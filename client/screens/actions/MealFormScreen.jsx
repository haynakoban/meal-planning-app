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

import { COLORS, SIZES, privacyData, FONT } from '../../constants';
import styles from '../../styles/recipeForm';
import useAuthStore from '../../store/useAuthStore';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import MealButton from '../planner/MealButton';

import { useNavigation } from '@react-navigation/native';

const MealFormScreen = () => {
  const clearMeal = useMealPlanRecipe((state) => state.clearMeal);
  const {
    multipleBreakfastRecipes,
    multipleSnacksRecipes,
    multipleLunchRecipes,
    multipleDinnerRecipes,
  } = useMealPlanRecipe();
  const { breakfastObj, snacksObj, lunchObj, dinnerObj } = useMealPlanRecipe();

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
    if (breakfastObj.length != breakfastArray.length) {
      multipleBreakfastRecipes(breakfastArray);
    }
  }, [breakfastArray]);
  useEffect(() => {
    if (snacksObj.length != snacksArray.length) {
      multipleSnacksRecipes(snacksArray);
    }
  }, [snacksArray]);
  useEffect(() => {
    if (lunchObj.length != lunchArray.length) {
      multipleLunchRecipes(lunchArray);
    }
  }, [lunchArray]);
  useEffect(() => {
    if (dinnerObj.length != dinnerArray.length) {
      multipleDinnerRecipes(dinnerArray);
    }
  }, [dinnerArray]);

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
    const isDataValid =
      breakfastArray.length !== 0 ||
      snacksArray.length !== 0 ||
      lunchArray.length !== 0 ||
      dinnerArray.length !== 0;

    const err = {
      name: !isNameValid,
      description: !isDescriptionValid,
      day: !isDayValid,
      data: !isDataValid,
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

  const removeBreakfast = useMealPlanRecipe((state) => state.removeBreakfast);
  const removeSnacks = useMealPlanRecipe((state) => state.removeSnacks);
  const removeLunch = useMealPlanRecipe((state) => state.removeLunch);
  const removeDinner = useMealPlanRecipe((state) => state.removeDinner);

  const removeRecipe = ({ id, type }) => {
    if (type === 'breakfast') return removeBreakfast(id);
    if (type === 'snacks') return removeSnacks(id);
    if (type === 'lunch') return removeLunch(id);
    if (type === 'dinner') return removeDinner(id);
  };

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
          <MealButton type='breakfast' label='Breakfast' />
          <MealButton type='snacks' label='Snacks' />
          <MealButton type='lunch' label='Lunch' />
          <MealButton type='dinner' label='Dinner' />
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
                  data={breakfastObj}
                  renderItem={({ item }) => {
                    const { name, image } = item;
                    return (
                      <View
                        style={{
                          width: 250,
                          marginRight: 10,
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: COLORS.secondary,
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={
                            image
                              ? {
                                  uri: image,
                                }
                              : require('../../assets/images/image-not-found.jpg')
                          }
                          style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            width: '100%',
                            aspectRatio: 4 / 3,
                            height: 'auto',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: SIZES.md,
                            fontFamily: FONT.medium,
                            paddingHorizontal: 10,
                            paddingTop: 10,
                          }}
                        >
                          {name}
                        </Text>
                        <Text
                          style={{
                            fontSize: SIZES.sm,
                            fontFamily: FONT.regular,
                            paddingHorizontal: 10,
                            paddingBottom: 10,
                          }}
                        >
                          @{item?.user_id?.username}
                        </Text>
                        <Pressable
                          onPress={() => {
                            removeRecipe({ id: item?._id, type: 'breakfast' });
                          }}
                          style={{
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
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
                  data={snacksObj}
                  renderItem={({ item }) => {
                    const { name, image } = item;
                    return (
                      <View
                        style={{
                          width: 250,
                          marginRight: 10,
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: COLORS.secondary,
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={
                            image
                              ? {
                                  uri: image,
                                }
                              : require('../../assets/images/image-not-found.jpg')
                          }
                          style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            width: '100%',
                            aspectRatio: 4 / 3,
                            height: 'auto',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: SIZES.md,
                            fontFamily: FONT.medium,
                            paddingHorizontal: 10,
                            paddingTop: 10,
                          }}
                        >
                          {name}
                        </Text>
                        <Text
                          style={{
                            fontSize: SIZES.sm,
                            fontFamily: FONT.regular,
                            paddingHorizontal: 10,

                            paddingBottom: 10,
                          }}
                        >
                          @{item?.user_id?.username}
                        </Text>
                        <Pressable
                          onPress={() => {
                            removeRecipe({ id: item?._id, type: 'snacks' });
                          }}
                          style={{
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
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
                  data={lunchObj}
                  renderItem={({ item }) => {
                    const { name, image } = item;
                    return (
                      <View
                        style={{
                          width: 250,
                          marginRight: 10,
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: COLORS.secondary,
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={
                            image
                              ? {
                                  uri: image,
                                }
                              : require('../../assets/images/image-not-found.jpg')
                          }
                          style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            width: '100%',
                            aspectRatio: 4 / 3,
                            height: 'auto',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: SIZES.md,
                            fontFamily: FONT.medium,
                            paddingHorizontal: 10,
                            paddingTop: 10,
                          }}
                        >
                          {name}
                        </Text>
                        <Text
                          style={{
                            fontSize: SIZES.sm,
                            fontFamily: FONT.regular,
                            paddingHorizontal: 10,

                            paddingBottom: 10,
                          }}
                        >
                          @{item?.user_id?.username}
                        </Text>
                        <Pressable
                          onPress={() => {
                            removeRecipe({ id: item?._id, type: 'lunch' });
                          }}
                          style={{
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
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
                  data={dinnerObj}
                  renderItem={({ item }) => {
                    const { name, image } = item;
                    return (
                      <View
                        style={{
                          width: 250,
                          marginRight: 10,
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: COLORS.secondary,
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={
                            image
                              ? {
                                  uri: image,
                                }
                              : require('../../assets/images/image-not-found.jpg')
                          }
                          style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            width: '100%',
                            aspectRatio: 4 / 3,
                            height: 'auto',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: SIZES.md,
                            fontFamily: FONT.medium,
                            paddingHorizontal: 10,
                            paddingTop: 10,
                          }}
                        >
                          {name}
                        </Text>
                        <Text
                          style={{
                            fontSize: SIZES.sm,
                            fontFamily: FONT.regular,
                            paddingHorizontal: 10,

                            paddingBottom: 10,
                          }}
                        >
                          @{item?.user_id?.username}
                        </Text>
                        <Pressable
                          onPress={() => {
                            removeRecipe({ id: item?._id, type: 'dinner' });
                          }}
                          style={{
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
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
