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
import { AntDesign } from '@expo/vector-icons';

import { COLORS, SIZES, CT, privacyData } from '../../constants';
import styles from '../../styles/recipeForm';
import useIngredientsStore from '../../store/useIngredientsStore';

const RecipesFormScreen = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    procedure: '',
    image: null,
    privacy: 'public',
    cookingTime: 5,
  });

  const [permission, setPermission] = useState(false);

  // const [openIngredients, setOpenIngredients] = useState(false);
  // const [openRecipesType, setOpenRecipesType] = useState(false);
  // const [openPreferences, setOpenPreferences] = useState(false);
  // const [openCuisine, setOpenCuisine] = useState(false);
  // const [cuisine, setCuisine] = useState('');
  // const [ingredientsValue, setIngredientsValue] = useState(null);
  // const [recipesType, setRecipesType] = useState([]);
  // const [preferences, setPreferences] = useState([]);

  const {
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    listIngredients,
    page,
  } = useIngredientsStore();

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
    listIngredients(page);
  }, [page, items]);

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

  // dropdown picker mode
  DropDownPicker.setMode('BADGE');
  DropDownPicker.setListMode('MODAL');

  // submit form
  function handleSubmit() {
    console.log('recipe submitted');
  }

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
          placeholder='Name of recipe'
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={[styles.input, styles.mb, styles.borderWidth]}
        />

        <Text style={[styles.labels]}>Description</Text>
        <TextInput
          placeholder='Add recipe description'
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          style={[styles.textarea, styles.mb, styles.borderWidth]}
          multiline={true}
          numberOfLines={10}
        />

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

        <Text style={[styles.labels, styles.mt]}>Procedure</Text>
        <TextInput
          placeholder='Add one procedure per line'
          value={form.procedure}
          onChangeText={(text) => setForm({ ...form, procedure: text })}
          style={[styles.textarea, styles.mb, styles.borderWidth]}
          multiline={true}
          numberOfLines={10}
        />

        <Text style={[styles.highlights, styles.mtlg]}>Recipe Information</Text>

        {/* <Text style={styles.labels}>Course Type</Text>
        <View style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={styles.dd}
            placeholder='Select course type'
            searchPlaceholder='Search course type'
            multiple={true}
            searchable={true}
            open={openRecipesType}
            value={recipesType}
            items={data}
            setOpen={setOpenRecipesType}
            setValue={setRecipesType}
            setItems={setData}
            showBadgeDot={false}
            // itemKey="value" (id)
          />
        </View> */}

        {/* <Text style={[styles.labels, styles.mt]}>Preference</Text>
        <View style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={styles.dd}
            placeholder='Select preferences'
            searchPlaceholder='Search preferences'
            multiple={true}
            searchable={true}
            open={openPreferences}
            value={preferences}
            items={data}
            setOpen={setOpenPreferences}
            setValue={setPreferences}
            setItems={setData}
            showBadgeDot={false}
            // itemKey="value" (id)
          />
        </View> */}

        {/* <Text style={[styles.labels, styles.mt]}>Cuisine</Text>
        <View style={styles.select}>
          <DropDownPicker
            placeholderStyle={styles.ddPlaceholder}
            style={styles.dd}
            placeholder='Select cuisine'
            searchPlaceholder='Search cuisine'
            searchable={true}
            open={openCuisine}
            value={cuisine}
            items={data}
            setOpen={setOpenCuisine}
            setValue={setCuisine}
            setItems={setData}
            showBadgeDot={false}
            // itemKey="value" (id)
          />
        </View> */}

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
    </ScrollView>
  );
};

export default RecipesFormScreen;
