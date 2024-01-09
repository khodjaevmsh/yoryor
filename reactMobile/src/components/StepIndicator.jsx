import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

export default function CustomStepIndicator({ totalSteps, currentStep }) {
    const getAnimation = (stepIndex) => {
        if (currentStep === stepIndex) {
            return 'pulse' // Animation for the current step
        } if (currentStep === stepIndex - 1) {
            return 'fadeInUp' // Animation for the next step
        }
        return null // No animation for other steps
    }

    return (
        <View style={styles.container}>
            {[...Array(totalSteps)].map((_, index) => (
                <Animatable.View
                    key={index}
                    animation={getAnimation(index)}
                    style={[
                        styles.step,
                        {
                            backgroundColor: index < currentStep ? '#4aae4f' : '#a4d4a5',
                            borderColor: index === currentStep ? '#ffffff' : '#4aae4f',
                        },
                    ]}
                >
                    {index === currentStep ? (
                        <Text style={styles.stepText}>{index + 1}</Text>
                    ) : null}
                </Animatable.View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    step: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepText: {
        color: '#ffffff',
    },
})
