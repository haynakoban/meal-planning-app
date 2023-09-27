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
import axios from '../../lib/axiosConfig';

const MealFormScreen = () => {
  const clearMeal = useMealPlanRecipe((state) => state.clearMeal);
  const { multipleRecipes, recipesObj } = useMealPlanRecipe();

  const userInfo = useAuthStore((state) => state.userInfo);
  const recipesArray = useMealPlanRecipe((state) => state.recipesArray);
  const removeRecipes = useMealPlanRecipe((state) => state.removeRecipes);

  const [permission, setPermission] = useState(false);
  const [openDay, setOpenDay] = useState(false);
  const [day, setDay] = useState(null);
  const [data, setData] = useState([
    {
      label: 'Monday',
      value: 'monday',
    },
    {
      label: 'Tuesday',
      value: 'tuesday',
    },
    {
      label: 'Wednesday',
      value: 'wednesday',
    },
    {
      label: 'Thursday',
      value: 'thursday',
    },
    {
      label: 'Friday',
      value: 'friday',
    },
    {
      label: 'Saturday',
      value: 'saturday',
    },
    {
      label: 'Sunday',
      value: 'sunday',
    },
  ]);

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
    name: false,
    description: false,
    privacy: false,
    day: false,
    data: false,
    time: false,
  });

  useEffect(() => {
    if (recipesObj.length != recipesArray.length) {
      multipleRecipes(recipesArray);
    }
  }, [recipesArray]);

  useEffect(() => {
    if (err.day === true) {
      setErr({ ...err, day: false });
    }
  }, [day]);

  useEffect(() => {
    if (err.time === true) {
      setErr({ ...err, time: false });
    }
  }, [time]);

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
  const handleSubmit = async () => {
    try {
      const isNameValid = form.name !== null && form.name !== '';
      const isDescriptionValid =
        form.description !== null && form.description !== '';
      const isDayValid = day !== null && day !== 0;
      const isDataValid = recipesArray.length !== 0;
      const isTimeValid = time !== null && day !== 0;

      const err = {
        name: !isNameValid,
        description: !isDescriptionValid,
        day: !isDayValid,
        data: !isDataValid,
        time: !isTimeValid,
      };

      if (Object.values(err).some((value) => value)) {
        setErr(err);
        return;
      }

      const fd = new FormData();
      fd.append('user_id', userInfo?._id);
      fd.append('name', form.name);
      fd.append('description', form.description);
      fd.append('privacy', form.privacy);
      fd.append('day', day);
      fd.append('time', time);
      fd.append('recipes', JSON.stringify(recipesArray));

      fd.append('image', {
        name: `${new Date().getMilliseconds()}-${form.name}.jpg`,
        uri: form.image,
        type: 'image/jpg',
      });
      console.log(fd);
      // network error here
      // const response = await axios.post(`meals`, fd, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });

      // if (response.data?.status === 'record created') {
      //   navigation.navigate('Planner');
      // }
    } catch (error) {
      console.error('Error Says: ', error);
    }
  };

  const removeRecipe = (id) => {
    return removeRecipes(id);
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
        <Text style={styles.labels}>Select Plan Meal Day</Text>
        <View style={[styles.select, styles.mb]}>
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
