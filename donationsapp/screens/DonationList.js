import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import DonationDAO from '../models/DonationDAO';
import UserDAO from '../models/UserDAO';
import { useFocusEffect } from '@react-navigation/native';

const DonationsList = ({ navigation }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    DonationDAO.init()
      .then(() => fetchDonations())
      .catch((error) => {
        console.error('Erro ao inicializar o banco de dados', error);
        Alert.alert('Erro', 'Falha ao inicializar o banco de dados.');
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchDonations();
    }, [])
  );

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const donationsArray = await DonationDAO.getAllDonations();
      const donationsWithUsernames = await Promise.all(
        donationsArray.map(async (donation) => {
          const user = await UserDAO.getUserByUserId(donation.user_id);
          return { ...donation, username: user.username };
        })
      );
      setDonations(donationsWithUsernames);
    } catch (error) {
      console.error('Erro ao buscar doações', error);
      Alert.alert('Erro', 'Não foi possível carregar as doações.');
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDonations();
    } finally {
      setRefreshing(false);
    }
  };

  const renderDonation = ({ item }) => (
    <View style={styles.donationContainer}>
      <Text>Publicado por: {item.username}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

return (
  <View style={{ flex: 1, padding: 16 }}>
    <Button
      title="Adicionar Doação"
      onPress={() => navigation.navigate('Publicar Doação')}
    />

    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : donations.length > 0 ? (
      <FlatList
        data={donations}
        renderItem={renderDonation}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
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

export default DonationsList;
