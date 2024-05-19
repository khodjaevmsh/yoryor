import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'

const { width } = Dimensions.get('window')

export default function AgeRange({ ageRange, setAgeRange }) {
    return (
        <View style={styles.rangeWrapper}>
            <MultiSlider
                values={[ageRange[0], ageRange[1]]}
                sliderLength={width - 75}
                onValuesChange={(values) => setAgeRange(values)}
                min={18}
                max={80}
                step={1}
                allowOverlap={false}
                snapped
                selectedStyle={styles.selectedTrack}
                unselectedStyle={styles.unselectedTrack}
                markerStyle={styles.marker} />
        </View>
    )
}

const styles = StyleSheet.create({
    rangeWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rangeText: {
        fontSize: fontSize.medium,
        fontWeight: '600',
    },
    selectedTrack: {
        backgroundColor: COLOR.black,
    },
    unselectedTrack: {
        backgroundColor: COLOR.lightGrey,
    },
    marker: {
        height: normalize(28),
        width: normalize(28),
        borderRadius: 55,
        borderWidth: 1.5,
        borderColor: COLOR.black,
        backgroundColor: COLOR.white,
    },
})
