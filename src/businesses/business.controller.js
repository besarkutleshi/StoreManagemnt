import axios from 'axios'

class BusinessController{

    constructor(){
        sessionStorage.setItem("User",JSON.stringify({Token:''}));
        this.config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("User")).Token}`
            }
        }
        this.url = 'https://localhost:5001/api/business/'
    }

    async selfRegister(business){
        try {
            let response = await axios.post(this.url + 'registerBusiness',business);
            if(response.status === 200){
                return true;
            }
            return response.data;
        } catch (error) {
            return error;
        }
    }


}

export default new BusinessController();