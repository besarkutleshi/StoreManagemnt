import axios from 'axios'
import Helper from '../../Helper';
class UnitController{

    async getUnits(){
        try {
            let response = await axios.get(Helper.url + 'itme/getUnits',Helper.config);
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async insertUnit(obj){
        try {
            let response = await axios.post(Helper.url + 'item/insertUnit',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            return false;
        }
    }

    async deleteUnit(id){
        try {
            let response = await axios.delete(Helper.url + `item/deleteUnit/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            return false;
        }
    }

    async updateUnit(obj){
        try {
            let response = await axios.patch(Helper.url + 'item/updateUnit',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            return false;
        }
    }

}
export default new UnitController();