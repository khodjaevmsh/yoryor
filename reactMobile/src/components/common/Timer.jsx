import React from 'react'
import { Animated } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/colors'

export default function Timer({ setShowTimer = () => {}, duration = 60 }) {
    return (
        <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors={[COLOR.primary]}
            trailColor={COLOR.lightGrey}
            isLinearGradient
            gradientUniqueKey={COLOR.grey}
            trailStrokeWidth={2}
            size={38}
            strokeWidth={4}
            onComplete={() => setShowTimer(false)}
            rotation="counterclockwise">
            {({ remainingTime, animatedColor }) => (
                <Animated.Text style={{ fontSize: normalize(14), fontWeight: '500', color: animatedColor }}>
                    {remainingTime}
                </Animated.Text>
            )}
        </CountdownCircleTimer>
    )
}
