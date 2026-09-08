import bcrypt from 'bcrypt';
import db from '../models/index.js';
const { User } = db;

 export default class AuthenticationService {
   static async findUser(email) {
    return await User.findOne({ where: { email } });
  }
  
  static async verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password_hash);
  }

  static async authenticateUser(email, password) {
    const user = await this.findUser(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await this.verifyPassword(user, password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}