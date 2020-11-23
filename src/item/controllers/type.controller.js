import axios from 'axios'
import Helper from '../../Helper';
class TypeController{

    async getTypes(){
        try {
            let response = await axios.get(Helper.url + 'itme/getTypes',Helper.config);
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async insertType(){
        try {
            let response = await axios.post(Helper.url + 'item/insertType',Helper.config);
            return Helper.response(response);
        } catch (error) {
            return false;
        }
    }

    async deleteType(id){
        try {
            let response = await axios.delete(Helper.url + `item/deleteType/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            return false;
        }
    }

    async updateType(obj){
        try {
            let response = await axios.patch(Helper.url + 'item/updateType',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            return false;
        }
    }

}
export default new TypeController();