import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});
//aqui após instalar o axios devemos fazer na pasta SRC uma pasta lib
// nesta pasta vamos exportar a const api, importar, e ai sim passar a baseURL
// com apenas o localhost
