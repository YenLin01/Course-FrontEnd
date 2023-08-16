import axios from "axios";
const API_URL = "https://courseweb-backend.onrender.com/api/user";
// const API_URL = "http://localhost:8080/api/user";

class AuthService {
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      password,
      email,
      role,
    });
  }

  login(email, password) {
    return axios.post(API_URL + "/login", { password, email });
  }

  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
