import axios from 'axios'
import Helper from '../Helper.js'
class Collaboration{
    

    async insertCollaboration(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/insertCollaboration',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async deleteCollaboration(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/deleteCollaboration/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async updateCollaboration(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/updateCollaboration',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async getCollaborations(){
        try {
            let response = await axios.get(Helper.url + 'collaboration/getCollaborations',Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async getCollaboration(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/getCollaboration/${id}`,Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async insertEmployee(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/insertEmployee',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async deleteEmployee(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/deleteEmployee/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async updateEmployee(obj){
        try {
            let response = await axios.patch(Helper.url + 'collaboration/updateEmployee',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async getEmployees(){
        try {
            let response = await axios.get(Helper.url + 'collaboration/getEmployees',Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async getEmployeeById(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/getEmployee/${id}`,Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }
    
    async getEmployeeByName(name){
        try {
            let response = await axios.get(Helper.url + `collaboration/getEmployee/${name}`,Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async insertEP(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/insertEP',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async deleteEp(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/deleteEP/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async updateEP(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/updateEP',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async getEPs(){
        try {
            let response = await axios.get(Helper.url + 'collaboration/getEP',Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async getEP(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/getEP/${id}`,Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async insertPos(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/insertPOS',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async deletePos(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/deletePOS/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async updatePos(obj){
        try {
            let response = await axios.patch(Helper.url + 'collaboration/updatePOS',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

    async getPoss(){
        try {
            let response = await axios.get(Helper.url + 'collaboration/getAllPos',Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error)
            return false;
        }
    }

}
export default new Collaboration();