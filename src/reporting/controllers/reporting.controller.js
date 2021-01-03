import axios from 'axios'
import Helper from '../../Helper';

class ReportingController {
    getProfits = async (method) => {
        try{
            let response = await axios.get(Helper.url + `Reporting/${method}`,Helper.config);
            return response.data;
        }catch(error){
            Helper.manageErrorResponse(error);
            return null;
        }
    }
}

export default new ReportingController();