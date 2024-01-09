import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import Input from '../../components/common/Input'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import { GlobalContext } from '../../context/GlobalContext'
import Button from '../../components/common/Button'

export default function Bio({ route }) {
    const [loading, setLoading] = useState(false)
    const { profile, fetchedProfile } = route.params
    const { setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit(data) {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), { bio: data.bio })
            navigation.goBack()
            setRender(true)
        } catch (error) {
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Profilingizni to'ldiring</Text>
                <Text style={styles.subTitle}>
                    Boshqalarning e'tiborini jalb qilish uchun o'zingiz haqingizda gapiring bering.
                </Text>

                <View style={{ flex: 1 }}>
                    <Formik
                        initialValues={{ bio: (fetchedProfile && fetchedProfile.bio) || '' }}
                        validationSchema={null}
                        onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <>
                                <View style={styles.inputWrapper}>
                                    <Input
                                        name="bio"
                                        keyboardType="default"
                                        style={styles.input}
                                        multiline
                                        numberOfLines={4}
                                        placeholder="Oilali erkaklar yozmsin..."
                                    />
                                </View>

                                <View style={styles.buttonWrapper}>
                                    <Button title="Qo'shish" onPress={handleSubmit} loading={loading} />
                                </View>
                            </>
                        )}
                    </Formik>
                </View>

            </Container>
        </KeyboardAvoiding>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '500',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 8,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    inputWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: normalize(15),
        paddingLeft: normalize(25),
        paddingRight: normalize(20),
        borderRadius: 19,
        borderWidth: 2,
        borderColor: COLOR.lightGrey,
        marginTop: 22,
    },
    input: {
        width: '100%',
        minHeight: normalize(100),
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        fontSize: fontSize.medium,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})