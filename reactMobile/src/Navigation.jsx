import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import normalize from 'react-native-normalize'
import { ChevronLeft } from 'react-native-feather'
import { COLOR } from './utils/colors'
import Likes from './screens/Likes'
import Splash from './screens/Splash'
import SignUp from './screens/auth/SignUp'
import { GlobalContext } from './context/GlobalContext'
import SetPassword from './screens/auth/SetPassword'
import SignIn from './screens/auth/SignIn'
import Chat from './screens/Chat'
import CheckConfirmationCode from './screens/auth/CheckConfirmationCode'
import SetName from './screens/auth/SetName'
import SetBirthDate from './screens/auth/SetBirthDate'
import SetGender from './screens/auth/SetGender'
import SetGoal from './screens/auth/SetGoal'
import SetCity from './screens/auth/SetCity'
import SetProfileImage from './screens/auth/SetProfileImage'
import Discover from './screens/Discover'
import Encounter from './screens/Encounter'

import Settings from './screens/settings/Settings'
import MaritalStatus from './screens/profile/MaritalStatus'
import Goal from './screens/profile/Goal'
import FinancialStatus from './screens/profile/FinancialStatus'
import Weight from './screens/profile/Weight'
import Zodiac from './screens/profile/Zodiac'
import Bio from './screens/profile/Bio'
import BirthDate from './screens/profile/BirthDate'
import Gender from './screens/profile/Gender'
import Education from './screens/profile/Education'
import Height from './screens/profile/Height'
import Job from './screens/profile/Job'
import City from './screens/profile/City'
import ConfirmEmail from './screens/settings/ConfirmEmail'
import ChangePassword from './screens/settings/ChangePassword'
import ChangeLanguage from './screens/settings/ChangeLanguage'
import AboutApp from './screens/settings/AboutApp'
import Help from './screens/settings/Help'
import AddProfileImage from './screens/profile/AddProfileImage'
import MyProfileDetail from './screens/profile/MyProfileDetail'
import { ChatRounded, EncounterI, Heart, UserRounded, Widget4 } from './components/common/Svgs'
import Profile from './screens/Profile'
import ReceiverDetail from './screens/discover/ReceiverDetail'
import ChatDetail from './screens/chat/ChatDetail'
import ForgotYourPassword from './screens/auth/ForgotYourPassword'
import SetNewPassword from './screens/auth/SetNewPassword'
import SetEducation from './screens/auth/SetEducation'
import SetJob from './screens/auth/SetJob'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function Navigation() {
    const { token } = useContext(GlobalContext)
    const initial = token ? 'TabScreen' : 'Splash'

    // async function rmToken() {
    //     await AsyncStorage.removeItem('token')
    //     await AsyncStorage.removeItem('user')
    //     await AsyncStorage.removeItem('profile')
    // }
    // rmToken()

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#ffffff',
        },
    }

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName={initial} screenOptions={({ navigation }) => ({
                headerTitle: () => false,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerLeft: () => (Platform.OS === 'ios' ? (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: -8 }}>
                        <ChevronLeft width={32} height={32} color={COLOR.primary} />
                    </TouchableOpacity>
                ) : null),
            })}>
                <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Splash" component={Splash} options={{
                    headerShown: false, gestureEnabled: false,
                }} />

                {/*  AUTH  */}
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true }} />
                <Stack.Screen name="CheckConfirmationCode" component={CheckConfirmationCode} options={{
                    headerShown: true,
                }} />
                <Stack.Screen name="SetPassword" component={SetPassword} options={() => ({
                    headerShown: true, gestureEnabled: false,
                })} />
                <Stack.Screen name="SetName" component={SetName} options={() => ({
                    headerShown: true, gestureEnabled: false,
                })} />
                <Stack.Screen name="SetBirthDate" component={SetBirthDate} options={{ headerShown: true }} />
                <Stack.Screen name="SetGender" component={SetGender} options={{ headerShown: true }} />
                <Stack.Screen name="SetCity" component={SetCity} options={{ headerShown: true }} />
                <Stack.Screen name="SetEducation" component={SetEducation} options={{ headerShown: true }} />
                <Stack.Screen name="SetJob" component={SetJob} options={{ headerShown: true }} />
                <Stack.Screen name="SetGoal" component={SetGoal} options={{ headerShown: true }} />
                <Stack.Screen name="SetProfileImage" component={SetProfileImage} options={{ headerShown: true }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: true }} />
                <Stack.Screen name="ForgotYourPassword" component={ForgotYourPassword} options={{
                    headerShown: true,
                }} />
                <Stack.Screen name="SetNewPassword" component={SetNewPassword} options={() => ({
                    headerShown: true, gestureEnabled: false,
                })} />

                {/*  PROFILE  */}
                <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
                <Stack.Screen name="MyProfileDetail" component={MyProfileDetail} options={{ headerShown: true }} />
                <Stack.Screen name="AddProfileImage" component={AddProfileImage} options={{ headerShown: true }} />
                <Stack.Screen name="Bio" component={Bio} options={{ headerShown: true }} />
                <Stack.Screen name="BirthDate" component={BirthDate} options={{ headerShown: true }} />
                <Stack.Screen name="Gender" component={Gender} options={{ headerShown: true }} />
                <Stack.Screen name="Education" component={Education} options={{ headerShown: true }} />
                <Stack.Screen name="Job" component={Job} options={{ headerShown: true }} />
                <Stack.Screen name="MaritalStatus" component={MaritalStatus} options={{ headerShown: true }} />
                <Stack.Screen name="City" component={City} options={{ headerShown: true }} />
                <Stack.Screen name="Goal" component={Goal} options={{ headerShown: true }} />
                <Stack.Screen name="FinancialStatus" component={FinancialStatus} options={{ headerShown: true }} />
                <Stack.Screen name="Height" component={Height} options={{ headerShown: true }} />
                <Stack.Screen name="Weight" component={Weight} options={{ headerShown: true }} />
                <Stack.Screen name="Zodiac" component={Zodiac} options={{ headerShown: true }} />

                {/*  SETTINGS  */}
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{ headerShown: true }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: true }} />
                <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} options={{ headerShown: true }} />
                <Stack.Screen name="AboutApp" component={AboutApp} options={{ headerShown: true }} />
                <Stack.Screen name="Help" component={Help} options={{ headerShown: true }} />

                {/*  DISCOVER  */}
                <Stack.Screen name="ReceiverDetail" component={ReceiverDetail} options={{
                    headerShown: true,
                    gestureEnabled: true,
                }} />

                {/*  CHAT  */}
                <Stack.Screen name="ChatDetail" component={ChatDetail} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

