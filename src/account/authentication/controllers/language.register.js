import $ from 'jquery'

class LanguageRegister {
    constructor(){
        this.en = {
            title:"Sign Up",
            emailAddress:"Email Address",
            password:"Password",
            confirmPassword:"Confirm Password",
            businessCode:"Bussines Code",
            btnRegister :"Register"
        }
        this.sq = {
            titulli:"Regjistrohu",
            perdoruesi:"Perdoruesi",
            fjalkalimi:"Fjalkalimi",
            fjalkalimiKonfirmuar:"Konfirmo Fjalkalimin",
            kodiBiznesor:"Kodi Biznesor",
            btnRegister:"Regjistrohu"
        }
    }

    translate = (lang) => {
        if(lang === ''){
            let loc = localStorage.getItem("lang");
            if(loc === 'sq'){
                this.translateAlbania();
            }
            else{
                this.translateEnglish();
            }
        }
        else{
            localStorage.setItem("lang",lang);
            if(lang === 'sq'){
                this.translateAlbania();
            }else{
                this.translateEnglish();
            }
        }
    }

    translateEnglish = () => {
        $("#title").text(this.en.title);
        $("#emailAddress").text(this.en.emailAddress);
        $("#password").text(this.en.password);
        $("#confirmpassword").text(this.en.confirmPassword);
        $("#businessCode").text(this.en.businessCode);
        $("#register").text(this.en.btnRegister);
    }

    translateAlbania = () => {
        $("#title").text(this.sq.titulli);
        $("#emailAddress").text(this.sq.perdoruesi);
        $("#password").text(this.sq.fjalkalimi);
        $("#confirmpassword").text(this.sq.fjalkalimiKonfirmuar);
        $("#businessCode").text(this.sq.kodiBiznesor);
        $("#register").text(this.sq.btnRegister);
    }
}

export default new LanguageRegister();