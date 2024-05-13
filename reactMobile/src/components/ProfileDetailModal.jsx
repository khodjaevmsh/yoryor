import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import RNModal from 'react-native-modal'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'
import { AcademicCap, CaseRound, Dollar, Heart, Ruler, Stars, Weigher } from './common/Svgs'

export default function ProfileDetailModal({ isModalVisible, setModalVisible, profile, loading }) {
    const fields = [
        { icon: <Heart width={20} height={20} />, text: profile?.maritalStatus?.label },
        { icon: <AcademicCap width={20} height={20} />, text: profile?.educationLevel?.label },
        { icon: <CaseRound width={20} height={20} />, text: profile?.jobTitle },
    ]

    const additionalFields = [
        { icon: <Dollar width={20} height={20} />, text: profile?.incomeLevel?.label },
        { icon: <Ruler width={20} height={20} />, text: profile?.height },
        { icon: <Weigher width={20} height={20} />, text: profile?.weight },
        { icon: <Stars width={20} height={20} />, text: profile?.zodiac?.label },
    ]

    return (
        <RNModal
            onBackdropPress={() => setModalVisible(false)}
            isVisible={isModalVisible}
            style={styles.modal}
            backdropOpacity={0.6}>

            <View style={styles.childrenModal}>
                {!loading ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 45 }}
                        bounces={false}>
                        {/* <ProfileModalHeader profileImage={profileImage} profile={profile} /> */}
                        {/* <ProfileModalInfo profile={profile} fields={fields} additionalFields={additionalFields} /> */}
                    </ScrollView>
                ) : (
                    <View style={styles.loadingWrapper}>
                        <ActivityIndicator />
                    </View>
                )}
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    childrenModal: {
        flex: 0.90,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: COLOR.white,
    },
    loadingWrapper: {
        width: '100%',
        height: normalize(700),
        justifyContent: 'center',
    },
})
