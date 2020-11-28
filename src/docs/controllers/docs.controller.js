import axios from 'axios'
import Helper from '../../Helper'
class DocController{

    async getDocs(){
        try {
            let response = await axios.get(Helper.url + 'doc/getDocs');
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async insertDoc(obj){
        try {
            let response = await axios.post(Helper.url + 'doc/insertDoc',obj);
            if(response.status === 200){
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async deleteDoc(id){
        try {
            let response = await axios.delete(Helper.url + `doc/deleteDoc/${id}`);
            return Helper.response(response);
        } catch (error) {
            return false;
        }
    }

    async updateDoc(obj){
        try {
            let response = await axios.patch(Helper.url + 'doc/updateDoc',obj);
            if(response.status === 200){
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

}

export default new DocController();