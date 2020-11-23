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
import collaboration from '../../../collaboration/collaboration.js'
import authorize from '../../authorization/controllers/authorization.controller'
import ErrorAlert from '../../../ErrorAlert'
import Swal from 'sweetalert2'
export class UserList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            Users:[],
            IsLoading:false,
            Show:false,
            ShowS:false,
            ID:'',
            Username:'',
            Employees:[],
            EmployeeID:0,
            Roles:[],
            RoleID:0,
            Description:'',
            Password:'',
            Submit : 'Register',
            BusinessCode:'',
            UserRoles:[]
        }
    }

    handleUsername = event => this.setState({Username:event.target.value});
    handlePassword = event => this.setState({Password:event.target.value});
    handleDescription = event => this.setState({Description:event.target.value});
    handleEmployeeID = event => this.setState({EmployeeID:event.target.value});
    handleRoleID = event => this.setState({RoleID:event.target.value});
    
    handleShow = () => this.setState({Show:true});
    handleClose = () => this.setState({Show:false,Username:'',Password:'',Description:''});
    handleShowS = () => this.setState({ShowS:true})
    handleCloseS = () => this.setState({ShowS:false})

    getUsers = async () =>{
        this.setState({IsLoading:true})
        let result = await authentication.getUsers();
        this.setState({IsLoading:false})
        if(result){
            this.setState({Users:result});
        }
    }

    getEmployees = async () => {
        let result = await collaboration.getEmployees();
        if(result){
            this.setState({Employees:result});
        }
        let roles = await authorize.getRoles();
        if(roles){
            this.setState({Roles:roles});
        }
    }

    getUserRoles = async (userid) => {
        let result = await authorize.getUserRoles(userid);
        console.log(result);
        if(result){
            this.setState({UserRoles:result});
            this.setState({ShowS:true})
        }
    }

    componentDidMount = async () => {
        await this.getUsers();
        await this.getEmployees();
    }

    registerSubmit = async event =>{
        event.preventDefault();
        let result = this.state.Submit === "Register" ?
        await authentication.registerUser({EmployeeID:this.state.EmployeeID,RoleID:this.state.RoleID,
            Username:this.state.Username,Password:this.state.Password,Description:this.state.Description}) : 
        await authentication.updateUser({ID:this.state.ID,EmployeeID:this.state.EmployeeID,RoleID:this.state.RoleID,
            UserName:this.state.Username,Password:this.state.Password,Description:this.state.Description});
        if(result){
            SuccessAlert("Register Successful");
            window.location = ""
        }
    }
    
    updateModal = (id) => {
        let user = this.state.Users.filter(r => r.id === id);
        this.setState({
            Submit:'Update',
            ID:user[0].id,
            Username:user[0].userName,
            Password:user[0].password,
            Description:user[0].description,
            EmployeeID:user[0].employeeID,
            RoleID:user[0].roleID,
            Show:true
        })
    }

    handleCheckChieldElement = (event) => {
        let userrole = this.state.UserRoles
        userrole.forEach(ur => {
           if (ur.role.id.toString() === event.target.value.toString()){
                ur.isSelected =  event.target.checked
                document.getElementById(ur.role.id).checked = event.target.checked;
           }
        })
        this.setState({UserRoles: userrole})
    }

    updateUserRoles = async event => {
        event.preventDefault();
        let result = await authorize.insertUserRole(Helper.changeKeys(this.state.UserRoles));
        if(result){
            SuccessAlert(`Update Successful`);
            window.location.reload();
        }else{
            ErrorAlert("Something went wrong");
        }
    }

    deleteUser = async (id) => {
        let result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if(result.isConfirmed){
            let response = await authentication.deleteUser(id);
            if(response){
                Swal.fire(
                  'Deleted!',
                  'Change has been deleted.',
                  'success'
                );
                window.location.reload();
            }else{
                ErrorAlert(response.Error);
            }
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
                                            <button onClick={this.getUserRoles.bind(this,u.id)} className="btn btn-dark">Roles <Icon icon={users}/></button>,
                                            <button onClick={this.updateModal.bind(this,u.id)} className="btn btn-primary">Update <Icon icon={checkSquareO}/></button>,
                                            <button onClick={this.deleteUser.bind(this,u.id)} className="btn btn-danger">Delete <Icon icon={trashO}/></button>
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
                                    {`${this.state.Submit} User`}
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
                                                                <option value={emp.id}>{emp.name} {emp.surname}</option>
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

                <div className="row">
                        <Modal show={this.state.ShowS} onHide={this.handleCloseS}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    User Roles
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.updateUserRoles}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            {
                                                this.state.UserRoles.map(ur => {
                                                    return(
                                                        <div className="col-sm-12">
                                                            <div className="form-check">
                                                                <input id={ur.role.id} type="checkbox" className="form-check-input mt-1"
                                                                    value={ur.role.id}
                                                                    checked={ur.isSelected}
                                                                    onChange={()=>{}}
                                                                    onClick={this.handleCheckChieldElement}/>
                                                                <label class="form-check-label"  htmlFor="isSelected">{ur.role.name}</label>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button id="submit" type="submit" className="float-left btn btn-primary">{this.state.Submit} <Icon icon={checkSquareO}></Icon></button>
                                    <Button className="btn btn-danger" onClick={this.handleCloseS}>Close <Icon icon={close} style={{marginTop:"-10px"}}></Icon></Button>
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
