import React, { Component } from 'react'
import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import authentication from './authentication.controller'
import albaniaFlag from '../../images/albania.jpg'
import englandFlag from '../../images/england.jpg'
import language from './controllers/language'
export class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            Username:'',
            Password:'',
            BusinessCode:''
        }
    }

    handleUsername = event => this.setState({Username:event.target.value});
    handlePassword = event => this.setState({Password:event.target.value});
    handleBusinessCode = event => this.setState({BusinessCode:event.target.value});
    
    handleLogin = async event => {
        event.preventDefault();
        let result = await authentication.login({Username:this.state.Username,Password:this.state.Password,BusinessCode:this.state.BusinessCode});
        if(result === true){
            window.location = "salelist"
        }
    }

    componentDidMount = () => {
        language.translate('');
    }


    render() {
        return (
            <div class="container" style={{marginTop:"135px"}}>
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                            <div className="card-header d-flex" style={{backgroundColor:'white'}}>
                                <a onClick={language.translate.bind(this,'sq')}><img src={albaniaFlag} width={40} height={30} alt="Albania"/></a>
                                <a className="ml-1" onClick={language.translate.bind(this,'en')}><img src={englandFlag} width={40} height={30} alt="English"/></a>
                            </div>
                            <div class="card-body">

                                <h5 id="title" class="card-title text-center">Sign In</h5>

                                <form class="form-signin" method="post" onSubmit={this.handleLogin}>

                                    <div class="form-label-group">
                                        <input type="text" id="inputEmail" class="form-control" placeholder="Email address"
                                            value={this.state.Username} onChange={this.handleUsername} autoFocus required />
                                        <label id="emailaddress" for="inputEmail">Email address</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="password" id="inputPassword" class="form-control" placeholder="Password"
                                            value={this.state.Password} onChange={this.handlePassword} required />
                                        <label id="password" for="inputPassword">Password</label>
                                        <span class="text-danger"></span>
                                    </div>

                                    
                                    <div class="form-label-group">
                                        <input type="password" id="inputbusinessCode" class="form-control" placeholder="BusinessCode" 
                                            value={this.state.BusinessCode} onChange={this.handleBusinessCode} required />
                                        <label id="businessCode" for="inputbusinessCode">Business Code</label>
                                        <span class="text-danger"></span>
                                    </div>

                                    <div class="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                        <label id="rememberpassword" class="custom-control-label" for="customCheck1" name="rememberme">Remember password</label>
                                    </div>

                                    <div>
                                        <button id="login" type="submit" class="btn btn-lg btn-primary btn-block text-uppercase">Sign in</button>
                                    </div>
                                        
                                    <div>
                                        <a id="forgotpassword" href="#">Forgot Password</a>
                                    </div>
                                    
                                    <hr class="my-4"/>
                                    <a id="register" href="/registerUser" class="btn btn-lg btn-primary btn-block text-uppercase" type="button">Register</a>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
