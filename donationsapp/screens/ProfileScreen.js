import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import ProfileDonationList from './ProfileDonationList';

const ProfileScreen = () => {
  const { user, logout } = useContext(UserContext);
  const navigation = useNavigation();

  const onLogout = () => {
    logout();
    navigation.navigate('Login');
  }

  return (
    <View>
      {user ? (
        <>
          <View style={styles.userContainer}>
            <Text style={styles.username}>{user.username}</Text>
          </View>

          <ProfileDonationList />
          <Button title="Logout" onPress={onLogout} />
        </>
      ) : (
        <Text>Você não está logado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;
