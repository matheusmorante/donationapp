import * as SQLite from 'expo-sqlite';

const DonationDAO = {
  init: async () => {
    const db = await SQLite.openDatabaseAsync('donations4.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        user_id INTEGER NOT NULL,
        date TEXT,
        title TEXT,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
  },

  addDonation: async (donation) => {
    const db = await SQLite.openDatabaseAsync('donations4.db');
    await db.runAsync(
      'INSERT INTO donations (date, user_id,  title, description) VALUES (?, ?, ?, ?)',
      donation.date, donation.userId, donation.title, donation.description
    )
  },

  getAllDonations: async () => {
    try {
      const db = await SQLite.openDatabaseAsync('donations4.db');
      const result = await db.getAllAsync(
        'SELECT * FROM donations'
      );

      return result;
    } catch (error) {
      console.error('Erro ao buscar doações do usuário:', error);
      return null;
    }
  },
  
  getDonationsByUserId: async (userId) => {
    try {
      const db = await SQLite.openDatabaseAsync('donations4.db');
      const result = await db.getAllAsync(
        'SELECT * FROM donations WHERE user_id = ?', userId
      );

      return result
    } catch (error) {
      console.error('Erro ao buscar doações do usuário:', error);
      return null;
    }
  }
}

export default DonationDAO;