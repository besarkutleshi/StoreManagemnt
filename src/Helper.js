
class Helper{
    constructor(){
        sessionStorage.setItem("User",JSON.stringify({Token:''}));
        this.config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("User")).Token}`
            }
        }
        this.url = 'https://localhost:5001/api/business/'
    }

    
    response(response){
        if(response.status === 200){
            return true;
        }
        return response.data;
    }
}

export default new Helper();