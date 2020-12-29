import axios from 'axios'
import Helper from '../../Helper'
class InvoiceController{

    insertInvoice = async (obj,method) => {
        try{
            let response = await axios.post(Helper.url + `invoice/${method}`,obj,Helper.config);
            console.log(response);
            return Helper.response(response);
        }catch(error){
            return false;
        }
    }

    deleteInvoice = async (id,method) => {
        try{
            let response = await axios.delete(Helper.url + `invoice/${method}/${id}`,Helper.config);
            return Helper.response(response);
        }catch(error){
            return false;
        }
    }

    updateInvoice = async (obj,method) => {
        try{
            let response = await axios.patch(Helper.url + `invoice/${method}`,obj,Helper.config);
            return Helper.response(response);
        }catch(error){
            return false;
        }
    }

    getInvoices = async () => {
        try{
            let response = await axios.get(Helper.url + 'invoice/getInvoices',Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getInvoicesBody = async (headerid) => {
        try{
            let response = await axios.get(Helper.url + `invoice/getInvoicesBody/${headerid}`,Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getInvoicesMaxID = async (method) => {
        try{
            let response = await axios.get(Helper.url + `invoice/${method}`,Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getPurchasesToday = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getPurchasesToday`,Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getSaleToday = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getSaleToday`,Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getTotalPurchaseToday = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getTotalPurchaseToday`,Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getTotalSaleToday = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getTotalSaleToday`,Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getTotalPurchaseAll = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getTotalPurchaseAll`,Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getTotalSaleAll = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getTotalSaleAll`,Helper.config);
            return response.data;
        }catch(error){
            return false;
        }
    }

}
export default new InvoiceController();