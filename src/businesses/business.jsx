import React, { Component } from 'react'
import businessController from './business.controller';
import SuccessAlert from '../../src/SuccessAlert'
import ErrorAlert from '../../src/ErrorAlert'
export class Business extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Name: '',
            Email: '',
            Owner: '',
            Code: ''
        }
    }


    handleName = event => this.setState({ Name: event.target.value });
    handleEmail = event => this.setState({ Email: event.target.value });
    handleOwner = event => this.setState({ Owner: event.target.value });
    handleCode = event => this.setState({ Code: event.target.value });

    handleRegister = async event => {
        event.preventDefault();
        let result = await businessController.selfRegister({ Name: this.state.Name, Email: this.state.Email, Owner: this.state.Owner, Code: this.state.Code });
        if (result === true) {
            SuccessAlert("Register Successful, now please create a user with your credentials");
            window.location = "/login"
            this.clearFields();
        }
        else {
            ErrorAlert(result.toString());
        }
    }

    clearFields = () => {
        this.setState({
            Name: '',
            Email: '',
            Owner: '',
            Code: ''
        })
    }


    render() {
        return (
            <div class="container" style={{ marginTop: "140px" }}>
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                            <div class="card-body">

                                <h5 class="card-title text-center">Register Your Business</h5>

                                <form class="form-signin" method="post" onSubmit={this.handleRegister}>

                                    <div class="form-label-group">
                                        <input type="text" id="businessName" class="form-control" placeholder="Name"
                                            value={this.state.Name} onChange={this.handleName} autofocus required />
                                        <label for="businessName">Business Name</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="email" id="inputemail" class="form-control" placeholder="Email"
                                            value={this.state.Email} onChange={this.handleEmail} required />
                                        <label for="inputemail">Email</label>
                                        <span class="text-danger"></span>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="text" id="inputOwner" class="form-control" placeholder="Owner"
                                            value={this.state.Owner} onChange={this.handleOwner} required />
                                        <label for="inputOwner">Owner Name</label>
                                        <span class="text-danger"></span>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="text" id="inputCode" class="form-control" placeholder="Nr Fiscal"
                                            value={this.state.Code} onChange={this.handleCode} required />
                                        <label for="inputCode">Nr Fiscal</label>
                                        <span class="text-danger"></span>
                                    </div>

                                    <hr class="my-4" />
                                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Business
