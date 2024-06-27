import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

const AnimatedView = Animated.createAnimatedComponent(View)

export default function AnimatedOverlayLabel({ icon, color, position }) {
    const [animation] = useState(new Animated.Value(position === 'left' ? -100 : 100))

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }, [animation])

    return (
        <AnimatedView
            style={[
                styles.container,
                {
                    backgroundColor: color,
                    transform: [{ translateX: animation }],
                },
            ]}>
            {icon}
        </AnimatedView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 280,
        padding: 18,
        borderRadius: 100,
        zIndex: 1,
    },
})
