import axios from "axios";

export default axios.create({
    baseURL: "https://bankcrudapi.up.railway.app"
    // baseURL: "htpp://localhost:8080"
});

