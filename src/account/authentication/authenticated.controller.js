import axios from 'axios'
class Authentication{

    constructor(){
        this.url = 'https://localhost:44355/api/authentication/'
    }

    async login(loginModel){
        try {
            let result = await axios.post(this.url + 'login',loginModel);
            if(result.status === 200){
                let user = result.data;
                sessionStorage.setItem("User",JSON.stringify(user));
                return true;
            }
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
                sessionStorage.setItem("User",JSON.stringify(user));
                return true;
            }
            return result.data;
        } catch (error) {
            return error;
        }
    }
    


}

export default new Authentication();