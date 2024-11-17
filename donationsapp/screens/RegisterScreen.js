import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import UserDAO from '../models/UserDAO';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    UserDAO.init()
  }, []);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const existingUser = await UserDAO.getUserByUsername(username);
      if (existingUser != null) {
        Alert.alert('Erro', 'Este nome de usuário já está em uso!');
        return;
      }

      const user = { username: username, password: password };

      await UserDAO.registerUser(user);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao registrar usuário', error);
      Alert.alert('Erro', 'Não foi possível registrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Digite seu nome de usuário"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <Button title="Cadastrar" onPress={handleRegister} />

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Já tem uma conta? Faça login
      </Text>
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
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  link: {
    color: 'blue',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default RegisterScreen;
