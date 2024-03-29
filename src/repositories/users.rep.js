import dao from "../data/factory.js"
import UsersDto from "../dto/user.dto.js";

const {users}=dao

class UsersRep {
    constructor() {
        this.model = users
    }
    
    create = async (data) => {await this.model.create(new UsersDto(data))};
      read = async ({ filter, options }) =>
        await this.model.read({ filter, options });
      readOne = async (id) => await this.model.readOne(id);
      update = async (id, data) => await this.model.update(id, data);
      destroy = async (id) => await this.model.destroy(id);
      readByEmail=async (email)=>{ await this.model.readByEmail(email)}
    }
    
    const repository = new UsersRep();
    export default repository;