import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

const AnimatedView = Animated.createAnimatedComponent(View)

function AnimatedOverlayLabel({ icon, color, position }) {
    const [animation] = useState(new Animated.Value(position === 'left' ? -100 : 100))

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 100,
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
        padding: 15,
        borderRadius: 55,
        zIndex: 1,
    },
})

export default AnimatedOverlayLabel
