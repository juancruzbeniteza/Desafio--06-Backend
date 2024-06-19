import User from "../data/mongo/models/users.models.js"; // Ensure the correct path to the User model

class UsersRep {
  constructor() {
    this.model = User; // Assign the Mongoose User model to this.model
  }

  // Create method
  create = async (data) => await this.model.create(data);

  // Other methods...
  read = async ({ filter, options }) => await this.model.find(filter, null, options).exec();
  readOne = async (id) => await this.model.findById(id).exec();
  update = async (id, data) => await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  destroy = async (id) => await this.model.findByIdAndDelete(id).exec();
  readByEmail = async (email) => await this.model.findOne({ email }).exec();
  findById = async (id) => await this.model.findById(id).exec(); // Ensure findById method is implemented
}

const repository = new UsersRep();
export default repository;
