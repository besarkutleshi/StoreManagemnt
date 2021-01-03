import axios from 'axios'
import Helper from '../../../Helper'
class AuthorizeController{
    

    async getRoles(){
        try {
            let result = await axios.get(Helper.url + 'authorize/getRoles',Helper.config);
            return result.data;
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async getRoleById(id){
        try {
            let response = await axios.get(Helper.url + `authorize/getRole${id}`,Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async insertRole(obj){
        try {
            let response = await axios.post(Helper.url + 'authorize/insertRole',obj,Helper.config);
            Helper.response(response);
            return false;
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async updateRole(obj){
        try {
            let response = await axios.post(Helper.url + 'authorize/updateRole',obj,Helper.config);
            Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async deleteRole(id){
        try {
            let response = await axios.get(Helper.url + `authorize/deleteRole/${id}`,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async getUserRoles(userid){
        try {
            let response = await axios.get(Helper.url + `authorize/getUserRoles/${userid}`,Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async insertUserRole(userRoles){
        try {
            let response = await axios.post(Helper.url + 'authorize/insertUserRole',userRoles,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async getUserInRole(roleid){
        try {
            let response = await axios.get(Helper.url + `authorize/getUsersInRole/${roleid}`,Helper.config);
            return response.data;
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

    async insertUsersInRole(userRoles){
        try {
            let response = await axios.post(Helper.url + 'authorize/insertUsersInRole',userRoles,Helper.config);
            return Helper.response(response);
        } catch (error) {
            Helper.manageErrorResponse(error);
            return false;
        }
    }

}

export default new AuthorizeController();   