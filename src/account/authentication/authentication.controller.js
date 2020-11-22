import axios from 'axios'
import Helper from '../../Helper.js'
class Authentication{


    async login(loginModel){
        try {
            let result = await axios.post(Helper.url + 'authentication/login',loginModel);
            if(result.status === 200){
                let user = result.data;
                sessionStorage.setItem("User",JSON.stringify(user));
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async selfRegister(registerModel){
        try {
            let result = await axios.post(Helper.url + 'authentication/register',registerModel);
            if(result.status === 200){
                let user = result.data;
                sessionStorage.clear();
                sessionStorage.setItem("User",JSON.stringify(user));
                return true;
            }
            return result.data;
        } catch (error) {
            return error;
        }
    }

    async registerUser(registerUser){
        try {
            let result = await axios.post(Helper.url + 'authentication/registerUser',registerUser,Helper.config);
            if(result.status === 200){
                return true;
            }
            return result.data;
        } catch (error) {
            return error;
        }
    }

    async logOut(){
        sessionStorage.clear();
        window.location = 'login';
    }

    getUsers = async () => {
        try {
            let response = await axios.get(Helper.url + 'authentication/getUsers',Helper.config);
            return response.data;
        } catch (error) {
            return false;
        }
    }
}

export default new Authentication();