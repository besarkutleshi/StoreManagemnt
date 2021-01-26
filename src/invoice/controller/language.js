import $ from 'jquery'

class Language {

    constructor(){
        this.en = {
            todayInvoicesCount:'Today Invoices Count',
            todayInvoicesAmount:"Today Invoices Amount",
            allInvoicesCount:"All Invoices Count",
            allInvoicesAmount:"All Invoices Amount",
            columns:["Update", "Invoice Number", "Invoice Type", "Store", "Supplier", "Date", "Description", "Items", "Delete"]
        }
        this.sq = {
            todayInvoicesCount:'Numri i Faturave te Sotme',
            todayInvoicesAmount:"Shuma e Faturave te Sotme",
            allInvoicesCount:"Gjithsej Numri i Faturave",
            allInvoicesAmount:"Gjithsej Shuma e Faturave",
            columns:["Ndrysho", "Numri Fatures", "Lloji Fatures", "Depo", "Funitori", "Data", "Pershkrimi", "Artikujt", "Fshij"]
        }
    }

    translate = (lang) => {
        if (lang === '') {
            let loc = localStorage.getItem("lang");
            if (loc === 'sq') {
                this.translateAlbania();
            } else {
                this.translateEnglish();
            }
        }else{
            localStorage.setItem("lang", lang);
            if (lang === 'sq') {
                this.translateAlbania();
            } else {
                this.translateEnglish();
            }
        }
    }

    translateAlbania = () => {
        $('#todayInvoicesCount').text(this.sq.todayInvoicesCount);
        $('#todayInvoicesAmount').text(this.sq.todayInvoicesAmount);
        $('#allInvoicesCount').text(this.sq.allInvoicesCount);
        $('#allInvoicesAmount').text(this.sq.allInvoicesAmount);
    }

    translateEnglish = () => {
        $('#todayInvoicesCount').text(this.en.todayInvoicesCount);
        $('#todayInvoicesAmount').text(this.en.todayInvoicesAmount);
        $('#allInvoicesCount').text(this.en.allInvoicesCount);
        $('#allInvoicesAmount').text(this.en.allInvoicesAmount);
    }

}
export default new Language();