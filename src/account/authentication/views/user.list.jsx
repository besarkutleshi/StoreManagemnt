import React, { Component } from 'react'
import MUI from 'mui-datatables'
import Helper from '../../../Helper'
import authentication from '../authentication.controller'
import Icon from 'react-icons-kit'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import { Button } from 'react-bootstrap'
import { trashO } from 'react-icons-kit/fa/trashO'
import {users} from 'react-icons-kit/icomoon/users'
import {close} from 'react-icons-kit/fa/close'
import { Modal } from 'react-bootstrap'
import SuccessAlert from '../../../SuccessAlert'
export class UserList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            Users:[],
            IsLoading:false,
            Show:false,
            Username:'',
            Employees:[],
            EmployeeID:0,
            Roles:[],
            RoleID:0,
            Description:'',
            Password:'',
            Submit : 'Register',
        }
    }

    handleUsername = event => this.setState({Username:event.target.value});
    handlePassword = event => this.setState({Password:event.target.value});
    handleDescription = event => this.setState({Description:event.target.value});
    handleEmployeeID = event => this.setState({EmployeeID:event.target.value});
    handleRoleID = event => this.setState({RoleID:event.target.value});
    handleShow = () => this.setState({Show:true})
    handleClose = () => this.setState({Show:false,Username:'',Password:'',Description:''})

    getUsers = async () =>{
        this.setState({IsLoading:true})
        let result = await authentication.getUsers();
        this.setState({IsLoading:false})
        if(result){
            this.setState({Users:result});
        }
    }

    componentDidMount = async () => {
        await this.getUsers();
    }

    registerSubmit = async event =>{
        event.preventDefault();
        let result = await authentication.registerUser({EmployeeID:this.state.EmployeeID,RoleID:this.state.RoleID,
            Username:this.state.Username,Password:this.state.Password,Description:this.state.Description});
        if(result){
            SuccessAlert("Register Successful");
            window.location = ""
        }
    }
    

    render() {
        if(this.state.IsLoading){
            return(
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )
        }
        if(this.state.Users.length > 0){
            return (
                <div className="container">
                  
                    <div className="row mt-5">
                        <div className="col-sm-4">
                            <Button variant="primary" onClick={this.handleShow} style={{width: "100%"}}>
                                Insert User <Icon icon={checkSquareO}></Icon>
                            </Button>
                        </div>
                    </div>
                   
                    <div className="row mt-1">
                        <div className="col-sm-12">
                            <MUI 
                                title = "Users"
                                data={
                                    this.state.Users.map(u => {
                                        let array = [
                                            u.id,u.employee.name,u.userName,u.businessCode,u.role.name,u.description,
                                            <Button className="btn btn-dark">Roles <Icon icon={users}/></Button>,
                                            <button className="btn btn-primary">Update <Icon icon={checkSquareO}/></button>,
                                            <button className="btn btn-danger">Delete <Icon icon={trashO}/></button>
                                        ]
                                        return array
                                    })
                                }
                                columns={["ID","EMPLOYEE","USERNAME","BUSINESS NAME","ROLE","DESCRIPTION","USER ROLES","UPDATE","DELETE"]}
                            />
                        </div>
                    </div>
                  
                    <div className="row">
                        <Modal show={this.state.Show} onHide={this.handleClose}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Register User
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.registerSubmit}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="username">Username</label>
                                                <input id="username" type="text" className="form-control" placeholder="Username" 
                                                    value={this.state.Username} onChange={this.handleUsername} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="password">Password</label>
                                                <input id="password" type="password" className="form-control" placeholder="Password"
                                                    value={this.state.Password} onChange={this.handlePassword} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="employess">Employess</label>
                                                <select className="form-control" value={this.state.EmployeeID} onChange={this.handleEmployeeID}>
                                                    <option value="0">Not selected</option>
                                                    {
                                                        this.state.Employees.map(emp => {
                                                            return(
                                                                <option value={emp.id}>{emp.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="roles">Roles</label>
                                                <select className="form-control" value={this.state.RoleID} onChange={this.handleRoleID}>
                                                    <option value="0">Not selected</option>
                                                    {
                                                        this.state.Roles.map(emp => {
                                                            return(
                                                                <option value={emp.id}>{emp.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 form-group">
                                                <label htmlFor="description">Description</label>
                                                <textarea rows="7" id="description" type="text" className="form-control" placeholder="Description"
                                                value={this.state.Description} onChange={this.handleDescription} />
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button id="submit" type="submit" className="float-left btn btn-primary">{this.state.Submit} <Icon icon={checkSquareO}></Icon></button>
                                    <Button className="btn btn-danger" onClick={this.handleClose}>Close <Icon icon={close} style={{marginTop:"-10px"}}></Icon></Button>
                                </Modal.Footer>
                            </form>
                    </Modal>
                </div>

                </div>
            )
        }
        else{
            return(
                <div className="container mt-5">
                    <div className="row justify-content-center mt-5">
                        <h4>Does not have any user</h4>
                    </div>
                </div>
            )
        }
    }
}

export default UserList
