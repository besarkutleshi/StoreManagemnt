import React, { Component } from 'react'
import $ from 'jquery'
import language from './language.js'
export class Layout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openclose: true
        }
    }

    logout = () => {
        sessionStorage.clear();
        window.location = "/"
    }


    links = () => {
        let user = JSON.parse(sessionStorage.getItem("User"));
        if (user && user.role.name === "Admin") {
            return (
                <ul class="list-unstyled components mb-5" style={{ marginTop: "20px" }}>
                    <li class="">
                        <a href="#saleSubMenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-money mr-2" aria-hidden="true"></i> <span id="saleNav">Sale</span></a>
                        <ul class="collapse list-unstyled" id="saleSubMenu">
                            <li>
                                <a  href="/sale"><i class="fa fa-bar-chart mr-2" aria-hidden="true"></i> <span id="sale">Sale</span></a>
                            </li>
                            <li>
                                <a id="" href="/salelist"><i class="fa fa-pie-chart mr-2" aria-hidden="true"></i> <span id="saleList">Sale's List</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a  href="/purchaseInvoices"><i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i> <span id="purchases"> Purchase's</span></a>
                    </li>
                    <li>
                        <a id="" href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i
                            class="fa fa-line-chart mr-1" aria-hidden="true"></i> <span id="reports"> Report's</span></a>
                        <ul class="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <a id="" href="/enteriesReports"><i class="fa fa-bar-chart mr-2" aria-hidden="true"></i> <span id="enteriesReport"> Entries Report</span></a>
                            </li>
                            <li>
                                <a id="" href="/exitsReports"><i class="fa fa-pie-chart mr-2" aria-hidden="true"></i> <span id="exitsReport"> Exit's Report</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#item" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <i id="" class="fa fa-bars" aria-hidden="true"></i> <span id="itemNav">Item</span></a>
                        <ul class="collapse list-unstyled" id="item">
                            <li>
                                <a href="/items"><i class="fa fa-bars" aria-hidden="true"></i> <span id="itemLink"> Item's</span></a>
                            </li>
                            <li>
                                <a href="/categories"><i class="fa fa-cog" aria-hidden="true"></i> <span id="categories"> Categorie's</span></a>
                            </li>
                            <li>
                                <a href="/types"><i class="fa fa-cog" aria-hidden="true"></i> <span id="types"> Type's</span></a>
                            </li>
                            <li>
                                <a href="/units"><i class="fa fa-cog" aria-hidden="true"></i> <span id="unit"> Unit's</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className="employeeLink" id="" href="/employees"><i class="fa fa-users mr-1" aria-hidden="true"></i> <span id="employeeLink"> Employee's</span></a>
                    </li>
                    <li>
                        <a href="/collaborations"><i class="fa fa-street-view mr-1" aria-hidden="true"></i> <span id="collaboration"> Collaboration's</span></a>
                    </li>
                    <li>
                        <a href="/storeHouses" ><i class="fa fa-home mr-1" aria-hidden="true"></i> <span id="storehouse"> Store House's</span> </a>
                    </li>
                    <li>
                        <a href="/EP" ><i class="fa fa-wrench mr-1" aria-hidden="true"></i> <span id="empSH"> Employee's & Store House's</span></a>
                    </li>
                    <li>
                        <a href="/roles"><i class="fa fa-ban mr-1" aria-hidden="true"></i> <span id="roleList"> Role's</span></a>
                    </li>
                    <li>
                        <a href="/users"><i class="fa fa-user-circle mr-1" aria-hidden="true"></i> <span id="userList"> User's</span></a>
                    </li>
                </ul>
            )
        }
        else if (user && user.role.name === "User") {
            return (
                <ul class="list-unstyled components mb-5" style={{ marginTop: "20px" }}>
                    <li class="">
                        <a href="#saleSubMenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-money mr-2" aria-hidden="true"></i> <span id="saleNav">Sale</span></a>
                        <ul class="collapse list-unstyled" id="saleSubMenu">
                            <li>
                                <a href="/sale"><i class="fa fa-bar-chart mr-2" aria-hidden="true"></i> <span id="sale" >Sale</span></a>
                            </li>
                            <li>
                                <a href="/salelist"><i class="fa fa-pie-chart mr-2" aria-hidden="true"></i> <span id="saleList"> Sale's List</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/purchaseInvoices"><i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i><span id="purchases" >Purchase's</span></a>
                    </li>
                    <li>
                        <a href="#item" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <i id="itemNav" class="fa fa-bars" aria-hidden="true"></i> Item</a>
                        <ul class="collapse list-unstyled" >
                            <li>
                                <a href="/items"><i class="fa fa-bars" aria-hidden="true"></i> <span id="itemLink"> Item's</span></a>
                            </li>
                            <li>
                                <a href="/categories"><i class="fa fa-cog" aria-hidden="true"></i> <span id="categories"> Categorie's</span></a>
                            </li>
                            <li>
                                <a href="/types"><i class="fa fa-cog" aria-hidden="true"></i> <span id="types"> Type's</span></a>
                            </li>
                            <li>
                                <a href="/units"><i class="fa fa-cog" aria-hidden="true"></i> <span id="unit"> Unit's</span></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        }
        else {
            return (
                <ul class="list-unstyled components mb-5" style={{ marginTop: "20px" }}>
                    <li class="">
                        <a href="/" data-toggle="collapse" aria-expanded="false"><i class="fa fa-home mr-2" aria-hidden="true"></i>Home</a>
                    </li>
                    <li>
                        <a href="/"><i class="fa fa-user mr-2" aria-hidden="true"></i>Login</a>
                    </li>
                    <li>
                        <a href="/registerUser"><i class="fa fa-user-circle mr-2" aria-hidden="true"></i>Register</a>
                    </li>
                </ul>
            )
        }
    }

    authentication = () => {
        let user = JSON.parse(sessionStorage.getItem("User"));
        if (!user || !user.businessCode) {
            return (
                <ul class="nav navbar-nav ml-auto">
                    <li id="login" class="nav-item active">
                        <a id="loginbro" class="nav-link" href="/">Login</a>
                    </li>
                    <li id="register" class="nav-item">
                        <a id="registerbro" class="nav-link" href="/registerUser">Register</a>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul class="nav navbar-nav ml-auto">
                    <li id="logout" class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown"> <span className="mr-2" style={{ fontSize: '20px' }}> <i id="welcome"> Welcome</i> <i>{user.userName}</i> </span> </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a id="" href="/myProfile" class="dropdown-item"><i class="fa fa-user" aria-hidden="true"></i> <span id="profile"> Profile</span></a>
                            <div class="dropdown-divider"></div>
                            <a id="" onClick={language.translate.bind(this,'sq')} class="dropdown-item"><i class="fa fa-flag" aria-hidden="true"></i> <span id="albania"> Albania</span></a>
                            <a id="" onClick={language.translate.bind(this,'en')} class="dropdown-item"><i class="fa fa-flag" aria-hidden="true"></i> <span id="english"> English</span></a>
                            <div class="dropdown-divider"></div>
                            <a id="" onClick={this.logout} class="dropdown-item" href="/"> <i class="fa fa-sign-out" aria-hidden="true"></i> <span id="logoutbro">Logout</span></a>
                        </div>
                    </li>
                </ul>
            )
        }
    }

    componentDidMount = () => {
        language.translate('');
        let user = JSON.parse(sessionStorage.getItem("User"));
        user.businessCode ? $(this.businessCode).text(`${user.businessCode}`) : $(this.businessCode).text('');
    }

    render() {
        return (
            <div>
                <React.Fragment>

                    <div class="wrapper d-flex align-items-stretch">
                        <nav id="sidebar">
                            <div class="p-4 pt-5">
                                <h5 style={{ color: "aliceblue", textAlign: 'center' }}><i class="fa fa-map-marker mr-2" aria-hidden="true"></i><span ref={(t) => this.businessCode = t}></span> </h5>
                                {
                                    this.links()
                                }
                            </div>
                        </nav>

                        <div id="content" class="">

                            <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#fff' }}>
                                <div class="container-fluid">

                                    <button onClick={() => $('#sidebar').toggleClass('active')} type="button" id="sidebarCollapse" class="btn btn-primary">
                                        <i class="fa fa-bars"></i>
                                        <span class="sr-only">Toggle Menu</span>
                                    </button>

                                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                        <i class="fa fa-bars"></i>
                                    </button>

                                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                        {
                                            this.authentication()
                                        }
                                    </div>
                                </div>
                            </nav>
                            <div id="root">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}

export default Layout
