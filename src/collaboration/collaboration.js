import axios from 'axios'
import ErrorAlert from '../ErrorAlert.js';
import Helper from '../Helper.js'
class Collaboration{
    

    async insertCollaboration(obj){
        try {
            let response = await axios.post(Helper.url + 'insertCollaboration',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async deleteCollaboration(id){
        try {
            let response = await axios.get(Helper.url + `deleteCollaboration/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async updateCollaboration(obj){
        try {
            let response = await axios.post(Helper.url + 'updateCollaboration',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getCollaborations(){
        try {
            let response = await axios.get(Helper.url + 'getCollaborations',Helper.config);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getCollaboration(id){
        try {
            let response = await axios.get(Helper.url + `getCollaboration/${id}`,Helper.config);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }
}
export default new Collaboration();