import axios from 'axios'
import helper from '../../Helper.js'

class ItemController {

    async getAll(method){
        try {
            let response = await axios.get(helper.url + `item/${method}`,helper.config);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async insert(method,obj){
        try {
            let response = await axios.post(helper.url + `item/${method}`,obj,helper.config);
            return helper.response(response);
        } catch (error) {
            return false;
        }
    }

    async delete(method,id){
        try {
            let response = await axios.delete(helper.url + `item/${method}/${id}`,helper.config);
            return helper.response(response);
        } catch (error) {
            return false;
        }
    }

    async update(method,obj){
        try {
            let response = await axios.patch(helper.url + `item/${method}`,obj,helper.config);
            return helper.response(response);
        } catch (error) {
            return false;
        }
    }

}

export default new ItemController();