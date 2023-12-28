import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { ClinkingGlasses, FaceWithHeart, HeartWithArrow, WavingHand } from '../components/common/Svgs'

const goals = [
    { id: 1, type: 'match', title: 'Juftlik topish', icon: <HeartWithArrow /> },
    { id: 2, type: 'friendship', title: 'Do\'st ortirish', icon: <WavingHand /> },
    { id: 3, type: 'long_term_dating', title: 'Uzoq muddatli tanishuv', icon: <FaceWithHeart /> },
    { id: 4, type: 'short_term_dating', title: 'Qisqa muddatli tanishuv', icon: <ClinkingGlasses /> },
]

export default function SetGoal({ route }) {
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [goal, setGoal] = useState(null)
    const navigation = useNavigation()
    const { phoneNumber, password, name, birthdate, region } = route.params

    // async function onSubmit() {
    //     if (!goal) {
    //         setValidationError('Maqsadingizni tanlang')
    //     } else {
    //         try {
    //             setLoading(true)
    //             const response = await baseAxios.post(SIGN_UP, {
    //                 phoneNumber,
    //                 password,
    //                 profile: { name, birthdate, region, goal },
    //             })
    //
    //             await auth(response.data.token, response.data.user)
    //
    //             navigation.reset({ index: 0, routes: [{ name: 'TabScreen' }] })
    //             navigation.navigate('TabScreen')
    //         } catch (error) {
    //             setServerError(error.response)
    //         } finally {
    //             setServerError(false)
    //         }
    //     }
    // }

    function onSubmit() {
        if (goal) {
            setLoading(true)
            setValidationError('')
            navigation.navigate('SetProfileImage', {
                phoneNumber,
                password,
                name,
                birthdate,
                region,
                goal,
            })
        } else {
            setValidationError('Maqsadingizni tanlang')
        }
        setLoading(false)
    }

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity
                key={item.id}
                activeOpacity={1}
                onPress={() => setGoal(item.type)}
                style={[styles.goal, goal === item.type && styles.selected]}>

                <View>{item.icon}</View>
                <Text style={styles.goalText}>{item.title}</Text>

            </TouchableOpacity>
        </View>
    )

    return (
        <Container>
            <View>
                <Text style={styles.title}>Maqsadim ...</Text>

                <FlatList
                    data={goals}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    style={styles.container}
                    columnWrapperStyle={styles.goals}
                    renderItem={renderItem} />

            </View>

            <View style={styles.buttonWrapper}>
                {validationError && !goal ? <Text style={styles.validationError}>{validationError}</Text> : null}
                <Button
                    title="Davom etish"
                    onPress={onSubmit}
                    buttonStyle={styles.button}
                    loading={loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: fontSize.extraLarge,
        fontWeight: '500',
        marginBottom: 18,
    },
    goals: {
        justifyContent: 'space-between',
    },
    goal: {
        width: normalize(103),
        height: normalize(135),
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLOR.extraLightGrey,
        borderWidth: 1.2,
        borderColor: COLOR.extraLightGrey,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 9,
        marginVertical: 6,
    },
    goalText: {
        fontSize: fontSize.small,
        color: COLOR.black,
        textAlign: 'center',
    },
    selected: {
        borderWidth: 1.2,
        borderColor: COLOR.primary,
    },
    validationError: {
        color: COLOR.primary,
        marginBottom: 18,
        marginLeft: 3,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