function TabScreen() {
    const { numOfLikes, numOfUnseenMessages } = useContext(GlobalContext)
    return (
        <Tab.Navigator initialRouteName="Encounter" screenOptions={{
            headerTitle: () => false,
            tabBarLabel: () => false,
        }}>
            <Tab.Screen name="Discover" component={Discover} options={{
                tabBarIcon: ({ focused }) => (
                    <Widget4 color={focused ? COLOR.black : COLOR.grey} width={28} height={28} strokeWidth={2.2} />
                ),
            }} />
            <Tab.Screen name="Likes" component={Likes} options={{
                tabBarIcon: ({ focused }) => (
                    <Heart color={focused ? COLOR.black : COLOR.grey} width={31} height={31} strokeWidth={2.2} />
                ),
            }} />
            <Tab.Screen name="Encounter" component={Encounter} options={{
                tabBarIcon: ({ focused }) => (
                    <EncounterI color={focused ? COLOR.black : COLOR.grey} width={29} height={29} strokeWidth={2.2} />
                ),
            }} />
            <Tab.Screen name="Chats" component={Chat} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.tabBarIconWrapper}>
                        <View style={styles.badge} />
                        <ChatRounded width={30} height={30} color={focused ? COLOR.black : COLOR.grey} />
                    </View>
                ),
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused }) => (
                    <UserRounded width={31} height={31} color={focused ? COLOR.black : COLOR.grey} />
                ),
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarIconWrapper: {
        flexDirection: 'row-reverse',
    },
    badge: {
        width: 9,
        height: 9,
        backgroundColor: COLOR.red,
        borderRadius: 55,
        position: 'absolute',
        zIndex: 1,
    },
})
