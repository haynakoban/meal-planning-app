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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, SIZES, CT, privacyData, FONT } from '../../constants';
import styles from '../../styles/recipeForm';
import useIngredientsStore from '../../store/useIngredientsStore';
import useCuisinesStore from '../../store/useCuisinesStore';
import useMealTypeStore from '../../store/useMealTypeStore';
import ModifyIngredientModal from '../../components/modals/ModifyIngredientModal';
import usePreferencesStore from '../../store/usePreferencesStore';
import useAuthStore from '../../store/useAuthStore';
import axios from '../../lib/axiosConfig';
// import RNFS from 'react-native-fs';

const RecipesFormScreen = ({ navigation }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const [err, setErr] = useState({
    name: false,
    description: false,
    procedure: false,
    ingredients: false,
    meal_types: false,
  });

  const [form, setForm] = useState({
    name: '',
    description: '',
    procedure: [],
    image: null,
    privacy: 'public',
    cookingTime: 5,
  });

  const [permission, setPermission] = useState(false);

  const {
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    listIngredients,
    clearValue,
  } = useIngredientsStore();

  // cuisine
  const selected = useIngredientsStore((state) => state.selected);
  const openCuisine = useCuisinesStore((state) => state.open);
  const setOpenCuisine = useCuisinesStore((state) => state.setOpen);
  const cuisineValue = useCuisinesStore((state) => state.value);
  const cuisines = useCuisinesStore((state) => state.items);
  const setCuisine = useCuisinesStore((state) => state.setItems);
  const setCuisineValue = useCuisinesStore((state) => state.setValue);
  const listCuisines = useCuisinesStore((state) => state.listCuisines);
  const clearCuisine = useCuisinesStore((state) => state.clearCuisine);

  // mealtype
  const openMealType = useMealTypeStore((state) => state.open);
  const setOpenMealtype = useMealTypeStore((state) => state.setOpen);
  const mealTypeValue = useMealTypeStore((state) => state.value);
  const meal_types = useMealTypeStore((state) => state.items);
  const setMealType = useMealTypeStore((state) => state.setItems);
  const setMealTypeValue = useMealTypeStore((state) => state.setValue);
  const listMealTypes = useMealTypeStore((state) => state.listMealTypes);
  const clearMealType = useMealTypeStore((state) => state.clearMealType);

  // preferences
  const openPreferences = usePreferencesStore((state) => state.open);
  const setOpenPreferences = usePreferencesStore((state) => state.setOpen);
  const preferencesValue = usePreferencesStore((state) => state.value);
  const preferences = usePreferencesStore((state) => state.items);
  const setPreferences = usePreferencesStore((state) => state.setItems);
  const setPreferencesValue = usePreferencesStore((state) => state.setValue);
  const listPreferences = usePreferencesStore((state) => state.listPreferences);
  const clearPreferences = usePreferencesStore(
    (state) => state.clearPreferences
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState('');

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

  useEffect(() => {
    clearValue([]);
    clearCuisine([]);
    clearMealType([]);
    clearPreferences([]);
    listIngredients();
    listCuisines();
    listMealTypes();
    listPreferences();
  }, []);

  useEffect(() => {
    if (err.ingredients === true) {
      setErr({
        ...err,
        ingredients: false,
      });
    }
  }, [value]);

  useEffect(() => {
    if (err.meal_types === true) {
      setErr({
        ...err,
        meal_types: false,
      });
    }
  }, [mealTypeValue]);

  console.log(form.image);

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
          image: result.assets[0],
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

  // dropdown picker mode
  DropDownPicker.setMode('BADGE');
  DropDownPicker.setListMode('MODAL');

  // submit form
  const handleSubmit = async () => {
    try {
      const getSelectedData = selected.filter((selectedItem) =>
        value.some((valItem) => valItem[0] === selectedItem.ingredients_id)
      );
      const isImageValid = form.image !== null && form.image !== '';
      const isNameValid = form.name !== null && form.name !== '';
      const isDescriptionValid =
        form.description !== null && form.description !== '';
      const isProcedureValid = form.procedure.length > 0;
      const isIngredientsValid =
        getSelectedData.length > 0 && getSelectedData.length === value.length;
      const isMealTypeValid = mealTypeValue.length > 0;

      const err = {
        name: !isNameValid,
        description: !isDescriptionValid,
        procedure: !isProcedureValid,
        image: !isImageValid,
        ingredients: !isIngredientsValid,
        meal_types: !isMealTypeValid,
      };

      if (Object.values(err).some((value) => value)) {
        setErr(err);
        return;
      }

      // const formData = new FormData();
      // formData.append({
      //   user_id: userInfo._id,
      //   name: form.name,
      //   description: form.description,
      //   image: form.image,
      //   privacy: form.procedure?.filter((item) => item != '') || [],
      //   cooking_time: form.cookingTime,
      //   meal_types: mealTypeValue,
      //   cuisines: cuisineValue,
      //   preferences: preferencesValue,
      // });
      // console.log(formData._parts[0]);

      const data = {
        user_id: userInfo._id,
        name: form.name,
        description: form.description,
        image: base64Data,
        privacy: form.procedure?.filter((item) => item != '') || [],
        cooking_time: form.cookingTime,
        meal_types: mealTypeValue,
        cuisines: cuisineValue,
        preferences: preferencesValue,
      };
      const response = await axios.post(`recipes`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); // error here
      console.log(response.data); // or error here
      if (response.status === 'success') {
        navigation.navigate('Recipes');
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const openModal = (id) => {
    setSelectedData(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedData('');
    setModalVisible(false);
  };

  const checkIfIdExists = (id) => {
    return selected.some((item) => item.ingredients_id === id);
  };

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <View style={styles.container}>
        <Text style={styles.highlights}>Name & Photo</Text>
        {form.image != null ? (
          <TouchableHighlight onPress={pickImage}>
            <Image source={{ uri: form.image }} style={styles.hasImage} />
          </TouchableHighlight>
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

        <Text style={[styles.labels, { marginTop: SIZES.sm }]}>Name</Text>
        <TextInput
          placeholder='Name of recipe'
          value={form.name}
          onChangeText={(text) => {
            setForm({ ...form, name: text });
            setErr({
              ...err,
              name: false,
            });
          }}
          style={[styles.input, styles.borderWidth]}
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

        <Text style={[styles.labels, { marginTop: SIZES.sm }]}>
          Description
        </Text>
        <TextInput
          placeholder='Add recipe description'
          value={form.description}
          onChangeText={(text) => {
            setForm({ ...form, description: text });
            setErr({
              ...err,
              description: false,
            });
          }}
          style={[styles.textarea, styles.borderWidth]}
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
          Ingredients & Procedure
        </Text>

        <Text style={styles.labels}>Ingredients</Text>
        <ScrollView style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={[styles.noBorderWidth, styles.noBG]}
            placeholder='Select ingredients'
            searchPlaceholder='Search ingredients'
            multiple={true}
            searchable={true}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            showBadgeDot={false}
          />
        </ScrollView>
        {value && <View style={{ marginTop: 10 }}></View>}
        {value &&
          value.map((item, index) => {
            return (
              <Pressable
                key={item[0]}
                style={{
                  padding: 15,
                  backgroundColor: COLORS.primary,
                  borderRadius: 8,
                  marginBottom: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  openModal({ id: item[0], name: item[1] });
                  setErr({
                    ...err,
                    ingredients: false,
                  });
                }}
              >
                <Text style={styles.smallLabel}>{item[1]}</Text>
                {checkIfIdExists(item[0]) ? (
                  <AntDesign
                    name='checkcircle'
                    size={20}
                    color={COLORS.accent}
                  />
                ) : (
                  <Text style={[styles.smallLabel, { color: COLORS.danger }]}>
                    Setup Required
                  </Text>
                )}
              </Pressable>
            );
          })}
        {err.ingredients && (
          <Text
            style={{
              color: COLORS.danger,
              fontFamily: FONT.regular,
              fontSize: SIZES.sm,
              textAlign: 'center',
            }}
          >
            Please select and setup the ingredients.
          </Text>
        )}

        <Text style={[styles.labels, styles.mt]}>Procedure</Text>
        <TextInput
          placeholder='Add one procedure per line'
          value={(form.procedure || []).join('\n')}
          onChangeText={(text) => {
            setForm({
              ...form,
              procedure: text.split('\n'),
            });
            setErr({
              ...err,
              procedure: false,
            });
          }}
          style={[styles.textarea, styles.borderWidth]}
          multiline={true}
          numberOfLines={10}
          textAlignVertical='top'
        />
        {err.procedure && (
          <Text
            style={{
              color: COLORS.danger,
              fontFamily: FONT.regular,
              fontSize: SIZES.sm,
              textAlign: 'center',
            }}
          >
            Procedure field is required.
          </Text>
        )}

        <Text style={[styles.highlights, styles.mtlg]}>Recipe Information</Text>

        <Text style={styles.labels}>Meal Type</Text>
        <View style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={styles.dd}
            placeholder='Select course type'
            searchPlaceholder='Search course type'
            multiple={true}
            searchable={true}
            open={openMealType}
            value={mealTypeValue}
            items={meal_types}
            setOpen={setOpenMealtype}
            setValue={setMealTypeValue}
            setItems={setMealType}
            showBadgeDot={false}
          />
        </View>
        {err.meal_types && (
          <Text
            style={{
              color: COLORS.danger,
              fontFamily: FONT.regular,
              fontSize: SIZES.sm,
              textAlign: 'center',
            }}
          >
            Please select meal type.
          </Text>
        )}

        <Text style={[styles.labels, styles.mt]}>Preference</Text>
        <View style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={styles.dd}
            placeholder='Select preferences'
            searchPlaceholder='Search preferences'
            multiple={true}
            searchable={true}
            open={openPreferences}
            value={preferencesValue}
            items={preferences}
            setOpen={setOpenPreferences}
            setValue={setPreferencesValue}
            setItems={setPreferences}
            showBadgeDot={false}
          />
        </View>

        <Text style={[styles.labels, styles.mt]}>Cuisine</Text>
        <View style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={styles.dd}
            placeholder='Select cuisine'
            searchPlaceholder='Search cuisine'
            multiple={true}
            searchable={true}
            open={openCuisine}
            value={cuisineValue}
            items={cuisines}
            setOpen={setOpenCuisine}
            setValue={setCuisineValue}
            setItems={setCuisine}
            showBadgeDot={false}
          />
        </View>

        <Text style={[styles.labels, styles.mt]}>Cooking Time</Text>
        <View>
          {CT.map((_, i) => {
            const { t, s } = _;
            return (
              <Pressable
                key={i}
                style={styles.cookingTime}
                onPress={() => setForm({ ...form, cookingTime: t })}
              >
                <RadioButton
                  value={t}
                  status={form.cookingTime === t ? 'checked' : 'unchecked'}
                  onPress={() => setForm({ ...form, cookingTime: t })}
                />
                <Text style={styles.fffs}>
                  {t === 60 ? '1' : t === 120 ? '2' : t} {s}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.highlights, styles.mtxl]}>Recipe Privacy</Text>

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

      {modalVisible && (
        <ModifyIngredientModal
          visible={modalVisible}
          data={selectedData}
          onClose={closeModal}
        />
      )}
    </ScrollView>
  );
};

export default RecipesFormScreen;
