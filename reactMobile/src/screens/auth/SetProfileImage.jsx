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
import ServerError from '../../components/common/ServerError'
import { GlobalContext } from '../../context/GlobalContext'
import { SIGN_UP } from '../../urls'
import { domain } from '../../hooks/requests'
import { getToken } from '../../hooks/usePushNotification'

export default function SetProfileImage({ route }) {
    const [images, setImages] = useState(Array(6).fill(null))
    const [imageLoading, setImageLoading] = useState(Array(6).fill(false))
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const [buttonNumbers, setButtonNumbers] = useState([])

    const { phoneNumber, password, name, birthdate, gender, region, goal } = route.params || {}
    const { auth } = useContext(GlobalContext)
    const navigation = useNavigation()

    const pickImage = async (index) => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            maxWidth: 840,
            maxHeight: 640,
            quality: 0.8,
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
        const deviceToken = await getToken()

        formData.append('phone_number', phoneNumber)
        formData.append('password', password)
        formData.append('profile.name', name)
        formData.append('profile.region', region)
        formData.append('profile.birthdate', birthdate)
        formData.append('profile.gender', gender)
        formData.append('profile.goal', goal)
        buttonNumbers.forEach((number) => {
            formData.append('button_numbers', number)
        })
        formData.append('device', deviceToken)

        if (images.filter((image) => image !== null).length < 2) {
            setValidationError('* Kamida 2 ta rasm qo\'shing')
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
            setServerError('')
            setValidationError('')
            setLoading(true)

            const response = await axios.post(`${domain}/api/v1${SIGN_UP}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            auth(response.data.token, response.data.user, response.data.profile)
            navigation.reset({ index: 0, routes: [{ name: 'TabScreen' }] })
            navigation.navigate('TabScreen')
        } catch (error) {
            console.log(error.response.data)
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <View>
                <Text style={styles.title}>Rasmingiz ...</Text>
                <Text style={styles.subTitle}>Kamida 2 ta rasm yuklashingiz lozim!</Text>
            </View>

            <View style={styles.imageButtonWrapper}>

                {images.map((image, index) => (
                    <TouchableOpacity
                        /* eslint-disable-next-line react/no-array-index-key */
                        key={index}
                        activeOpacity={0.3}
                        onPress={() => pickImage(index)}
                        disabled={index > 0 && images[index - 1] === null}
                        style={styles.imageButton}>

                        {/* eslint-disable-next-line no-nested-ternary */}
                        {imageLoading[index] ? (
                            <ActivityIndicator size="small" color={COLOR.primary} />
                        ) : (
                            image && image[0].uri !== '' ? (
                                <Image source={{ uri: image[0].uri }} style={styles.imageButton} />
                            ) : null

                        )}

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

            {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}
            <ServerError error={serverError} style={styles.serverError} />

            <View style={styles.buttonWrapper}>
                <Button title="Davom etish" onPress={onSubmit} loading={loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: fontSize.extraLarge,
        fontWeight: '500',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 4,
        marginBottom: 30,
        lineHeight: 19.5,
        fontSize: fontSize.small,
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
    serverError: {
        position: 'absolute',
        top: 12,
    },
    validationError: {
        color: COLOR.primary,
        marginTop: 6,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
