import React, { Component } from 'react'
import authorization from '../controllers/authorization.controller'
import Icon from 'react-icons-kit'
import { trashO } from 'react-icons-kit/fa/trashO'
import { pencil } from 'react-icons-kit/fa/pencil'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {close} from 'react-icons-kit/fa/close'
import { Button, Modal } from 'react-bootstrap'
import SuccessAlert from '../../../SuccessAlert'
import ErrorAlert from '../../../ErrorAlert'
import {users} from 'react-icons-kit/icomoon/users'
import Helper from '../../../Helper'
import Swal from 'sweetalert2'
export class Role extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Roles: [],
            Show:false,
            ShowS:false,
            RoleId:'',
            RoleName:'',
            RoleCode:'',
            Description:'',
            Submit : 'Register',
            UsersInRole:[]
        }
        this.getRoles = this.getRoles.bind(this);
    }

    handleRoleName = event => this.setState({RoleName:event.target.value});
    handleRoleCode = event => this.setState({RoleCode:event.target.value});
    handleDescription = event => this.setState({Description:event.target.value});

    handleCheckChieldElement = (event) => {
        let userInRole = this.state.UsersInRole
        userInRole.forEach(ur => {
           if (ur.userID.toString() === event.target.value.toString()){
                ur.isSelected =  event.target.checked
                document.getElementById(ur.userID).checked = event.target.checked;
           }
        })
        this.setState({UsersInRole: userInRole})
    }

    handleShow = () => this.setState({Show:true})
    handleClose = () => this.setState({Show:false,RoleId:'',RoleName:'',RoleCode:'',Description:''})
    handleShowS = () => this.setState({ShowS:true})
    handleCloseS = () => this.setState({ShowS:false})

    getRoles = async () => {
        let result = await authorization.getRoles();
        if (result) {
            this.setState({ Roles: result });
        }
    }
    getUsersInRole = async (roleid) => {
        let result = await authorization.getUserInRole(roleid);
        if(result){
            this.setState({ UsersInRole: result,ShowS:true });
        }
    }
    componentDidMount = async () => {
        await this.getRoles();
    }
    registerSubmit = async event => {
        event.preventDefault();
        let result;
        this.state.Submit === "Register" ? result = await authorization.insertRole({Name:this.state.RoleName,Code:this.state.RoleCode,Description:this.state.Description}) :
            result = await authorization.updateRole({ID:this.state.RoleId,Name:this.state.RoleName,Code:this.state.RoleCode,Description:this.state.Description});
        if(result){
            SuccessAlert(`${this.state.Submit} Successful`);
            window.location.reload();
        }else{
            ErrorAlert(`Not ${this.state.Submit}`);
        }
    }
    updateModal = (id) => {
        let role = this.state.Roles.filter(r => r.id === id);
        this.setState({
            Submit:'Update',
            RoleId:role[0].id,
            RoleName:role[0].name,
            RoleCode:role[0].code,
            Description:role[0].description,
            Show:true
        })
    }
    updateUsersInRole = async event => {
        event.preventDefault();
        let result = await authorization.insertUsersInRole(Helper.changeKeys(this.state.UsersInRole));
        if(result){
            SuccessAlert(`Update Successful`);
            window.location.reload();
        }else{
            ErrorAlert("Something went wrong");
        }
    }
    deleteRole = async (id) => {
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
            let response = await authorization.deleteRole(id);
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
        return (
            <div className="container">

                <div className="row" style={{ marginBottom: "5px", marginTop: "20px" }}>
                    <div className="col-sm-4 float-left">
                        <Button variant="primary" onClick={this.handleShow} style={{width: "100%"}}>
                            Insert Role <Icon icon={checkSquareO}></Icon>
                        </Button>
                    </div>
                </div>

                <div className="row">
                    {
                        this.state.Roles.map((role, key) => {
                            return (
                                <div className="col-sm-12" style={{ width: "100%", marginBottom: "10px" }}>
                                    <div className="card">
                                        <div className="card-header">
                                            {role.id}
                                        </div>
                                        <div className="card-body">
                                            {role.name}
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-dark" onClick={this.getUsersInRole.bind(this,role.id)}>Users in Role <Icon icon={users}></Icon></button>
                                            &nbsp;&nbsp;
                                            <button onClick={this.updateModal.bind(this,role.id)} className="btn btn-primary">Update <Icon icon={pencil}></Icon></button>
                                            &nbsp;&nbsp;
                                            <button className="btn btn-danger" onClick={this.deleteRole.bind(this,role.id)}>Delete <Icon icon={trashO}></Icon></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="row">
                    <Modal show={this.state.Show} onHide={this.handleClose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Register Role
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.registerSubmit}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="rolename">Role</label>
                                                <input id="rolename" type="text" className="form-control" placeholder="Role Name" 
                                                    value={this.state.RoleName} onChange={this.handleRoleName} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="rolecode">Role Code</label>
                                                <input id="rolecode" type="text" className="form-control" placeholder="Role Code"
                                                    value={this.state.RoleCode} onChange={this.handleRoleCode} />
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
                                    Users in this Role
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.updateUsersInRole}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            {
                                                this.state.UsersInRole.map(ur => {
                                                    return(
                                                        <div className="col-sm-12">
                                                            <div className="form-check">
                                                                <input id={ur.userID} type="checkbox" className="form-check-input mt-1"
                                                                    value={ur.userID}
                                                                    checked={ur.isSelected}
                                                                    onChange={()=>{}}
                                                                    onClick={this.handleCheckChieldElement}/>
                                                                <label class="form-check-label"  htmlFor="isSelected">{ur.user.userName}</label>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button id="submit" type="submit" className="float-left btn btn-primary">Update <Icon icon={checkSquareO}></Icon></button>
                                    <Button className="btn btn-danger" onClick={this.handleCloseS}>Close <Icon icon={close} style={{marginTop:"-10px"}}></Icon></Button>
                                </Modal.Footer>
                            </form>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Role
