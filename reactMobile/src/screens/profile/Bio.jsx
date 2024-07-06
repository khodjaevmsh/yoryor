import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import Input from '../../components/common/Input'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import { GlobalContext } from '../../context/GlobalContext'
import Button from '../../components/common/Button'
import { showToast } from '../../components/common/Toast'

export default function Bio({ route }) {
    const [loading, setLoading] = useState(false)
    const { fetchedProfile } = route.params
    const { setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        bio: Yup.string()
            .max(200, "Ma'lumot 195 ta harfdan yoki belgidan oshmasligi lozim"),
    })

    async function onSubmit(data) {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', fetchedProfile?.id), { bio: data.bio })
            navigation.goBack()
            if ((fetchedProfile && fetchedProfile.bio) !== data.bio) {
                setRender(true)
                showToast('success', 'Woohoo!', 'Bio o\'zgartirildi')
            }
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
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <>
                                <Input
                                    name="bio"
                                    keyboardType="default"
                                    style={styles.input}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Masalan: Men doimiy optimist.
                                     Kulishni va hayotdan bahramand boʼlishni yaxshi koʼradigan inson qidiryapman..."
                                />
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
        fontSize: normalize(26),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 8,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    input: {
        width: '100%',
        minHeight: normalize(145),
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        fontSize: fontSize.medium,
        marginTop: 22,
        borderRadius: 19,
        borderWidth: 2,
        borderColor: COLOR.lightGrey,
        paddingTop: normalize(15),
        paddingBottom: 15,
        paddingLeft: normalize(18),
        paddingRight: normalize(18),
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
