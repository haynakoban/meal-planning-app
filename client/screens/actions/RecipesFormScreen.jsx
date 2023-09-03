import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  Platform,
  TouchableHighlight,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '../../constants';

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

  const [openIngredients, setOpenIngredients] = useState(false);
  const [openRecipesType, setOpenRecipesType] = useState(false);
  const [openPreferences, setOpenPreferences] = useState(false);
  const [openCuisine, setOpenCuisine] = useState(false);
  const [cuisine, setCuisine] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipesType, setRecipesType] = useState([]);
  const [preferences, setPreferences] = useState([]);

  const [data, setData] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Egg Plant', value: 'eggplant' },
    { label: 'Egg', value: 'egg' },
    { label: 'Papaya', value: 'papaya' },
    { label: 'Ampalaya', value: 'ampalaya' },
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
              <AntDesign name='camerao' size={24} color='black' />
              <Text style={styles.addLabel}>Add Cover Photo</Text>
            </View>
          </TouchableHighlight>
        )}

        <Text style={styles.labels}>Name</Text>
        <TextInput
          placeholder='Name of recipe'
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={[styles.input, styles.mb, { borderWidth: 1 }]}
        />

        <Text style={[styles.labels]}>Description</Text>
        <TextInput
          placeholder='Add recipe description'
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          style={[styles.textarea, styles.mb, { borderWidth: 1 }]}
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
            style={{ borderWidth: 0, backgroundColor: 'none' }}
            placeholder='Select ingredients'
            searchPlaceholder='Search ingredients'
            multiple={true}
            searchable={true}
            open={openIngredients}
            value={ingredients}
            items={data}
            setOpen={setOpenIngredients}
            setValue={setIngredients}
            setItems={setData}
            showBadgeDot={false}
            // itemKey="value" (id)
          />
        </ScrollView>

        <Text style={[styles.labels, styles.mt]}>Procedure</Text>
        <TextInput
          placeholder='Add one procedure per line'
          value={form.procedure}
          onChangeText={(text) => setForm({ ...form, procedure: text })}
          style={[styles.textarea, styles.mb, { borderWidth: 1 }]}
          multiline={true}
          numberOfLines={10}
        />

        <Text style={[styles.highlights, styles.mtlg]}>Recipe Information</Text>

        <Text style={styles.labels}>Course Type</Text>
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
        </View>

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
            value={preferences}
            items={data}
            setOpen={setOpenPreferences}
            setValue={setPreferences}
            setItems={setData}
            showBadgeDot={false}
            // itemKey="value" (id)
          />
        </View>

        <Text style={[styles.labels, styles.mt]}>Cuisine</Text>
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
        </View>

        <Text style={[styles.labels, styles.mt]}>Cooking Time</Text>
        <View>
          {/* 5 minutes */}
          <Pressable
            style={styles.cookingTime}
            onPress={() => setForm({ ...form, cookingTime: 5 })}
          >
            <RadioButton
              value={5}
              status={form.cookingTime === 5 ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, cookingTime: 5 })}
            />
            <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
              5 minutes
            </Text>
          </Pressable>
          {/* 10 minutes */}
          <Pressable
            style={styles.cookingTime}
            onPress={() => setForm({ ...form, cookingTime: 10 })}
          >
            <RadioButton
              value={10}
              status={form.cookingTime === 10 ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, cookingTime: 10 })}
            />
            <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
              10 minutes
            </Text>
          </Pressable>
          {/* 20 minutes */}
          <Pressable
            style={styles.cookingTime}
            onPress={() => setForm({ ...form, cookingTime: 20 })}
          >
            <RadioButton
              value={20}
              status={form.cookingTime === 20 ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, cookingTime: 20 })}
            />
            <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
              20 minutes
            </Text>
          </Pressable>
          {/* 30 minutes */}
          <Pressable
            style={styles.cookingTime}
            onPress={() => setForm({ ...form, cookingTime: 30 })}
          >
            <RadioButton
              value={30}
              status={form.cookingTime === 30 ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, cookingTime: 30 })}
            />
            <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
              30 minutes
            </Text>
          </Pressable>
          {/* 1 hour */}
          <Pressable
            style={styles.cookingTime}
            onPress={() => setForm({ ...form, cookingTime: 60 })}
          >
            <RadioButton
              value={60}
              status={form.cookingTime === 60 ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, cookingTime: 60 })}
            />
            <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
              1 hour
            </Text>
          </Pressable>
          {/* 2 hour */}
          <Pressable
            style={styles.cookingTime}
            onPress={() => setForm({ ...form, cookingTime: 120 })}
          >
            <RadioButton
              value={120}
              status={form.cookingTime === 120 ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, cookingTime: 120 })}
            />
            <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
              2 hours
            </Text>
          </Pressable>
        </View>

        <Text style={[styles.highlights, styles.mtxl]}>Recipe Privacy</Text>

        <View>
          <Pressable
            style={[
              styles.privacyStyle,
              ,
              form.privacy === 'public'
                ? { backgroundColor: COLORS.primary }
                : '',
            ]}
            onPress={() => setForm({ ...form, privacy: 'public' })}
          >
            <RadioButton
              value='public'
              status={form.privacy === 'public' ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, privacy: 'public' })}
            />
            <View>
              <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
                Public
              </Text>
              <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.sm }}>
                Anyone can see this recipe.
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={[
              styles.privacyStyle,
              form.privacy === 'private'
                ? { backgroundColor: COLORS.primary }
                : '',
            ]}
            onPress={() => setForm({ ...form, privacy: 'private' })}
          >
            <RadioButton
              value='private'
              status={form.privacy === 'private' ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, privacy: 'private' })}
            />
            <View>
              <Text style={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}>
                Private
              </Text>
              <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.sm }}>
                Only you can see this recipe.
              </Text>
            </View>
          </Pressable>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'start',
    padding: 8,
  },
  input: {
    height: 50,
    borderRadius: 30,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
  },
  smallLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
  },
  textarea: {
    height: 150,
    justifyContent: 'flex-start',
    borderRadius: 15,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: FONT.regular,
    textAlignVertical: 'top',
    fontSize: SIZES.sm,
  },
  select: {
    borderRadius: 30,
    fontFamily: FONT.regular,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  ddPlaceholder: {
    fontFamily: FONT.regular,
    color: 'grey',
    borderRadius: 3,
    borderWidth: 0,
    fontSize: SIZES.sm,
  },
  dd: { borderWidth: 0, backgroundColor: 'none' },
  mb: {
    marginBottom: SIZES.sm,
  },
  mtxl: {
    marginTop: SIZES.xl,
  },
  mtlg: {
    marginTop: SIZES.lg,
  },
  mt: {
    marginTop: SIZES.sm,
  },
  highlights: {
    fontSize: SIZES.sm,
    fontFamily: FONT.medium,
    marginBottom: SIZES.sm,
  },
  labels: {
    fontSize: SIZES.md,
    fontFamily: FONT.semiBold,
    marginBottom: SIZES.sm,
  },
  addLabel: {
    fontSize: SIZES.sm,
    fontFamily: FONT.regular,
    marginTop: SIZES.sm,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'cover',
    width: '100%',
    borderWidth: 1,
    height: 250,
    borderRadius: 15,
  },
  hasImage: {
    width: '100%',
    objectFit: 'cover',
    height: 250,
    borderRadius: 15,
    borderWidth: 1,
  },
  privacyStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  cookingTime: { flexDirection: 'row', alignItems: 'center' },
  submitButton: {
    borderRadius: 3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
  },
  submitText: {
    fontSize: SIZES.lg,
    fontFamily: FONT.semiBold,
    color: 'white',
  },
});

export default RecipesFormScreen;
