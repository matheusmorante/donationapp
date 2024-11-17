import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import DonationDAO from '../models/DonationDAO';
import { UserContext } from '../context/UserContext';

const ProfileDonationList = () => {
    const { user } = useContext(UserContext);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        setLoading(true);
        try {
            const donationsArray = await DonationDAO.getDonationsByUserId(user.id);
            setDonations(Array.isArray(donationsArray) ? donationsArray : []);
        } catch (error) {
            console.error('Erro ao buscar doações', error);
            Alert.alert('Erro', 'Não foi possível carregar as doações.');
            setDonations([]);
        } finally {
            setLoading(false);
        }
    };

    const renderDonationItem = ({ item }) => (
        <View style={styles.donationContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>Data: {item.date}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : donations.length > 0 ? (
                <FlatList
                    data={donations}
                    renderItem={renderDonationItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text style={styles.noDonationsText}>Nenhuma doação encontrada.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    donationContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#555',
    },
    noDonationsText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
});

export default ProfileDonationList;
