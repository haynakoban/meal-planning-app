import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  Platform,
  TouchableHighlight,
  TextInput,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '../../constants';

const RecipesFormScreen = () => {
  const [image, setImage] = useState(null);
  const [permission, setPermission] = useState(false);

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
        setImage(result.assets[0].uri);
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

  const [openIngredients, setOpenIngredients] = useState(false);
  const [openRecipesType, setOpenRecipesType] = useState(false);
  const [openPreferences, setOpenPreferences] = useState(false);
  const [openCuisine, setOpenCuisine] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipesType, setRecipesType] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [cuisine, setCuisine] = useState('');

  const [data, setData] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Egg Plant', value: 'eggplant' },
    { label: 'Egg', value: 'egg' },
    { label: 'Papaya', value: 'papaya' },
    { label: 'Ampalaya', value: 'ampalaya' },
  ]);

  const [privacy, setPrivacy] = useState('public');

  // dropdown picker mode
  DropDownPicker.setMode('BADGE');
  DropDownPicker.setListMode('MODAL');

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.highlights}>Name & Photo</Text>
        {image != null ? (
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
          style={[styles.input, styles.mb, { borderWidth: 1 }]}
        />

        <Text style={[styles.labels]}>Description</Text>
        <TextInput
          placeholder='Add recipe description'
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
          />
        </ScrollView>

        <Text style={[styles.labels, styles.mt]}>Procedure</Text>
        <TextInput
          placeholder='Add one procedure per line'
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
            selectedItemContainerStyle={{
              backgroundColor: COLORS.accent,
            }}
            selectedItemLabelStyle={{
              fontFamily: FONT.regular,
            }}
            listItemLabelStyle={{
              fontFamily: FONT.regular,
            }}
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
          />
        </View>

        <View
          style={[
            styles.mt,
            { flexDirection: 'row', gap: 20, justifyContent: 'center' },
          ]}
        >
          <Pressable
            value='public'
            onPress={() => setPrivacy('public')}
            style={[
              styles.privacyStyle,
              privacy === 'public'
                ? { backgroundColor: COLORS.accent }
                : { backgroundColor: COLORS.primary },
            ]}
          >
            <MaterialIcons name='public' size={24} color='black' />
            <Text style={styles.smallLabel}>Public</Text>
          </Pressable>
          <Pressable
            value='private'
            onPress={() => setPrivacy('private')}
            style={[
              styles.privacyStyle,
              privacy === 'private'
                ? { backgroundColor: COLORS.accent }
                : { backgroundColor: COLORS.primary },
            ]}
          >
            <Entypo name='lock' size={24} color='black' />
            <Text style={styles.smallLabel}>Private</Text>
          </Pressable>
        </View>
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
    borderRadius: 3,
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
    borderRadius: 3,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: FONT.regular,
    textAlignVertical: 'top',
    fontSize: SIZES.sm,
  },
  select: {
    borderRadius: 3,
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
  mtlg: {
    marginTop: SIZES.lg,
  },
  mt: {
    marginTop: SIZES.sm,
  },
  highlights: {
    fontSize: SIZES.sm,
    fontFamily: FONT.medium,
    marginBottom: 5,
  },
  labels: {
    fontSize: SIZES.medium,
    fontFamily: FONT.semiBold,
    marginBottom: 5,
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
    borderRadius: 3,
  },
  hasImage: {
    width: '100%',
    objectFit: 'cover',
    height: 250,
    borderRadius: 3,
    borderWidth: 1,
  },
  privacyStyle: {
    width: 'auto',
    padding: 15,
    alignItems: 'center',
    aspectRatio: 1 / 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
});

export default RecipesFormScreen;
