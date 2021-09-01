import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://fir-demo-project.firebaseio.com/'
    baseURL: 'https://burger-builder-15-default-rtdb.firebaseio.com/'
});

export default instance;