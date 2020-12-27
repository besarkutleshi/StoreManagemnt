import React, { Component } from 'react'
import $ from 'jquery'
export class Layout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openclose:true
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
                        <a  href="#saleSubMenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-money mr-2" aria-hidden="true"></i>Sale</a>
                        <ul class="collapse list-unstyled" id="saleSubMenu">
                            <li>
                                <a href="/sale"><i class="fa fa-bar-chart mr-2" aria-hidden="true"></i> Sale</a>
                            </li>
                            <li>
                                <a href="/salelist"><i class="fa fa-pie-chart mr-2" aria-hidden="true"></i> Sale's List</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/purchaseInvoices"><i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>Purchase's</a>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i
                            class="fa fa-line-chart mr-1" aria-hidden="true"></i> Report's</a>
                        <ul class="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <a href="#"><i class="fa fa-bar-chart mr-2" aria-hidden="true"></i> Entries Report</a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-pie-chart mr-2" aria-hidden="true"></i> Exit's Report</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#item" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <i class="fa fa-bars" aria-hidden="true"></i> Item</a>
                        <ul class="collapse list-unstyled" id="item">
                            <li>
                                <a href="/items"><i class="fa fa-bars" aria-hidden="true"></i> Item's</a>
                            </li>
                            <li>
                                <a href="/categories"><i class="fa fa-cog" aria-hidden="true"></i> Categorie's</a>
                            </li>
                            <li>
                                <a href="/types"><i class="fa fa-cog" aria-hidden="true"></i> Type's</a>
                            </li>
                            <li>
                                <a href="/units"><i class="fa fa-cog" aria-hidden="true"></i> Unit's</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                    </li>
                    <li>
                        <a href="/employees"><i class="fa fa-users mr-1" aria-hidden="true"></i> Employee's</a>
                    </li>
                    <li>
                        <a href="/collaborations"><i class="fa fa-street-view mr-1" aria-hidden="true"></i> Collaboration's</a>
                    </li>
                    <li>
                        <a href="/storeHouses"><i class="fa fa-home mr-1" aria-hidden="true"></i> Store House's</a>
                    </li>
                    <li>
                        <a href="/EP"><i class="fa fa-wrench mr-1" aria-hidden="true"></i> Employee's & Store House's</a>
                    </li>
                    <li>
                        <a href="/roles"><i class="fa fa-ban mr-1" aria-hidden="true"></i> Role's</a>
                    </li>
                    <li>
                        <a href="/users"><i class="fa fa-user-circle mr-1" aria-hidden="true"></i> User's</a>
                    </li>
                </ul>
            )
        }
        else if (user && user.role.name === "User") {
            return (
                <ul class="list-unstyled components mb-5" style={{ marginTop: "20px" }}>
                    <li class="">
                        <a href="/sale" data-toggle="collapse" aria-expanded="false"><i class="fa fa-money mr-2" aria-hidden="true"></i>Sale</a>
                    </li>
                    <li>
                        <a href="/purchaseInvoices"><i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>Purchase's</a>
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
                        <a class="nav-link" href="/">Login</a>
                    </li>
                    <li id="register" class="nav-item">
                        <a class="nav-link" href="/registerUser">Register</a>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul class="nav navbar-nav ml-auto">
                    <li id="logout" class="nav-item active">
                        <a onClick={this.logout} class="nav-link" href="/">Logout</a>
                    </li>
                </ul>
            )
        }
    }

    componentDidMount = () => {
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
                                <h5 style={{ color: "aliceblue", textAlign: 'center' }}><i class="fa fa-map-marker mr-2" aria-hidden="true"></i><span  ref={(t) => this.businessCode = t}></span> </h5>
                                {
                                    this.links()
                                }
                            </div>
                        </nav>

                        <div id="content" class="">

                            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#fff'}}>
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
