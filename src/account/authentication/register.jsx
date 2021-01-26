import React, { Component } from 'react'
import authenticationController from './authentication.controller';
import language from './controllers/language.register'
import albaniaFlag from '../../images/albania.jpg'
import englandFlag from '../../images/england.jpg'
export class RegisterUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Username:'',
            Password:'',
            ConfirmPassword:'',
            BusinessCode:''
        }
    }
    
    handleUsername = event => this.setState({Username:event.target.value});
    handlePassword = event => this.setState({Password:event.target.value});
    handleConfirmPassword = event => this.setState({ConfirmPassword:event.target.value});
    handleBusinessCode = event => this.setState({BusinessCode:event.target.value});

    handleRegister = async event => {
        event.preventDefault();
        let result = await authenticationController.selfRegister({Username:this.state.Username,Password:this.state.Password,BusinessCode:this.state.BusinessCode});
        if(result === 200){

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

                                <form class="form-signin" method="post" onSubmit={this.handleRegister}>

                                    <div class="form-label-group">
                                        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" 
                                            value={this.state.Username} onChange={this.handleUsername} autofocus required />
                                        <label id="emailAddress" for="inputEmail">Email address</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="password" id="inputPassword" class="form-control" placeholder="Password"
                                            value={this.state.Password} onChange={this.handlePassword} required />
                                        <label id="password" for="inputPassword">Password</label>
                                        <span class="text-danger"></span>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="password" id="inputCPassword" class="form-control" placeholder="Confirm Password" 
                                            value={this.state.ConfirmPassword} onChange={this.handleConfirmPassword} required />
                                        <label id="confirmPassword" for="inputCPassword">Confirm Password</label>
                                        <span class="text-danger"></span>
                                    </div>
                                    
                                    <div class="form-label-group">
                                        <input type="password" id="inputbusinessCode" class="form-control" placeholder="BusinessCode"
                                            value={this.state.BusinessCode} onChange={this.handleBusinessCode} required />
                                        <label id="businessCode" for="inputbusinessCode">Business Code</label>
                                        <span class="text-danger"></span>
                                    </div>

                                    <hr class="my-4"/>
                                    <button id="register" class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterUser
