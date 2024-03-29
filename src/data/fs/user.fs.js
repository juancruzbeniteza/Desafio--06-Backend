import fs from "fs";
import crypto from "crypto";

class UserManager{
    static #user=[]

    constructor() {
      this.path = "./src/data/fs/files/user.json";
      this.conf = "utf-8";
      this.init();
    }

    init() {
      const exist = fs.existsSync(this.path);
      if (exist) {
        UserManager.#user = JSON.parse(
          fs.readFileSync(this.path, this.conf)
        );
      } else {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      }
    }

    create(data){
        try {
         
          UserManager.#user.push(data);
          fs.writeFileSync(
            this.path,
            JSON.stringify(UserManager.#user, null, 2)
          );
          return data
        } catch (error) {
          throw error;
        }
    }

    read(){
      try {
        if (UserManager.#user.length === 0) {
          throw new Error("No se encontraron usuarios!");
        } else {
          return UserManager.#user;
        }
      } catch (error) {
        return error.message;
      }
    }

    readOne(id){
      try {
        const user =UserManager.#user.find(
          (user) => user._id === id
        );
        if (!user) {
          throw new Error("No se encontro usuario!");
        } else {
          return user;
        }
      } catch (error) {
        throw error;
      }
    }

    destroy(id){
      try {
        const user = UserManager.#user.find(
          (product) => product._id === id
        );
        if (!user) {
          throw new Error("No se encontro usuario!");
        } else {
          const index = UserManager.#user.indexOf(user);
          UserManager.#user.splice(index, 1);
          fs.writeFileSync(
            this.path,
            JSON.stringify(UserManager.#user, null, 2)
          );
          return user
        }
      } catch (error) {
        throw error
      }
    }

    update(id,data){
      try {
       const one= this.readOne(id);
  
        if(!one){
          throw new Error("No se encontro usuario!")
        }else{
          one.name= data.name || one.name,
          one.photo= data.photo || one.photo,
          one.email= data.email || one.email,
  
          fs.writeFileSync(
            this.path,
            JSON.stringify(UserManager.#user, null, 2)
          );
  
          return one
        }
  
      } catch (error) {
        throw error
      }
    }

    readByEmail(email) {
      try {
        const user =UserManager.#user.find(
          (user) => user.email === email
        );
        if (!user) {
          throw new Error("No se encontro usuario!");
        } else {
          return user;
        }
      } catch (error) {
        throw error;
      }
    }
  
  }


const ManagerUser = new UserManager();
export default ManagerUser