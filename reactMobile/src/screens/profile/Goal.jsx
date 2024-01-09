import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import { ClinkingGlasses, FaceWithHeart, HeartWithArrow, WavingHand } from '../../components/common/Svgs'
import ServerError from '../../components/common/ServerError'

const goals = [
    { id: 1, type: 'match', title: 'Juftlik topish', icon: <HeartWithArrow /> },
    { id: 2, type: 'friendship', title: 'Do\'st ortirish', icon: <WavingHand /> },
    { id: 3, type: 'long_term_dating', title: 'Uzoq muddatli tanishuv', icon: <FaceWithHeart /> },
    { id: 4, type: 'short_term_dating', title: 'Qisqa muddatli tanishuv', icon: <ClinkingGlasses /> },
]

export default function Goal({ route }) {
    const { props } = route.params
    const [goal, setGoal] = useState(props.goal.value)
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    useEffect(() => {
        setValidationError('')
    }, [goal])

    async function onSubmit() {
        if (!goal) {
            setValidationError('* Maqsadingizni tanlang')
        } else {
            try {
                setLoading(true)
                await baseAxios.put(PROFILE.replace('{id}', profile.id), { goal })
                navigation.goBack()
                setRender(true)
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        }
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
                <Text style={styles.title}>Tanishuv maqsadi ...</Text>

                <FlatList
                    data={goals}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    style={styles.container}
                    columnWrapperStyle={styles.goals}
                    renderItem={renderItem} />

            </View>

            <View style={styles.buttonWrapper}>
                <ServerError error={serverError} style={styles.serverError} />
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
        fontSize: normalize(28),
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
        borderRadius: 15,
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
