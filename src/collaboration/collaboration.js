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

    async insertEmployee(obj){
        try {
            let response = await axios.post(Helper.url + 'insertEmployee',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async deleteEmployee(id){
        try {
            let response = await axios.get(Helper.url + `deleteEmployee/${id}`);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async updateEmployee(obj){
        try {
            let response = await axios.post(Helper.url + 'updateEmployee',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getEmployees(){
        try {
            let response = await axios.get(Helper.url + 'getEmployees',Helper.config);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getEmployeeById(id){
        try {
            let response = await axios.get(Helper.url + `getEmployee/${id}`);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }
    
    async getEmployeeByName(name){
        try {
            let response = await axios.get(Helper.url + `getEmployee/${name}`);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }
}
export default new Collaboration();