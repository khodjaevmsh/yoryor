import React, { useContext, useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { X } from 'react-native-feather'
import { COLOR } from '../utils/colors'
import EncounterItem from './EncounterItem'
import { baseAxios } from '../hooks/requests'
import { DISLIKES, LIKES } from '../urls'
import { showToast } from './common/Toast'
import { GlobalContext } from '../context/GlobalContext'
import MatchModal from './MatchModal'
import WantMore from './WantMore'
import AnimatedOverlayLabel from './AnimatedOverlayLabel'
import { Heart } from './common/Svgs'

export default function EncounterCard({ receivers, setModalVisible }) {
    const [isMModalVisible, setMModalVisible] = useState(false)
    const [receiver, setReceiver] = useState(null)
    const [room, setRoom] = useState(null)
    const [onSwipedAll, setOnSwipedAll] = useState(false)
    const { profile: sender } = useContext(GlobalContext)
    const swiperRef = useRef(null)

    async function handleSwipedRight(cardIndex) {
        try {
            if (receivers[cardIndex].id) {
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
            console.log(error.response.data)
            showToast('error', 'Oops!', 'Nomalum xatolik.')
        }
    }

    async function handleSwipedLeft(cardIndex) {
        try {
            if (receivers[cardIndex].id) {
                await baseAxios.post(DISLIKES, { sender: sender.id, receiver: receivers[cardIndex].id })
            }
        } catch (error) {
            console.log(error.response.data)
            showToast('error', 'Oops!', 'Nomalum xatolik.')
        }
    }

    return (
        <View style={styles.container}>
            {!onSwipedAll && receivers.length > 0 ? (
                <Swiper
                    ref={swiperRef}
                    cards={receivers}
                    renderCard={(card) => <EncounterItem swiperRef={swiperRef} receiver={card} />}
                    onSwipedRight={handleSwipedRight}
                    onSwipedLeft={handleSwipedLeft}
                    cardIndex={0}
                    stackSize={3}
                    backgroundColor={COLOR.white}
                    marginTop={15}
                    onSwipedAll={() => setOnSwipedAll(true)}
                    cardVerticalMargin={0}
                    cardHorizontalMargin={8}
                    verticalSwipe={false}
                    overlayLabels={{
                        left: {
                            element: <AnimatedOverlayLabel
                                icon={<X height={42} width={42} color={COLOR.black} strokeWidth={3} />}
                                color={COLOR.white}
                                position="left" />,
                            style: { wrapper: { alignItems: 'flex-end', justifyContent: 'center', marginLeft: -50 } },
                        },
                        right: {
                            element: <AnimatedOverlayLabel
                                icon={<Heart height={42} width={42} color={COLOR.black} strokeWidth={3} />}
                                color={COLOR.white}
                                position="right" />,
                            style: { wrapper: { alignItems: 'flex-start', justifyContent: 'center', marginLeft: 50 } },
                        },
                    }}
                />
            ) : <WantMore setModalVisible={setModalVisible} />}

            <MatchModal
                isModalVisible={isMModalVisible}
                setModalVisible={setMModalVisible}
                receiver={receiver}
                sender={sender}
                room={room} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
