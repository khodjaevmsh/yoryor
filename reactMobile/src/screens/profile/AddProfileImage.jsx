import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import ServerError from '../../components/common/ServerError'
import Button from '../../components/common/Button'
import { fontSize } from '../../utils/fontSizes'
import { baseAxios, domain } from '../../hooks/requests'
import { CHANGE_PROFILE_IMAGES, PROFILE_IMAGE, PROFILE_IMAGES } from '../../urls'
import { GlobalContext } from '../../context/GlobalContext'
import { showToast } from '../../components/common/Toast'
import ImageButtonModal from '../../components/ImageButtonModal'
import RenderImageButton from '../../components/RenderImageButton'

export default function AddProfileImage({ route }) {
    const { fetchedProfile } = route.params
    const [images, setImages] = useState(Array(6).fill(null))
    const [imageLoading, setImageLoading] = useState(Array(6).fill(false))
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const { setRender, token } = useContext(GlobalContext)
    const [buttonNumbers, setButtonNumbers] = useState([])
    const [selectedImageIndex, setSelectedImageIndex] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false)
    const [fetchedImages, setFetchedImages] = useState([])

    async function fetchProfileImages() {
        try {
            setLoading(true)

            const response = await baseAxios.get(PROFILE_IMAGES.replace('{id}', fetchedProfile))
            setFetchedImages(response.data)
        } catch (error) {
            setValidationError('Nomalum xatolik, qaytib urinib ko\'ring')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfileImages()
    }, [])

    async function handleDelete() {
        try {
            const updatedImageLoading = [...imageLoading]
            updatedImageLoading[selectedImageIndex] = true
            setImageLoading(updatedImageLoading)

            await baseAxios.delete(PROFILE_IMAGE.replace('{id}', fetchedImages[selectedImageIndex].id))

            updatedImageLoading[selectedImageIndex] = false
            setImageLoading(updatedImageLoading)

            setModalVisible(false)
            setRender(true)
            showToast('error', 'Muvaffaqiyatli', 'Rasm o\'chirildi.')

            fetchProfileImages()
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    const pickImage = async (index) => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            maxWidth: 740,
            maxHeight: 740,
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
                setModalVisible(false)
            }
        })
        setButtonNumbers([...buttonNumbers, index + 1])
    }

    async function onSubmit() {
        const formData = new FormData()

        if (fetchedImages.length < 2) {
            setValidationError('* Kamida 2 ta rasm qo\'shing')
        } else if (images.filter((image) => image !== null).length >= 1) {
            images.forEach((image) => {
                if (image) {
                    formData.append('uploaded_images', {
                        uri: image ? image[0].uri : '',
                        name: `${image[0].fileName}`,
                        type: image[0].type,
                    })
                }
            })
            buttonNumbers.forEach((number) => {
                formData.append('button_numbers', number)
            })
            formData.append('profile', fetchedProfile)

            try {
                setServerError('')
                setValidationError('')
                setLoading(true)

                await axios.post(`${domain}/api/v1${CHANGE_PROFILE_IMAGES}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${token}` },
                })
                setRender(true)
                showToast('success', 'Muvaffaqiyatli', 'Rasmlar o\'zgartirildi.')
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        }
    }

    const handleImagePress = (index) => {
        setSelectedImageIndex(index)
        setModalVisible(true)
    }

    return (
        <Container>
            <View>
                <Text style={styles.title}>Rasmingiz ...</Text>
                <Text style={styles.subTitle}>
                    Foydalanuvchilarni jalb qilish maqsadida ko'proq rasm joylashtirish maslahat beriladi!
                </Text>
            </View>

            <View style={styles.imageButtonWrapper}>
                {images.map((image, index) => (
                    <RenderImageButton
                        key={index}
                        images={images}
                        fetchedImages={fetchedImages}
                        handleImagePress={handleImagePress}
                        image={image}
                        imageLoading={imageLoading}
                        index={index}
                        token={token} />
                ))}
                {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}
                <ServerError error={serverError} style={styles.serverError} />
            </View>

            <View style={styles.buttonWrapper}>
                <Button title="Saqlash" onPress={onSubmit} loading={loading} />
            </View>

            <ImageButtonModal
                loading={loading}
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                pickImage={pickImage}
                selectedImageIndex={selectedImageIndex}
                handleDelete={handleDelete}
                fetchedImages={fetchedImages} />

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
