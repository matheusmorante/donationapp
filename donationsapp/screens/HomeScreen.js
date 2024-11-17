import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DonationList from './DonationList';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from './ProfileScreen';

const HomeScreen = () => {
    const [activeTab, setActiveTab] = useState('Donations');
    const navigation = useNavigation();   
    const renderContent = () => {
        if (activeTab === 'Donations') {
            return <DonationList navigation={navigation}/>;
        } else {
            return (
                <ProfileScreen />
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Donations' && styles.activeTab]}
                    onPress={() => setActiveTab('Donations')}
                >
                    <Text style={styles.tabText}>Doações</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Profile' && styles.activeTab]}
                    onPress={() => setActiveTab('Profile')}
                >
                    <Text style={styles.tabText}>Perfil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {renderContent()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 16,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    tabText: {
        fontSize: 16,
        color: 'gray',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: 'blue',
    },
    content: {
        flex: 1,
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
