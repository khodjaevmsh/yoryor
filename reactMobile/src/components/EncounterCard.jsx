import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { COLOR } from '../utils/colors'
import EncounterItem from './EncounterItem'
import { baseAxios } from '../hooks/requests'
import { DISLIKES, LIKES } from '../urls'
import { showToast } from './common/Toast'
import { GlobalContext } from '../context/GlobalContext'
import MatchModal from './MatchModal'
import { overlayLabels } from '../utils/swiperOverlayLabes'
import ActivityIndicator from './common/ActivityIndicator'
import EmptyEncounter from './EmptyEncounter'

export default function EncounterCard({ receivers, setModalVisible }) {
    const [loading, setLoading] = useState(false)
    const [isMModalVisible, setMModalVisible] = useState(false)
    const [receiver, setReceiver] = useState({})
    const [room, setRoom] = useState(null)
    const [onSwipedAll, setOnSwipedAll] = useState(false)
    const { profile: sender, swiperRef } = useContext(GlobalContext)

    async function handleSwipedRight(cardIndex) {
        try {
            setLoading(true)
            if (receivers && receivers[cardIndex].id) {
                const response = await baseAxios.post(LIKES, {
                    sender: sender.id,
                    receiver: receivers[cardIndex].id,
                })

                if (response.data.match === true) {
                    setReceiver(response.data.receiver)
                    setRoom(response.data.room)
                    setMModalVisible(true)
                }
            }
        } catch (error) {
            showToast('error', 'Oops!', 'Nomalum xatolik')
        } finally {
            setLoading(false)
        }
    }

    async function handleSwipedLeft(cardIndex) {
        try {
            setLoading(true)
            if (receivers[cardIndex].id) {
                await baseAxios.post(DISLIKES, { sender: sender.id, receiver: receivers[cardIndex].id })
            }
        } catch (error) {
            console.log(error.response.data)
            showToast('error', 'Oops!', 'Nomalum xatolik')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            {!onSwipedAll && receivers.length > 0 ? (
                <Swiper
                    ref={swiperRef}
                    cards={receivers}
                    renderCard={(item) => <EncounterItem swiperRef={swiperRef} receiver={item} />}
                    onSwipedRight={handleSwipedRight}
                    onSwipedLeft={handleSwipedLeft}
                    cardIndex={0}
                    stackSize={3}
                    verticalSwipe={false}
                    onSwipedAll={() => setOnSwipedAll(true)}
                    backgroundColor={COLOR.white}
                    cardVerticalMargin={12}
                    cardHorizontalMargin={5}
                    stackAnimationFriction={10}
                    overlayLabels={overlayLabels} />
            ) : <EmptyEncounter setModalVisible={setModalVisible} />}

            <MatchModal
                isModalVisible={isMModalVisible}
                setModalVisible={setMModalVisible}
                receiver={receiver}
                sender={sender}
                room={room} />

            {loading && !onSwipedAll ? <ActivityIndicator /> : null}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.white,
    },
})
