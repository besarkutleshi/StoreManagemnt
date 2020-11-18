import axios from 'axios'
class Authentication{

    constructor(){
        sessionStorage.setItem("User",JSON.stringify({Token:''}));
        this.config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("User")).Token}`
            }
        }
        this.url = 'https://localhost:5001/api/authentication/'
    }

    async login(loginModel){
        try {
            let result = await axios.post(this.url + 'login',loginModel);
            if(result.status === 200){
                let user = result.data;
                sessionStorage.clear();
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
            let result = await axios.post(this.url + 'register',registerModel);
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
            let result = await axios.post(this.url + 'registerUser',registerUser,this.config);
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
}

export default new Authentication();