import axios from 'axios'
import ErrorAlert from '../ErrorAlert.js';
import Helper from '../Helper.js'
class Collaboration{
    

    async insertCollaboration(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/insertCollaboration',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    //mundohu me kriju ni metod per me dergu requesta ni metod te perbashkt qe e kryn punen me ni rresht veq return qajo metod me parametra

    async deleteCollaboration(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/deleteCollaboration/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async updateCollaboration(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/updateCollaboration',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getCollaborations(){
        try {
            let response = await axios.get(Helper.url + 'collaboration/getCollaborations',Helper.config);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getCollaboration(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/getCollaboration/${id}`,Helper.config);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async insertEmployee(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/insertEmployee',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async deleteEmployee(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/deleteEmployee/${id}`);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async updateEmployee(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/updateEmployee',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getEmployees(){
        try {
            let response = await axios.get(Helper.url + 'collaboration/getEmployees',Helper.config);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getEmployeeById(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/getEmployee/${id}`);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }
    
    async getEmployeeByName(name){
        try {
            let response = await axios.get(Helper.url + `collaboration/getEmployee/${name}`);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async insertEP(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/insertEP',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async deleteEmployee(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/deleteEP/${id}`);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async updateEmployee(obj){
        try {
            let response = await axios.post(Helper.url + 'collaboration/updateEP',obj,Helper.config);
            return Helper.response(response);
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getEPs(){
        try {
            let response = await axios.get(Helper.url + 'collaboration/getEP',Helper.config);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

    async getEP(id){
        try {
            let response = await axios.get(Helper.url + `collaboration/getEP/${id}`);
            return response.data;
        } catch (error) {
            ErrorAlert(error.message);
            return false;
        }
    }

}
export default new Collaboration();