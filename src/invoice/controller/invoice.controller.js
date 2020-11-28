import axios from 'axios'
import Helper from '../../Helper'
class InvoiceController{

    insertInvoice = async (obj,method) => {
        try{
            let response = await axios.post(Helper.url + `invoice/${method}`,obj,Helper.config);
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
            let response = await axios.get(Helper.url + 'invoice/getInvoices');
            return response.data;
        }catch(error){
            return false;
        }
    }

    getInvoicesBody = async (headerid) => {
        try{
            let response = await axios.get(Helper.url + `invoice/getInvoicesBody/${headerid}`);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getInvoicesMaxID = async (method) => {
        try{
            let response = await axios.get(Helper.url + `invoice/${method}`);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getPurchasesToday = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getPurchasesToday`);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getSaleToday = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getSaleToday`);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getTotalPurchaseToday = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getTotalPurchaseToday`);
            return response.data;
        }catch(error){
            return false;
        }
    }

    getTotalSaleToday = async () => {
        try{
            let response = await axios.get(Helper.url + `invoice/getTotalSaleToday`);
            return response.data;
        }catch(error){
            return false;
        }
    }

}
export default new InvoiceController();