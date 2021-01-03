import React, { useState,useEffect } from 'react'
import businessCtrl from './business.controller'
import '../css/table.css'
import $ from 'jquery'
import userimage from '../images/user.svg'
const BusinessDetails = () => {

    const [profile, setProfile] = useState({});

    const getUserProfile = async () => {
        const user = JSON.parse(sessionStorage.getItem("User"));
        if (user) {
            let response = await businessCtrl.getProfile(user.userName);
            console.log(response)
            if (response) {
                setProfile(response);
            }
        }
    }

    useEffect(async () => {
        $('#root').css('background-color','#fafafa')
        await getUserProfile();
        console.log(profile);
    }, [])

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-4">
                    <div class="row">
                        <div class="col-sm-12" id="cardBlock">
                            <div class="card">
                                <div class="card-body">
                                    <div class="text-center">
                                        <img lass="img-responsive center" src={userimage} width="100" height="100" />
                                    </div>
                                    <br />
                                    <hr/>
                                    <h5 class="text-center">Hello, {profile.userName}</h5>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div class="col-sm-12" id="cardBlock">
                            <div class="card">
                                <div class="card-body">
                                    <h5>User Details</h5>
                                    <hr/>
                                    <div className="text-center">
                                        <p>User Email : {profile.userEmail}</p>
                                        <p>User Phone : {profile.userPhone}</p>
                                        <p>User Address : {profile.userAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12" id="cardBlock">
                            <div class="card">
                                <div class="card-body">
                                    <div class="text-center">
                                       <i class="fa fa-comments" style={{fontSize:'8em'}} aria-hidden="true"></i>
                                    </div>
                                    <br />
                                    <div class="text-center">
                                        <p>Have questions or concerns regarding your account ? <br /> Our experts are here to help you</p>
                                    </div>
                                    <br />
                                    <div class="text-center">
                                        <button class="btn btn-success">Chat with us</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card" id="cardBlock">
                                <div class="card-body">
                                    <h5>Business Details</h5>
                                    <hr/>
                                    <div class="text-center">
                                        <p>Name : {profile.businessName}</p>
                                        <p>Address : {profile.businessAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card" id="cardBlock">
                                <div class="card-body">
                                    <h5>Business Management</h5>
                                    <hr/>
                                    <div class="text-center">
                                        <p>Boss : {profile.boss}</p>
                                        <p>Business Code : {profile.businessCode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card" id="cardBlock">
                                <div class="card-body">
                                    <h5>Email Address</h5>
                                    <hr/>
                                    <div class="text-center">
                                        <p>Email : {profile.bussinesEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card" id="cardBlock">
                                <div class="card-body">
                                    <h5>Phone Number</h5>
                                    <hr/>
                                    <div class="text-center">
                                        <p>Phone Nr. : {profile.businessPhone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessDetails