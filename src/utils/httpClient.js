import axios from "axios";

export default axios.create({
    baseURL: "https://std-crud-bankaccount-app.herokuapp.com"
    // baseURL: "htpp://localhost:8080"
});

