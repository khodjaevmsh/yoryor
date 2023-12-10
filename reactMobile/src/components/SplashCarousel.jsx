import React, { useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'
import girls from '../assets/images/girls.webp'

const data = [
    {
        id: 1,
        title: 'Algorithm',
        subTitle: 'Users going through a vetting process to ensure you never match with bots.',
        image: girls,
    },
    {
        id: 2,
        title: 'Match',
        subTitle: 'We match you with people that have a large array of similar interests.',
        image: girls,
    },
    {
        id: 3,
        title: 'Premium',
        subTitle: 'Sign up today and enjoy the first month of premium benefits on us.',
        image: girls,
    },
]

const SLIDER_WIDTH = Dimensions.get('screen').width
const SLIDER_ITEM_WIDTH = Dimensions.get('screen').width * 0.65

export default function SplashCarousel() {
    const [activeIndex, setActiveIndex] = useState(0)
    const renderItem = ({ item }) => (
        <View style={styles.slide} key={item.id}>
            <Image style={styles.image} source={item.image} />
        </View>
    )

    return (
        <>
            <View style={{ flex: 2, alignItems: 'center' }}>
                <Carousel
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={SLIDER_ITEM_WIDTH}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    inactiveSlideOpacity={0.8}
                />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 25 }}>
                <View>
                    <Text style={styles.title}>{data[activeIndex].title}</Text>
                    <Text style={styles.subTitle}>{data[activeIndex].subTitle}</Text>
                </View>

                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={activeIndex}
                    dotStyle={{
                        width: normalize(10),
                        height: normalize(10),
                        borderRadius: 5,
                        backgroundColor: COLOR.primary,
                    }}
                    inactiveDotStyle={{ backgroundColor: COLOR.grey }}
                    containerStyle={{ marginTop: -5 }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    image: {
        width: '100%',
        height: normalize(360),
        borderRadius: 12,
    },
    title: {
        fontSize: normalize(28),
        fontWeight: '500',
        color: COLOR.primary,
        textAlign: 'center',
        marginVertical: 20,
    },
    subTitle: {
        textAlign: 'center',
    },
})
