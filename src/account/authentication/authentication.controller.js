import axios from 'axios'
import Helper from '../../Helper.js'
import $ from 'jquery'
class Authentication{


    async login(loginModel){
        try {
            let result = await axios.post(Helper.url + 'Authentication/login',loginModel);
            if(result.status === 200){
                let user = result.data;
                sessionStorage.clear();
                sessionStorage.setItem("User",JSON.stringify(user));
                $('#login').hide();
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
            Helper.manageErrorResponse(error);
            return error;
        }
    }

    logOut(){
        sessionStorage.clear();
        window.location = 'login';
    }

    getUsers = async () => {
        try {
            let response = await axios.get(Helper.url + 'authentication/getUsers',Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    updateUser = async (obj) => {
        try {
            console.log(obj);
            let response = await axios.post(Helper.url + 'authentication/updateUser',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    deleteUser = async (id) => {
        try {
            let response = await axios.delete(Helper.url + `authentication/deleteUser/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }
}

export default new Authentication();