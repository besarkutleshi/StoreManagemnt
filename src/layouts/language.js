import $ from 'jquery'

class Language {

    constructor(){
        this.en = {
            welcome:"Welcome",
            saleNav:"Sale",
            sale:"Sale",
            saleList:"Sale's List",
            purchaseNav:"Purchases's",
            reportsNav:"Reports's",
            enteriesReport:"Enteries Report",
            exitsReport:"Exits Report",
            itemNav:"Item",
            item:"Item's",
            category:"Categorie's",
            type:"Type's",
            unit:"Unit's",
            employee:"Employee's",
            collaboration:"Collaboration's",
            storeHouses:"Store House's",
            empSH:"Employee's & Store House's",
            role:"Role's",
            user:"User's",
            profile:"Profili",
            logout:"Shkyqu"
        }
        this.sq = {
            mirseerdhe:"Mirseerdhe",
            saleNav:"Shitje",
            sale:"Shitje",
            saleList:"Lista e Shitjeve",
            purchaseNav:"Blerjet",
            reportsNav:"Raportet",
            enteriesReport:"Raporti i Hyrjeve",
            exitsReport:"Raporti i Daljeve",
            itemNav:"Produktet",
            item:"Artikujt",
            category:"Kategorit",
            type:"Llojet",
            unit:"Njesit",
            employee:"Punetoret",
            collaboration:"Bashkpunetoret",
            storeHouses:"Depot",
            empSH:"Punetoret & Depot",
            role:"Rolet",
            user:"Perdoruesit",
            profile:"Profili",
            logout:"Shkyqu"
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
        $('#welcome').text(this.sq.mirseerdhe);
        $('#saleNav').text(this.sq.saleNav);
        $('#sale').text(this.sq.sale);
        $('#saleList').text(this.sq.saleList);
        $('#purchases').text(this.sq.purchaseNav);
        $('#reports').text(this.sq.reportsNav);
        $('#enteriesReport').text(this.sq.enteriesReport);
        $('#exitsReport').text(this.sq.exitsReport);
        $('#itemNav').text(this.sq.itemNav);
        $('#itemLink').text(this.sq.item);
        $('#categories').text(this.sq.category);
        $('#types').text(this.sq.type);
        $('#unit').text(this.sq.unit);
        $('#employeeLink').text(this.sq.employee);
        $('#collaboration').text(this.sq.collaboration);
        $('#storehouse').text(this.sq.storeHouses);
        $('#empSH').text(this.sq.empSH);
        $('#roleList').text(this.sq.role);
        $('#userList').text(this.sq.user);
        $('#profile').text(this.sq.profile);
        $('#logoutbro').text(this.sq.logout);
    }

    translateEnglish = () => {
        $('#welcome').text(this.en.welcome);
        $('#saleNav').text(this.en.saleNav);
        $('#sale').text(this.en.sale);
        $('#saleList').text(this.en.saleList);
        $('#purchases').text(this.en.purchaseNav);
        $('#reports').text(this.en.reportsNav);
        $('#enteriesReport').text(this.en.enteriesReport);
        $('#exitsReport').text(this.en.exitsReport);
        $('#itemNav').text(this.en.itemNav);
        $('#itemLink').text(this.en.item);
        $('#categories').text(this.en.category);
        $('#types').text(this.en.type);
        $('#unit').text(this.en.unit);
        $('#employeeLink').text(this.en.employee);
        $('#collaboration').text(this.en.collaboration);
        $('#storehouse').text(this.en.storeHouses);
        $('#empSH').text(this.en.empSH);
        $('#roleList').text(this.en.role);
        $('#userList').text(this.en.user);
        $('#profile').text(this.en.profile);
        $('#logoutbro').text(this.en.logout);
    }

}

export default new Language();