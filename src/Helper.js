import $ from 'jquery'
class Helper{

    constructor(){
        this.config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("User")) ? JSON.parse(sessionStorage.getItem("User")).token : ''}`
            }
        }
        this.url = 'https://localhost:44355/api/';
        this.showF = false;
        this.showS = false;
    }

    
    handleShow = () => this.ShowF = true;
    handleClose = () => this.ShowF = false;
    handleShowS = () => this.ShowS = true;
    handleCloseS = () => this.ShowS = false;

    

    
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
}

export default new Helper();