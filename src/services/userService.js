import repository from "../repositories/users.rep.js";
import sendEmail from "../utils/sendMail.utils.js";
class UserService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    try {
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, sortAndPaginate }) => {
    try {
      const response = await this.repository.read({ filter, sortAndPaginate });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (id) => {
    try {
      const response = await this.repository.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  readByEmail = async (email) => {
    try {
      const response = await this.repository.readByEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const response = await this.repository.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const response = await this.repository.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (data, next) => {
    try {
      const { email, password, name } = data;

      // Check if the email already exists
      const existingUser = await this.repository.readByEmail(email);
      if (existingUser) {
        return next(new Error('Email already in use.'));
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user object
      const userData = {
        email,
        password: hashedPassword,
        name
      };

      // Save the user to the database
      const user = await this.repository.create(new UsersDto(userData));

      // Optionally, send a verification email
      // await sendEmail(data);

      return { message: 'User registered successfully', user };
    } catch (error) {
      return next(error);
    }
  };
}


const userService = new UserService();
export default userService;
