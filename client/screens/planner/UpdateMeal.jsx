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
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import useAuthStore from '../../store/useAuthStore';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import MealButton from '../planner/MealButton';

import { COLORS, SIZES, FONT } from '../../constants';
import styles from '../../styles/recipeForm';
import axios from '../../lib/axiosConfig';
import { useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const UpdateMeal = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDatePress = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date > selectedStartDate) {
        setSelectedEndDate(date);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      }
    }
  };

  const markedDates = {};
  if (selectedStartDate) {
    markedDates[selectedStartDate] = {
      selected: true,
      startingDay: true,
      color: COLORS.accent,
    };
  }
  if (selectedEndDate) {
    markedDates[selectedEndDate] = {
      selected: true,
      endingDay: true,
      color: COLORS.accent,
    };

    let startDate = new Date(selectedStartDate);
    let endDate = new Date(selectedEndDate);
    while (startDate <= endDate) {
      const currentDate = startDate.toISOString().split('T')[0];
      markedDates[currentDate] = { selected: true, color: COLORS.accent };
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  const route = useRoute();
  const meal_id = route.params.id;
  const userInfo = useAuthStore((state) => state.userInfo);
  const {
    meal,
    fetchSingleMeal,
    recipesArray,
    removeRecipes,
    clearRecipes,
    updateMealPlan,
    clearMeal,
    recipesObj,
    setMealRecipes,
    setRecipesArray,
    fetchPersonalMeals,
  } = useMealPlanRecipe();

  const [permission, setPermission] = useState(false);

  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(null);
  const [data2, setData2] = useState([
    {
      label: 'Breakfast',
      value: 'breakfast',
    },
    {
      label: 'Snacks',
      value: 'snacks',
    },
    {
      label: 'Lunch',
      value: 'lunch',
    },
    {
      label: 'Dinner',
      value: 'dinner',
    },
  ]);

  useEffect(() => {
    let ids = [];
    meal?.recipes?.map((recipe) => {
      ids.push(recipe?._id);
    });

    setTime(meal?.time);
    setMealRecipes(ids || []);
    setRecipesArray(ids || []);
    setSelectedStartDate(meal?.startDate || null);
    setSelectedEndDate(meal?.endDate || null);

    setForm({
      name: meal?.name,
      description: meal?.description,
      image: null,
    });
  }, [meal]);

  useEffect(() => {
    clearRecipes();
    clearMeal();
    fetchSingleMeal(meal_id);
  }, []);

  const [err, setErr] = useState({
    name: false,
    description: false,
    data: false,
    time: false,
    date: false,
  });

  useEffect(() => {
    if (recipesObj.length != recipesArray.length) {
      setMealRecipes(recipesArray);
    }
    setErr({
      ...err,
      data: false,
    });
  }, [recipesArray]);

  useEffect(() => {
    if (err.time === true) {
      setErr({ ...err, time: false });
    }
  }, [time]);

  useEffect(() => {
    if (err.time === true) {
      setErr({ ...err, date: false });
    }
  }, [selectedEndDate, selectedStartDate]);

  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: null,
    description: null,
    image: null,
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
  const handleSubmit = async () => {
    try {
      const isNameValid = form.name !== null && form.name !== '';
      const isDescriptionValid =
        form.description !== null && form.description !== '';
      const isDataValid = recipesArray.length !== 0;
      const isTimeValid = time !== null && time !== 0;
      const isDateValid =
        selectedStartDate !== null || selectedEndDate !== null;

      const err = {
        name: !isNameValid,
        description: !isDescriptionValid,
        data: !isDataValid,
        time: !isTimeValid,
        date: !isDateValid,
      };

      if (Object.values(err).some((value) => value)) {
        setErr(err);
        return;
      }

      const fd = new FormData();

      fd.append('user_id', userInfo?._id);
      fd.append('name', form.name);
      fd.append('description', form.description);
      fd.append('time', time);
      fd.append('recipes', JSON.stringify(recipesArray));
      fd.append('startDate', selectedStartDate);
      fd.append('endDate', selectedEndDate);

      if (form.image == null) {
        fd.append('image', null);
      } else {
        fd.append('image', {
          name: `${new Date().getMilliseconds()}-${form.name}.jpg`,
          uri: form.image,
          type: 'image/jpg',
        });
      }

      // network error here
      const response = await axios.put(`meals/${meal_id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data?.status === 'record created') {
        updateMealPlan(response.data?.data);
        fetchPersonalMeals(userInfo?._id);
        navigation.navigate('Planner', { time });
      }
    } catch (error) {
      console.error('Error Says: ', error);
    }
  };

  const removeRecipe = (id) => {
    return removeRecipes(id);
  };

  DropDownPicker.setListMode('MODAL');

  return (
    <ScrollView
      keyboardShouldPersistTaps='always'
      style={{ backgroundColor: 'white' }}
    >
      <View style={styles.container}>
        <Text style={styles.highlights}>Name & Photo</Text>
        {meal?.image ? (
          <>
            {form.image == null ? (
              <TouchableHighlight onPress={pickImage}>
                <Image source={{ uri: meal?.image }} style={styles.hasImage} />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight onPress={pickImage}>
                <Image source={{ uri: form.image }} style={styles.hasImage} />
              </TouchableHighlight>
            )}
          </>
        ) : (
          <TouchableHighlight onPress={pickImage}>
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

        <Text style={[styles.labels, { marginTop: SIZES.lg }]}>Name</Text>
        <TextInput
          placeholder='Name of meal plan'
          value={form.name != null ? form.name : meal?.name}
          onChangeText={(text) => {
            setForm({ ...form, name: text });
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
          value={
            form.description != null ? form.description : meal?.description
          }
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

        <Text style={styles.labels}>Meal Plan Duration</Text>
        <View style={{ marginBottom: 10 }}>
          <Calendar
            style={[
              styles.borderWidth,
              { borderRadius: 15, padding: 10, marginBottom: 10 },
            ]}
            onDayPress={(day) => handleDatePress(day.dateString)}
            markedDates={markedDates}
            enableSwipeMonths={true}
            allowSelectionOutOfRange={true}
          />
          {err.date && (
            <Text
              style={{
                color: COLORS.danger,
                fontFamily: FONT.regular,
                fontSize: SIZES.sm,
                textAlign: 'center',
              }}
            >
              Please select meal plan duration.
            </Text>
          )}
        </View>

        <Text style={styles.labels}>Select Plan Meal Time</Text>
        <View style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={styles.dd}
            placeholder='Select time for meal'
            open={openTime}
            value={time != null ? time : meal?.time}
            items={data2}
            setOpen={setOpenTime}
            setValue={setTime}
            setItems={setData2}
            showBadgeDot={false}
          />
        </View>
        {err.time && (
          <Text
            style={{
              color: COLORS.danger,
              fontFamily: FONT.regular,
              fontSize: SIZES.sm,
              textAlign: 'center',
            }}
          >
            Please select meal time.
          </Text>
        )}

        <View
          style={[
            styles.mtlg,
            { flexDirection: 'row', justifyContent: 'space-around' },
          ]}
        >
          <MealButton />
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
            <Text style={[styles.labels]}>Recipes</Text>
            <View>
              {recipesObj.length > 0 ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={recipesObj}
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
                            padding: 10,
                          }}
                        >
                          {name}
                        </Text>
                        <Pressable
                          onPress={() => {
                            removeRecipe(item?._id);
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
                <Text style={styles.highlights}>Empty Recipe</Text>
              )}
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.submitButton, styles.mtxl]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Update</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default UpdateMeal;
