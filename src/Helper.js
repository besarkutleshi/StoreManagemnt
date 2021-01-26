import $ from 'jquery'
class Helper{

    constructor(){
        this.config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("User")) ? JSON.parse(sessionStorage.getItem("User")).token : ''}`
            }
        }
        this.url = 'http://menaxhimi.depos.com/api/';
    }

    
    response(response){
        if(response.status === 200){
            return true;
        }
        return response.data;
    }

    changeKeys = (array) => {
        let newarray = [];
        array.forEach(element => {
            let obj = {Description:element.description,IsSelected:element.isSelected,Role:null,User:null,RoleID:element.roleID,UserID:element.userID};
            newarray.push(obj);
        });
        return newarray;
    }

    hide(value){
        if(!value){
            $('#activeItems').hide();
        }else{
            $('#activeItems').show();
        }
    }

    manageErrorResponse = (error) => {
        const message = error.message;
        if(message.toString().includes('401')){
            window.location = 'sessionExpired';
        }
    }
}

export default new Helper();