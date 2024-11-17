import * as SQLite from 'expo-sqlite';
import CryptoJS from 'crypto-js';

const UserDAO = {
  init: async () => {
    try {
      const db = await SQLite.openDatabaseAsync('users2.db');
      if (!db) {
        console.error('Falha ao abrir o banco de dados');
        return;
      }

      console.log('Banco de dados aberto com sucesso');
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          username TEXT,
          password TEXT
        );
      `);
      console.log('Tabela criada ou verificada com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar o banco de dados:', error);
    }
  },

  registerUser: async (user) => {
    try {
      const hashedPassword = CryptoJS.SHA256(user.password).toString();
      const db = await SQLite.openDatabaseAsync('users2.db');
      await db.runAsync(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        user.username, hashedPassword
      )
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return null;
    }
  },

  getUserByUserId: async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('users2.db');
      const result = await db.getFirstAsync(
        'SELECT * FROM users WHERE id = ?',
        id
      );

      if (result) {
        return result;
      } else {
        console.log('Usuário não encontrado');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  },

  getUserByUsername: async (username) => {
    try {
      const db = await SQLite.openDatabaseAsync('users2.db');
      const result = await db.getFirstAsync(
        'SELECT * FROM users WHERE username = ?',
        username
      );

      if (result) {
        return result;
      } else {
        console.log('Usuário não encontrado');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  },

  verifyPassword: (inputPassword, storedHashedPassword) => {
    const hashedInputPassword = CryptoJS.SHA256(inputPassword).toString();
    return hashedInputPassword === storedHashedPassword;
  }
}
export default UserDAO;