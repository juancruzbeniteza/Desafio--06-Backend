import crypto from "crypto";

class UserManager {
  static #user = [];

  constructor() {}

  create(data) {
    try {
      const newUser = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };

      if (data.name && data.photo && data.email) {
        UserManager.#user.push(newUser);
        return newUser;
      } else {
        throw new Error("Los campos name, photo y email son necesarios");
      }
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (UserManager.#user.length === 0) {
        throw new Error("No se encontró ningún usuario");
      } else {
        return UserManager.#user;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#user.find((user) => user.id === id);

      if (user) {
        return user;
      } else {
        throw new Error("No se encontró el usuario");
      }
    } catch (error) {
      return error.message;
    }
  }

  update(id, data) {
    try {
      const one = this.readOne(id);

      if (!one) {
        throw new Error("No se encontró ningún usuario");
      } else {
        const index = UserManager.#user.indexOf(one);
        one.name = data.name || one.name;
        one.photo = data.photo || one.photo;
        one.email = data.email || one.email;

        UserManager.#user[index] = one;

        return "Usuario actualizado";
      }
    } catch (error) {
      return error.message;
    }
  }

  destroy(id) {
    try {
      const user = UserManager.#user.find((user) => user.id === id);

      if (!user) {
        throw new Error("No se encontró ningún usuario");
      } else {
        const index = UserManager.#user.indexOf(user);
        UserManager.#user.splice(index, 1);

        return "Usuario eliminado";
      }
    } catch (error) {
      return error.message;
    }
  }

  readOneByGitHubId(gitHubId) {
    try {
      const user = UserManager.#user.find((user) => user.gitHubId === gitHubId);

      if (user) {
        return user;
      } else {
        throw new Error("No se encontró el usuario");
      }
    } catch (error) {
      return error.message;
    }
  }
}

const Manager = new UserManager();
console.log(
  Manager.create({
    photo: "https://img.freepik.com/foto-gratis/joven-confiado_1098-20868.jpg",
    email: "jcba@example.com",
  })
);
Manager.create({
  name: "Tomas",
  photo: "https://img.freepik.com/foto-gratis/joven-confiado_1098-20868.jpg",
  email: "jcba@example.com",
});
console.log(Manager.read());

export { UserManager as Manager };
