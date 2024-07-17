import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import Button from '../../components/common/Button'
import { fontSize } from '../../utils/fontSizes'
import { baseAxios, domain } from '../../hooks/requests'
import { CHANGE_PROFILE_IMAGES, PROFILE_IMAGE, PROFILE_IMAGES } from '../../urls'
import { GlobalContext } from '../../context/GlobalContext'
import { showToast } from '../../components/common/Toast'
import ImageButtonModal from '../../components/ImageButtonModal'
import RenderImageButton from '../../components/RenderImageButton'

export default function AddProfileImage({ route }) {
    const { profile } = route.params
    const [images, setImages] = useState(Array(6).fill(null))
    const [imageLoading, setImageLoading] = useState(Array(6).fill(false))
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const { token } = useContext(GlobalContext)
    const [buttonNumbers, setButtonNumbers] = useState([])
    const [selectedImageIndex, setSelectedImageIndex] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false)
    const [fetchedImages, setFetchedImages] = useState([])

    async function fetchProfileImages() {
        try {
            setLoading(true)
            const response = await baseAxios.get(PROFILE_IMAGES, { params: { profile } })
            setFetchedImages(response.data)
        } catch (error) {
            console.log(error.response.data)
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
            showToast('error', 'Oh!', "Rasm o'chirildi")

            fetchProfileImages()
        } catch (error) {
            setServerError(error.response)
            showToast('error', 'Oops!', 'Nomalum xatolik')
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
            quality: 0.6,
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
        formData.append('profile', profile)

        try {
            setServerError('')
            setValidationError('')
            setLoading(true)
            await axios.post(`${domain}/api/v1${CHANGE_PROFILE_IMAGES}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Token ${token}` },
            })
            showToast('success', 'Woohoo!', 'Rasmlar o\'zgartirildi')
        } catch (error) {
            showToast('warning', 'Oops!', "Yangi rasm qo'shish talab etiladi")
        } finally {
            setLoading(false)
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
                    Foydalanuvchilarni jalb qilish maqsadida ko'proq rasm joylashtirishingiz tavsiya etiladi!
                </Text>
            </View>

            <View style={styles.imageButtonWrapper}>
                {images.map((image, index) => (
                    <RenderImageButton
                        /* eslint-disable-next-line react/no-array-index-key */
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
        fontSize: normalize(26),
        fontWeight: '600',
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
