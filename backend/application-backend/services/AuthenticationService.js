import bcrypt from 'bcrypt';
import db from '../models/index.js';
import AuthenticationError from '../errors/Authenticationerror.js';
import { StatusCodes } from 'http-status-codes';
const { User } = db;

 export default class AuthenticationService {
   static async findUser(email) {
    return await User.findOne({ where: { email } });
  }
  
  static async verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password_hash);
  }
  static async createUser({ email, password, roleId }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({
        email,
        password_hash: hashedPassword,
        role_id: roleId
    });
}
  static async authenticateUser(email, password) {
    const user = await this.findUser(email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }
    const isMatch = await this.verifyPassword(user, password);
    if (!isMatch) {
      throw new AuthenticationError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }
    return user;
  }
}