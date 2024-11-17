import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DonationDAO from '../models/DonationDAO';
import { UserContext } from '../context/UserContext';

const AddDonationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const { user } = useContext(UserContext);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setDate(getCurrentDate());
  }, []);

  const handleAddDonation = () => {
    if (!title || !description || !user?.id) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const newDonation = {
      title,
      date,
      description,
      userId: user.id, 
    };

    DonationDAO.addDonation(newDonation)
      .then(() => {
        Alert.alert('Sucesso', 'Doação adicionada com sucesso!');
        clearForm();
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Erro ao adicionar doação', error);
        Alert.alert('Erro', 'Não foi possível adicionar a doação.');
      });
  };

  const clearForm = () => {
    setTitle('');
    setDate('');
    setDescription('');
  };

  const handleCancel = () => {
    clearForm();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título da Doação"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição da Doação"
        multiline
      />

      <Button title="Publicar Doação" onPress={handleAddDonation} />
      <Button title="Cancelar" onPress={handleCancel} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddDonationScreen;
