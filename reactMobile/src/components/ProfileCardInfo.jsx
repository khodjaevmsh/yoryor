import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import normalize from 'react-native-normalize'
import SingleTag from './SingleTag'
import { Goal } from './common/Svgs'
import RoundedTagWithIcon from './RoundedTagWithIcon'
import { COLOR } from '../utils/colors'

export default function ProfileCardInfo({ profile, fields, additionalFields }) {
    return (
        <View>
            {profile.bio ? (
                <View style={styles.informationWrapper}>
                    <Text style={[styles.informationTitle]}>O'zi haqida</Text>
                    <View style={[styles.tagsWrapper]}>
                        {/* eslint-disable-next-line max-len */}
                        <Text style={[styles.informationSubTitle, { fontSize: normalize(19), lineHeight: 26, marginBottom: 6 }]}>
                            {profile?.bio}
                        </Text>
                    </View>
                </View>
            ) : null}

            <View style={styles.informationWrapper}>
                <Text style={[styles.informationTitle]}>{profile?.name} maqsadi</Text>
                <View style={styles.tagsWrapper}>
                    <SingleTag icon={<Goal width={22} height={22} />} text={profile?.goal?.label} />
                </View>
            </View>

            <View style={styles.informationWrapper}>
                {fields.some((field) => field.text !== null) && (
                    <Text style={styles.informationTitle}>Ma'lumotlar</Text>
                )}
                <View style={styles.tagsWrapper}>
                    {fields.map((field, index) => (
                        field.text && <RoundedTagWithIcon key={index} icon={field.icon} text={field.text} />
                    ))}
                </View>
            </View>

            <View style={styles.informationWrapper}>
                {additionalFields.some((field) => field.text !== null) && (
                    <Text style={styles.informationTitle}>Qo'shimcha ma'lumotlar</Text>
                )}
                <View style={styles.tagsWrapper}>
                    {additionalFields.map((field, index) => (
                        field.text && (
                            <RoundedTagWithIcon key={index} icon={field.icon} text={field.text} />
                        )
                    ))}
                </View>
            </View>

            {profile?.educationSchool ? (
                <View style={[styles.informationWrapper]}>
                    <Text style={styles.informationTitle}>O'qish joyi</Text>
                    <Text style={styles.informationSubTitle}>{profile?.educationSchool}</Text>
                </View>
            ) : null}

            {profile?.jobCompany ? (
                <View style={styles.informationWrapper}>
                    <Text style={styles.informationTitle}>Ish joyi</Text>
                    <Text style={styles.informationSubTitle}>{profile?.jobCompany}</Text>
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    informationWrapper: {
        flex: 1,
        marginTop: 28,
    },
    informationTitle: {
        fontSize: normalize(16),
        marginBottom: 10,
        color: COLOR.grey,
        fontWeight: '500',
    },
    informationSubTitle: {
        fontSize: normalize(22),
        fontWeight: '600',
        color: COLOR.black,
    },
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})
