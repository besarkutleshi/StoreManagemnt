import $ from 'jquery'
class Language {
    constructor() {
        this.en = {
            title: 'Sign In',
            emailAddress: 'Email Address',
            password: 'Password',
            businessCode: 'Bussines Code',
            btnLogin: 'Sign In',
            btnRegister: 'Register',
            forgotPassword: 'Forgot Password',
            rememberPassword: 'Remeber Password'
        }
        this.sq = {
            titulli: 'Kyqu',
            perdoruesi: 'Perdoruesi',
            fjalkalimi: 'Fjalkalimi',
            kodiBiznesit: 'Kodi i Biznesit',
            btnKyqu: 'Kyqu',
            btnRegjistrohu: 'Regjistrohu',
            btnHarresaPasswordit: 'Nuk ju kujtohet fjalkalimi ?',
            btnKujtoPasswordin: 'Gjej Fjalkalimin'
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
        $('#title').text(this.sq.titulli);
        $('#emailaddress').text(this.sq.perdoruesi);
        $('#password').text(this.sq.fjalkalimi);
        $('#businessCode').text(this.sq.kodiBiznesit);
        $('#rememberpassword').text(this.sq.btnKujtoPasswordin);
        $('#forgotpassword').text(this.sq.btnHarresaPasswordit);
        $('#register').text(this.sq.btnRegjistrohu);
        $('#login').text(this.sq.btnKyqu);
    }

    translateEnglish = () => {
        $('#title').text(this.en.title);
        $('#emailaddress').text(this.en.emailAddress);
        $('#password').text(this.en.password);
        $('#businessCode').text(this.en.businessCode);
        $('#rememberpassword').text(this.en.rememberPassword);
        $('#forgotpassword').text(this.en.forgotPassword);
        $('#register').text(this.en.btnRegister);
        $('#login').text(this.en.btnLogin);
    }
}

export default new Language();