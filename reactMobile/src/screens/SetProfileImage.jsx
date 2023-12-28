import { Image, Text, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import normalize from 'react-native-normalize'
import { Plus, Minus } from 'react-native-feather'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import Button from '../components/common/Button'
import ServerError from '../components/common/ServerError'
import { GlobalContext } from '../context/GlobalContext'

export default function SetProfileImage({ route }) {
    const [images, setImages] = useState(Array(6).fill(null))
    const [imageLoading, setImageLoading] = useState(Array(6).fill(false))
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')

    const { phoneNumber, password, name, birthdate, region, goal } = route.params
    const { auth } = useContext(GlobalContext)
    const navigation = useNavigation()

    const pickImage = async (index) => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            maxWidth: 1000,
            maxHeight: 1000,
            quality: 0.5,
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
    }

    async function onSubmit() {
        const formData = new FormData()

        formData.append('phone_number', phoneNumber)
        formData.append('password', password)
        formData.append('profile.name', name)
        formData.append('profile.region', region)
        formData.append('profile.birthdate', birthdate)
        formData.append('profile.goal', goal)

        if (images.filter((image) => image !== null).length < 2) {
            setValidationError('Kamida 2 ta rasm qo\'shing')
        }

        if (images.filter((image) => image !== null).length > 0) {
            images.forEach((image) => {
                if (image) {
                    formData.append('uploaded_images', {
                        uri: image ? image[0].uri : '',
                        name: image[0].fileName,
                        type: image[0].type,
                    })
                }
            })

            try {
                setServerError('')
                setValidationError('')
                setLoading(true)

                const response = await axios.post('http://127.0.0.1:8000/api/v1/users/sign-up', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })

                auth(response.data.token, response.data.user)
                navigation.reset({ index: 0, routes: [{ name: 'TabScreen' }] })
                navigation.navigate('TabScreen')
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
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
                        key={index}
                        activeOpacity={0.3}
                        onPress={() => pickImage(index)}
                        disabled={index > 0 && images[index - 1] === null}
                        style={styles.imageButton}>

                        {imageLoading[index] ? (
                            <ActivityIndicator size="small" color={COLOR.primary} />
                        ) : (
                            <Image source={image ? { uri: image[0].uri } : null} style={styles.imageButton} />
                        )}

                        <View style={styles.addIcon}>
                            {!image ? (
                                <Plus width={16} height={16} color={COLOR.white} />
                            ) : (
                                <Minus width={16} height={16} color={COLOR.white} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
                {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}
            </View>

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
        padding: 4,
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
