import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MessageCircle, User, Heart } from 'react-native-feather'
import { StyleSheet, Text } from 'react-native'
import { useContext } from 'react'
import Chats from './screens/Chats'
import { COLOR } from './utils/colors'
import Profile from './screens/Profile'
import Discover from './screens/Discover'
import Splash from './screens/Splash'
import SignUp from './screens/SignUp'
import ConfirmCode from './screens/ConfirmCode'
import { GlobalContext } from './context/GlobalContext'
import SetPassword from './screens/SetPassword'
import SignIn from './screens/SignIn'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function Navigation() {
    const { token } = useContext(GlobalContext)
    const initial = token ? 'TabScreen' : 'SetPassword'

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#ffffff',
        },
    }

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName={initial} screenOptions={{
                headerTitle: () => false,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTintColor: COLOR.primary,
            }}>
                <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true }} />
                <Stack.Screen name="ConfirmCode" component={ConfirmCode} options={{ headerShown: true }} />
                <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: true }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function TabScreen() {
    return (
        <Tab.Navigator screenOptions={{
            headerStyle: styles.headerStyle,
            tabBarLabel: () => false,
            tabBarStyle: styles.tabBarStyle,
        }}>
            <Tab.Screen name="Discover" component={Discover} options={{
                tabBarIcon: ({ focused }) => (
                    <Heart color={focused ? COLOR.black : COLOR.darkGrey} width={28} height={28} strokeWidth={2.2} />
                ),
            }} />
            <Tab.Screen name="Chats" component={Chats} options={{
                tabBarIcon: ({ focused }) => (
                    <MessageCircle color={focused ? COLOR.black : COLOR.darkGrey} width={28} height={28} strokeWidth={2.2} />
                ),
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused }) => (
                    <User color={focused ? COLOR.black : COLOR.darkGrey} width={28} height={28} strokeWidth={2.2} />
                ),
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    tabBarStyle: {
        borderTopWidth: 0, // Remove the top border
        elevation: 0, // For Android, remove shadow
    },
})
