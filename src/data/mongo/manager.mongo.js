import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async paginate({ filter, opts }) {
    try {
      const all = await this.model.paginate(filter, opts);
      return all;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, sortAndPaginate }) {
    try {
      const all = await this.model.paginate(filter, sortAndPaginate);
      if (all.totalPages === 0) {
        const error = new Error("There aren't elements");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      console.error('Error reading users:', error);
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      if (!one) {
        const error = new Error("There isn't elements");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      console.error('Error reading user by ID:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      if (!one) {
        const error = new Error("There isn't elements");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      if (!one) {
        const error = new Error("There isn't elements");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async readByEmail({ email }) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      console.error('Error reading user by email:', error);
      throw error;
    }
  }

  async readById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      console.error('Error reading user by ID:', error);
      throw error;
    }
  }

  async report(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { uid: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "pid",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"] },
          },
        },
        { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
        { $group: { _id: "$uid", total: { $sum: "$subTotal" } } },
        { $project: { _id: 0, uid: "$_id", total: "$total", date: new Date() } },
      ]);

      return report;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }
}

export default MongoManager;
