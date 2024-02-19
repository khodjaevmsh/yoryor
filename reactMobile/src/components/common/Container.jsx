import React from 'react'
import { View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    RefreshControl } from 'react-native'

export default function Container({ children, scrollable, containerStyle, refreshControl, refreshing, setRefreshing }) {
    // Use ScrollView if scrollable prop is true, otherwise use a simple View
    const Component = scrollable ? ScrollView : View

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Component
                style={!scrollable ? [styles.container, containerStyle] : null}
                contentContainerStyle={scrollable ? [styles.scrollContainer, containerStyle] : null}
                showsVerticalScrollIndicator={scrollable ? false : null}
                refreshControl={scrollable && refreshControl ? (
                    <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
                ) : null}>
                {children}
            </Component>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 14,
        marginBottom: Platform.OS === 'ios' ? 32 : 24,
        marginHorizontal: 22,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 14,
        paddingBottom: Platform.OS === 'ios' ? 32 : 24,
        paddingHorizontal: 22,
    },
})
