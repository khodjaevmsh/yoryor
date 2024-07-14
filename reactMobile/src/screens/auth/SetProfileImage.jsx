import { Image, Text, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import normalize from 'react-native-normalize'
import { Plus, Edit2 } from 'react-native-feather'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import { SIGN_UP } from '../../urls'
import { domain } from '../../hooks/requests'
import { getToken } from '../../hooks/usePushNotification'
import ValidationError from '../../components/common/ValidationError'

export default function SetProfileImage({ route }) {
    const [images, setImages] = useState(Array(6).fill(null))
    const [imageLoading, setImageLoading] = useState(Array(6).fill(false))
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [buttonNumbers, setButtonNumbers] = useState([])

    const { phoneNumber, password, name, birthdate, gender, region, education, job, goal } = route.params
    const { auth } = useContext(GlobalContext)
    const navigation = useNavigation()

    const pickImage = async (index) => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            maxWidth: 840,
            maxHeight: 640,
            quality: 0.7,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }

        setImageLoading((prevLoading) => {
            const newLoading = [...prevLoading]
            newLoading[index] = true
            return newLoading
        })

        await launchImageLibrary(options, async ({ assets }) => {
            setImageLoading((prevLoading) => {
                const newLoading = [...prevLoading]
                newLoading[index] = false
                return newLoading
            })

            if (assets) {
                const newImages = [...images]
                newImages[index] = assets
                setImages(newImages)
            }
        })
        setButtonNumbers([...buttonNumbers, index + 1])
    }

    async function onSubmit() {
        const formData = new FormData()
        formData.append('country_code', '998')
        formData.append('phone_number', phoneNumber)
        formData.append('password', password)
        formData.append('profile.name', name)
        formData.append('profile.birthdate', birthdate)
        formData.append('profile.gender', gender)
        formData.append('profile.region', region)
        formData.append('profile.education_level', education.level)
        formData.append('profile.education_school', education.school)
        formData.append('profile.job_title', job.title)
        formData.append('profile.job_company', job.company)
        formData.append('profile.goal', goal)

        buttonNumbers.forEach((buttonNumber) => formData.append('button_numbers', buttonNumber))
        if (images.filter((image) => image !== null).length < 2) {
            setValidationError("Kamida 2 ta rasm qo'shing")
        } else {
            images.forEach((image) => {
                if (image) {
                    formData.append('uploaded_images', {
                        uri: image ? image[0].uri : '',
                        name: image[0].fileName,
                        type: image[0].type,
                    })
                }
            })
        }

        try {
            setLoading(true)

            const response = await axios.post(`${domain}/api/v1${SIGN_UP}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            auth(response.data.token, response.data.user, response.data.profile)

            navigation.navigate('TabScreen')
            navigation.reset({ index: 0, routes: [{ name: 'TabScreen' }] })

            await getToken()
        } catch (error) {
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <View>
                <Text style={styles.title}>Rasmingizni qo'shing</Text>
                <Text style={styles.subTitle}>
                    Foydalanuvchilarni jalb qilish maqsadida ikki va
                    undan ortiq rasm joylashtirishingiz tavsiya etiladi.
                </Text>
            </View>

            <View style={styles.imageButtonWrapper}>
                {images.map((image, index) => (

                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        onPress={() => pickImage(index)}
                        disabled={index > 0 && images[index - 1] === null}
                        style={styles.imageButton}>
                        {!imageLoading[index] ? (
                            <Image
                                source={{ uri: image && image[0].uri !== '' ? image[0].uri : null }}
                                style={styles.imageButton} />
                        ) : <ActivityIndicator size="small" color={COLOR.primary} />}

                        <View style={styles.addIcon}>
                            {!image ? (
                                <Plus width={16} height={16} color={COLOR.white} />
                            ) : (
                                <Edit2 width={16} height={16} color={COLOR.white} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.errorsWrapper}>
                <ValidationError validationError={validationError} />
            </View>
            <View style={styles.bottomWrapper}>
                <Button title="Davom etish" onPress={onSubmit} loading={loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 20,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    imageButtonWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    imageButton: {
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
    addIcon: {
        backgroundColor: COLOR.primary,
        padding: 7,
        borderRadius: 20,
        position: 'absolute',
        bottom: -5,
        right: -5,
    },
    errorsWrapper: {
        marginTop: 68,
    },
    bottomWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
