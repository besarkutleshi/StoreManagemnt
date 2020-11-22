import axios from 'axios'
import Helper from '../Helper'
class BusinessController{


    async selfRegister(business){
        try {
            let response = await axios.post(Helper.url + 'business/registerBusiness',business);
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