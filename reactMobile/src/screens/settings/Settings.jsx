import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { ChevronRight, Mail, Lock, Globe, AlertCircle, HelpCircle } from 'react-native-feather'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { baseAxios } from '../../hooks/requests'
import { SIGN_OUT, USER } from '../../urls'
import { GlobalContext } from '../../context/GlobalContext'
import Button from '../../components/common/Button'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import ButtonOutline from '../../components/common/ButtonOutline'
import CenteredModal from '../../components/CenteredModal'

const cardData = [
    { title: 'Email', maxLength: 10, screen: 'ConfirmEmail', icon: <Mail color={COLOR.black} /> },
    { title: "Parolni o'zgartirish", screen: 'ChangePassword', icon: <Lock color={COLOR.black} /> },
    { title: "Tilni o'zgartirish", screen: 'ChangeLanguage', icon: <Globe color={COLOR.black} /> },
    { title: 'Ilova haqida', screen: 'AboutApp', icon: <AlertCircle color={COLOR.black} /> },
    { title: "Bog'lanish", screen: 'Help', icon: <HelpCircle color={COLOR.black} /> },
]

export default function Settings() {
    const [loading, setLoading] = useState(false)
    const [deletionLoading, setDeletionLoading] = useState(false)
    const [, setServerError] = useState(false)
    const [isDeletionModal, setDeletionModal] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const { signOut, user } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSignOut() {
        try {
            setLoading(true)
            await baseAxios.delete(SIGN_OUT)
            await signOut()
            setModalVisible(false)
            navigation.navigate('Splash')
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    async function onDeleteProfile() {
        try {
            setDeletionLoading(true)
            await baseAxios.delete(USER.replace('{id}', user.id))
            await signOut()
            setDeletionModal(false)
            navigation.navigate('Splash')
        } catch (error) {
            setServerError(error.response)
        } finally {
            setDeletionLoading(false)
        }
    }

    return (
        <Container>
            <Text style={styles.headerTitle}>Sozlamalar</Text>

            <View style={{ flex: 3, marginTop: 28 }}>
                <Text style={styles.sectionTitle}>Asosiy</Text>
                {cardData.map((item) => (
                    <TouchableWithoutFeedback key={item.screen} onPress={() => navigation.navigate(item.screen)}>
                        <View style={styles.card}>
                            <View style={styles.leftSide}>
                                {item.icon}
                                <Text style={styles.cardTitle}>{item.title}</Text>
                            </View>
                            <View style={styles.rightSide}>
                                <ChevronRight width={26} height={26} color={COLOR.grey} strokeWidth={2.3} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>

            <View>
                <ButtonOutline
                    title="Akkauntni o'chirish"
                    onPress={() => setDeletionModal(true)}
                    loading={deletionLoading}
                    buttonStyle={{ marginBottom: 12 }} />

                <Button
                    title="Chiqish"
                    onPress={() => setModalVisible(true)}
                    loading={loading} />
            </View>

            <CenteredModal isModalVisible={isDeletionModal} setModalVisible={setDeletionModal}>
                <Text style={styles.modalText}>
                    Akkauntingizni butunlay o'chirmoqchimisiz?
                </Text>
                <Text style={styles.modalSubText}>
                    Barcha ma'lumotlaringiz hamda yozishmalaringiz butunlay o'chib ketadi!
                </Text>
                <Button title="Ha, o'chirmoqchi" buttonStyle={styles.modalButtonStyle} onPress={onDeleteProfile} />
                <ButtonOutline title="Otrga qaytish" buttonStyle={styles.modalButtonStyle} onPress={() => setDeletionModal(false)} />
            </CenteredModal>

            <CenteredModal isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
                <Text style={styles.modalText}>Akkauntdan chiqmoqchimisiz?</Text>
                <Text style={styles.modalSubText}>Qaytib keling, Sizni kutamiz!</Text>
                <Button title="Ha, chiqmoqchiman" buttonStyle={styles.modalButtonStyle} onPress={onSignOut} />
                <ButtonOutline title="Otrga qaytish" buttonStyle={styles.modalButtonStyle} onPress={() => setModalVisible(false)} />
            </CenteredModal>
        </Container>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: normalize(28),
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: fontSize.medium,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: COLOR.grey,
        marginBottom: 12,
    },
    card: {
        width: '100%',
        height: normalize(52),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1.2,
        borderColor: COLOR.extraLightGrey,
        // backgroundColor: 'yellow',
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cardTitle: {
        marginLeft: 12,
        fontWeight: '400',
        fontSize: fontSize.medium,
    },
    value: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        marginRight: 2,
    },

    modalText: {
        fontSize: normalize(15),
        textAlign: 'center',
        fontWeight: '600',
        color: COLOR.darkGrey,
        lineHeight: 22,
        marginBottom: 10,
    },
    modalSubText: {
        fontSize: normalize(15),
        textAlign: 'center',
        fontWeight: '300',
        color: COLOR.darkGrey,
        lineHeight: 22,
        marginBottom: 22,
    },
    modalButtonStyle: {
        height: normalize(44),
        marginVertical: 8,
    },
})
