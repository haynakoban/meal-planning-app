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

import { ActivityIndicator } from 'react-native-paper';
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
import { Calendar } from 'react-native-calendars';

function LoadingScreen({ failed, success }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.25)',
        zIndex: 999,
        width: '100%',
      }}
    >
      {!failed && !success && (
        <ActivityIndicator animating={true} color={COLORS.white} />
      )}
      {failed && (
        <View
          style={{
            padding: 15,
            borderRadius: 8,
            backgroundColor: COLORS.danger,
            width: '80%',
          }}
        >
          <Text style={{ fontFamily: FONT.regular, color: COLORS.white }}>
            Something went wrong, please try again.
          </Text>
        </View>
      )}
      {success && (
        <View
          style={{
            padding: 15,
            borderRadius: 8,
            backgroundColor: 'green',
            width: '80%',
          }}
        >
          <Text style={{ fontFamily: FONT.regular, color: COLORS.white }}>
            Meal created successfully.
          </Text>
        </View>
      )}
    </View>
  );
}

const MealFormScreen = () => {
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

  const { multipleRecipes, recipesObj } = useMealPlanRecipe();

  const userInfo = useAuthStore((state) => state.userInfo);
  const { recipesArray, removeRecipes, clearRecipes, addMealPlan, clearMeal } =
    useMealPlanRecipe();

  useEffect(() => {
    clearRecipes();
    clearMeal();
  }, []);

  const [permission, setPermission] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const [err, setErr] = useState({
    image: false,
    name: false,
    description: false,
    data: false,
    time: false,
    date: false,
  });

  useEffect(() => {
    if (recipesObj.length != recipesArray.length) {
      multipleRecipes(recipesArray);
    }
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
    name: '',
    description: '',
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
        setErr({ ...err, image: false });
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
      const isImageValid = form.image !== null;
      const isNameValid = form.name !== null && form.name !== '';
      const isDescriptionValid =
        form.description !== null && form.description !== '';
      const isDataValid = recipesArray.length !== 0;
      const isTimeValid = time !== null && time !== 0;
      const isDateValid =
        selectedStartDate !== null && selectedEndDate !== null;

      const err = {
        image: !isImageValid,
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

      setIsLoading(true);

      const fd = new FormData();

      fd.append('user_id', userInfo?._id);
      fd.append('name', form.name);
      fd.append('description', form.description);
      fd.append('time', time);
      fd.append('recipes', JSON.stringify(recipesArray));
      fd.append('startDate', selectedStartDate);
      fd.append('endDate', selectedEndDate);

      fd.append('image', {
        name: `${new Date().getMilliseconds()}-${form.name}.jpg`,
        uri: form.image,
        type: 'image/jpg',
      });

      const response = await axios.post(`meals`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data?.status === 'record created') {
        clearRecipes();
        addMealPlan(response.data?.data);
        setSuccess(true);
        setTimeout(() => {
          navigation.navigate('Planner', { time: response?.data?.data?.time });
        }, 1000);
      } else {
        setFailed(true);
        setTimeout(() => {
          setFailed(false);
          setIsLoading(false);
        }, 2000);
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
    <>
      {isLoading && <LoadingScreen failed={failed} success={success} />}
      <ScrollView
        keyboardShouldPersistTaps='always'
        style={{ backgroundColor: 'white' }}
      >
        <View style={styles.container}>
          <Text style={styles.highlights}>Name & Photo</Text>
          {form.image != null ? (
            <TouchableHighlight onPress={pickImage} style={styles.mb}>
              <Image source={{ uri: form.image }} style={styles.hasImage} />
            </TouchableHighlight>
          ) : (
            <TouchableHighlight onPress={pickImage} style={styles.mb}>
              <View style={styles.noImage}>
                <AntDesign
                  name='camerao'
                  size={SIZES.xl}
                  color={COLORS.black}
                />
                <Text style={styles.addLabel}>Add Cover Photo</Text>
              </View>
            </TouchableHighlight>
          )}

          {err.image && (
            <Text
              style={{
                color: COLORS.danger,
                fontFamily: FONT.regular,
                fontSize: SIZES.sm,
                textAlign: 'center',
              }}
            >
              Cover photo is requried.
            </Text>
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
              value={time}
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
                {recipesArray.length > 0 ? (
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
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};
export default MealFormScreen;
