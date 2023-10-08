import { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../styles/profile';
import axios from '../../lib/axiosConfig';
import { COLORS, FONT, SIZES } from '../../constants';
import { formatNumber } from '../../lib/formatNumber';
import useAuthStore from '../../store/useAuthStore';
import useRecipeStore from '../../store/useRecipeStore';
import UserRecipes from './UserRecipes';

const UserProfile = ({ route, navigation }) => {
  const id = route.params.id;
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const otherRecipes = useRecipeStore((state) => state.otherRecipes);
  const setOtherRecipes = useRecipeStore((state) => state.setOtherRecipes);

  useEffect(() => {
    setOtherRecipes(id);
  }, []);

  const { userInfo, followUser } = useAuthStore();
  const {
    profileContainer,
    profileText,
    mv,
    bio,
    name,
    groupButton,
    groupButtonView,
    groupButtonViewNumber,
    groupButtonViewText,
    groupButtonWrapper,
  } = styles;

  const handleRefresh = () => {
    setRefreshing(true);

    fetchUser();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (userData) {
      navigation.setOptions({
        headerTitle: `${userData.username}`,
      });
    }
  }, [userData, navigation]);

  const fetchUser = async () => {
    const simulateDelay = () =>
      new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await simulateDelay();

      const response = await axios.get(`users/${id}`);

      const fetchedUserData = response.data.data;

      if (fetchedUserData) {
        setUserData(fetchedUserData);

        const isFollow = userInfo?.public_metrics?.following?.includes(id);

        if (isFollow) {
          setHasFollowed(true);
        } else {
          setHasFollowed(false);
        }
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const handleFollow = (type) => {
    if (type === 'follow') {
      setUserData((prevUserData) => ({
        ...prevUserData,
        public_metrics: {
          ...prevUserData.public_metrics,
          followers: [...prevUserData.public_metrics.followers, id],
        },
      }));
      setHasFollowed(true);
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        public_metrics: {
          ...prevUserData.public_metrics,
          followers: prevUserData.public_metrics.followers?.filter(
            (id) => id !== id
          ),
        },
      }));
      setHasFollowed(false);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={[profileContainer]}>
        <View
          style={{
            justifyContentL: 'center',
            alignItems: 'center',
            paddingHorizontal: SIZES.md,
            width: '100%',
          }}
        >
          {/* make this conditional */}
          <View style={{ marginVertical: SIZES.md }}>
            {userData?.image ? (
              <Avatar.Image
                size={80}
                style={{
                  backgroundColor: COLORS.accent,
                }}
                source={{ uri: userData?.image }}
              />
            ) : (
              <Avatar.Icon
                size={80}
                style={{
                  backgroundColor: COLORS.accent,
                }}
                icon={() => (
                  <Ionicons
                    name='ios-person-outline'
                    size={40}
                    color={COLORS.primary}
                  />
                )}
              />
            )}
          </View>

          <View style={[profileText, { alignItems: 'center' }]}>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[name, profileText, { color: COLORS.black }]}
            >
              {userData?.fullname}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <TouchableOpacity
                style={[
                  groupButton,
                  {
                    width: 'auto',
                    alignItems: 'flex-start',
                  },
                ]}
                activeOpacity={1}
                onPress={() => console.log('hello')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Text
                    style={[
                      groupButtonViewText,
                      {
                        fontFamily: FONT.bold,
                        color: COLORS.black,
                        marginRight: 4,
                      },
                    ]}
                  >
                    {formatNumber(userData?.public_metrics?.following?.length)}
                  </Text>
                  <Text
                    style={[
                      groupButtonViewText,
                      {
                        fontFamily: FONT.semiBold,
                        color: COLORS.black,
                      },
                    ]}
                  >
                    Following
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  groupButton,
                  {
                    width: 'auto',
                    alignItems: 'flex-start',
                  },
                ]}
                activeOpacity={1}
                onPress={() => console.log('hello')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Text
                    style={[
                      groupButtonViewText,
                      {
                        fontFamily: FONT.bold,
                        color: COLORS.black,
                        marginRight: 4,
                      },
                    ]}
                  >
                    {formatNumber(userData?.public_metrics?.followers?.length)}
                  </Text>
                  <Text
                    style={[
                      groupButtonViewText,
                      {
                        fontFamily: FONT.semiBold,
                        color: COLORS.black,
                      },
                    ]}
                  >
                    Followers
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* follow */}
            <View style={{ alignItems: 'center', marginVertical: 4 }}>
              {hasFollowed ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    borderColor: COLORS.gray,
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    borderRadius: 6,
                  }}
                  onPress={() => {
                    followUser({
                      my_id: userInfo?._id,
                      user_id: userData?._id,
                      type: 'unfollow',
                    });
                    handleFollow('unfollow');
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.semiBold,
                      fontSize: SIZES.sm + 2,
                      color: COLORS.black,
                    }}
                  >
                    Following
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.accent,
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    borderRadius: 6,
                  }}
                  onPress={() => {
                    followUser({
                      my_id: userInfo?._id,
                      user_id: userData?._id,
                      type: 'follow',
                    });
                    handleFollow('follow');
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.semiBold,
                      fontSize: SIZES.sm + 2,
                      color: COLORS.primary,
                    }}
                  >
                    Follow
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <Text
              multiline={true}
              style={[
                bio,
                profileText,
                {
                  marginTop: 4,
                  textAlign: 'center',
                  width: '75%',
                  color: '#222',
                },
              ]}
            >
              {userData?.bio || 'this is my bio'}
            </Text>
          </View>
        </View>

        {/* group button */}
        <View style={groupButtonWrapper}>
          <TouchableOpacity
            style={[
              groupButton,
              {
                backgroundColor: COLORS.lightWhite,
              },
            ]}
            colo
            activeOpacity={1}
          >
            <View style={groupButtonView}>
              <Text
                style={[
                  groupButtonViewNumber,
                  {
                    fontFamily: FONT.bold,
                    color: COLORS.accent,
                  },
                ]}
              >
                {otherRecipes?.length || '...'}
              </Text>
              <Text
                style={[
                  groupButtonViewText,
                  {
                    fontFamily: FONT.bold,
                    color: COLORS.accent,
                  },
                ]}
              >
                Recipes
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* content here */}
        <View style={{ marginTop: 20 }}>
          <UserRecipes user_id={id} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
