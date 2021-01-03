import React, { useEffect } from 'react'
import search_icon from './images/search_icon.png'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'
import img4 from './images/img4.png'
import loader from './images/loader.gif'
import social1 from './images/social1.png'
import social2 from './images/social2.png'
import social3 from './images/social3.png'
import banner from './images/banner-img.png'
import f_logo from './images/f_logo.png'
import icon1 from './images/icon-1.png'
import icon2 from './images/icon-2.png'
import icon3 from './images/icon-3.png'
import icon4 from './images/icon-4.png'
import icon5 from './images/icon-5.png'
import icon6 from './images/icon-6.png'
import img7 from './images/img-7.png'
import img8 from './images/img-8.png'
import img9 from './images/img-9.png'
import img2png from './images/img-2png.png'
import logo from './images/logo.png'

const Index = () => {

    return (
        <div>

            {/* <div id="preloader">
                <div class="loader">
                    <img src={loader} alt="#" />
                </div>
            </div> */}

            <header class="top-header">
                <nav class="navbar header-nav navbar-expand-lg">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="index.html"><img src={logo} alt="image" /></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-wd"
                            aria-controls="navbar-wd" aria-expanded="false" aria-label="Toggle navigation">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbar-wd">
                            <ul class="navbar-nav">
                                <li><a class="nav-link active" style={{ background: '#f2184f', color: '#fff' }} href="/login">Login</a></li>
                                <li><a class="nav-link active" style={{ background: '#f2184f', color: '#fff' }} href="/registerUser">Register</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div class="container-fluid mb-5" style={{ backgroundImage: `url(${banner})` }}>
                <div class="row" style={{height:"1000px"}}>
                    <div class="col-md-12 mt-5">
                        <div class="slide_text text-center">
                            <h3>Trusted and<br />Professional Advisers</h3>
                            <br />
                            <h4><span class="theme_color">For your Business</span></h4>
                            <br />
                            <p>Showcase your Profile to the world using online CV builder and Get Hired Faster</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section layout_padding">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="full">
                                <div class="heading_main text_align_left">
                                    <div class="left">
                                        <p class="section_count">01</p>
                                    </div>
                                    <div class="right">
                                        <p class="small_tag">About us</p>
                                        <h2><span class="theme_color">WE CAN</span> HELP YOUR business GROW</h2>
                                        <p class="large">Get your Business in 4 easy steps</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section dark_bg">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-6 col-md-12 text_align_center padding_0">
                            <div class="full">
                                <img class="img-responsive" src={img2png} alt="#" />
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-12 white_fonts layout_padding padding_left_right">
                            <h3 class="small_heading">EVERYTHING<br />YOU NEED IN ONE SOLUTION</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page
                            when looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                            opposed to using 'Content here,
                            content here', making it look like readable English. Many desktop publishing packages and web
                            page editors now use Lorem Ipsum as
                        their default model..</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section layout_padding">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="full">
                                <div class="heading_main text_align_left">
                                    <div class="left">
                                        <p class="section_count">02</p>
                                    </div>
                                    <div class="right">
                                        <p class="small_tag">SERVICES</p>
                                        <h2><span class="theme_color">How to provide</span> tools that help anyone give a voice
                                    to their ideas</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row margin-top_30">

                        <div class="col-sm-6 col-md-4">
                            <div class="service_blog">
                                <div class="service_icons">
                                    <img width="75" height="75" src={icon1} alt="#" />
                                </div>
                                <div class="full">
                                    <h4>DIGITAL marketing</h4>
                                </div>
                                <div class="full">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4">
                            <div class="service_blog">
                                <div class="service_icons">
                                    <img width="75" height="75" src={icon2} alt="#" />
                                </div>
                                <div class="full">
                                    <h4>DIGITAL marketing</h4>
                                </div>
                                <div class="full">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4">
                            <div class="service_blog">
                                <div class="service_icons">
                                    <img width="75" height="75" src={icon3} alt="#" />
                                </div>
                                <div class="full">
                                    <h4>DIGITAL marketing</h4>
                                </div>
                                <div class="full">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4">
                            <div class="service_blog">
                                <div class="service_icons">
                                    <img width="75" height="75" src={icon4} alt="#" />
                                </div>
                                <div class="full">
                                    <h4>DIGITAL marketing</h4>
                                </div>
                                <div class="full">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4">
                            <div class="service_blog">
                                <div class="service_icons">
                                    <img width="75" height="75" src={icon5} alt="#" />
                                </div>
                                <div class="full">
                                    <h4>DIGITAL marketing</h4>
                                </div>
                                <div class="full">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4">
                            <div class="service_blog">
                                <div class="service_icons">
                                    <img width="75" height="75" src={icon6} alt="#" />
                                </div>
                                <div class="full">
                                    <h4>DIGITAL marketing</h4>
                                </div>
                                <div class="full">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div class="section layout_padding">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="full">
                                <div class="heading_main text_align_left">
                                    <div class="left">
                                        <p class="section_count">03</p>
                                    </div>
                                    <div class="right">
                                        <p class="small_tag">Portfolio</p>
                                        <h2><span class="theme_color">CHOOSE A</span> PROFESSIONAL DESIGN</h2>
                                        <p class="large">Websites</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row margin-top_30">
                        <div class="col-lg-12 margin-top_30">
                            <div id="demo" class="carousel slide" data-ride="carousel">

                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-6 col-sm-12">
                                                <img class="img-responsive" src={img1} alt="#" />
                                            </div>
                                            <div class="col-lg-3 col-md-6 col-sm-12">
                                                <img class="img-responsive" src={img2} alt="#" />
                                            </div>
                                            <div class="col-lg-3 col-md-6 col-sm-12">
                                                <img class="img-responsive" src={img3} alt="#" />
                                            </div>
                                            <div class="col-lg-3 col-md-6 col-sm-12">
                                                <img class="img-responsive" src={img4} alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-6 col-sm-12">
                                                <img class="img-responsive" src={img1} alt="#" />
                                            </div>
                                            <div class="col-lg-3 col-md-6 col-sm-12">
                                                <img class="img-responsive" src={img2} alt="#" />
                                            </div>
                                            <div class="col-lg-3 col-md-6 col-sm-12">
                                                <img class="img-responsive" src={img3} alt="#" />
                                            </div>
                                            <div class="col-lg-3 col-md-6 col-sm-12">
                                                <img class="img-responsive" src={img4} alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                    <span class="carousel-control-prev-icon"></span>
                                </a>
                                <a class="carousel-control-next" href="#demo" data-slide="next">
                                    <span class="carousel-control-next-icon"></span>
                                </a>

                            </div>
                        </div>

                        <div class="col-lg-12">
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page
                            when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using 'Content here, content here', making it look like
                            readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
                            their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
                        their</p>
                        </div>

                    </div>
                </div>
            </div>

            <div class="section layout_padding dark_bg">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="full">
                                <div class="heading_main text_align_left white_fonts">
                                    <div class="left">
                                        <p class="section_count">04</p>
                                    </div>
                                    <div class="right">
                                        <h2>Create <span class="theme_color" />PERSONALISED Business</h2>
                                        <p class="large">What we done</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row margin-top_30">
                        <div class="col-lg-12 margin-top_30 white_fonts">
                            <p>ss normal distribution of letters, as opposed to using 'Content here, content here', making it
                            look like readable English. Many desktop publishing packages and web page editors now use Lorem
                            Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites
                            still in theirss normal distribution of letters, as opposed to using 'Content here, content
                        here', making it look like re ed r</p>
                        </div>
                    </div>
                    <div class="row margin-top_30 counter_section">
                        <div class="col-sm-12 col-md-4">
                            <div class="counter margin-top_30">

                                <h2 class="timer count-title count-number" data-to="23" data-speed="1500"></h2>
                                <p class="count-text">NOMINATIONS</p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <div class="counter margin-top_30">

                                <h2 class="timer count-title count-number" data-to="7" data-speed="1500"></h2>
                                <p class="count-text">AWARDS</p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <div class="counter margin-top_30">

                                <h2 class="timer count-title count-number" data-to="31" data-speed="1500"></h2>
                                <p class="count-text">AGENCIES</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="section layout_padding">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="full">
                                <div class="heading_main text_align_left">
                                    <div class="left">
                                        <p class="section_count">05</p>
                                    </div>
                                    <div class="right">
                                        <p class="small_tag">Our Team</p>
                                        <h2><span class="theme_color">We Have a Professional</span> Team of Business Analysts.
                                </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row margin-top_30">
                        <div class="col-lg-12 margin-top_30">
                            <div id="team_slider" class="carousel slide" data-ride="carousel">

                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div class="row">

                                            <div class="col-lg-4 col-md-4 col-sm-12">
                                                <div class="full">
                                                    <div class="full team_member_img text_align_center">
                                                        <img src={img7} alt="#" />
                                                        <div class="social_icon_team">
                                                            <ul class="social_icon">
                                                                <li><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <h3>Jone due</h3>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <p>this a long established fact that a reader will be distracted by the
                                                    readable content </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-4 col-md-4 col-sm-12">
                                                <div class="full">
                                                    <div class="full team_member_img text_align_center">
                                                        <img src={img8} alt="#" />
                                                        <div class="social_icon_team">
                                                            <ul class="social_icon">
                                                                <li><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <h3>Jone due</h3>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <p>this a long established fact that a reader will be distracted by the
                                                    readable content </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-4 col-md-4 col-sm-12">
                                                <div class="full">
                                                    <div class="full team_member_img text_align_center">
                                                        <img src={img9} alt="#" />
                                                        <div class="social_icon_team">
                                                            <ul class="social_icon">
                                                                <li><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <h3>Jone due</h3>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <p>this a long established fact that a reader will be distracted by the
                                                    readable content </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row">

                                            <div class="col-lg-4 col-md-4 col-sm-12">
                                                <div class="full">
                                                    <div class="full team_member_img text_align_center">
                                                        <img src={img7} alt="#" />
                                                        <div class="social_icon_team">
                                                            <ul class="social_icon">
                                                                <li><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <h3>Jone due</h3>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <p>this a long established fact that a reader will be distracted by the
                                                    readable content </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-4 col-md-4 col-sm-12">
                                                <div class="full">
                                                    <div class="full team_member_img text_align_center">
                                                        <img src={img8} alt="#" />
                                                        <div class="social_icon_team">
                                                            <ul class="social_icon">
                                                                <li><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <h3>Jone due</h3>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <p>this a long established fact that a reader will be distracted by the
                                                    readable content </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-4 col-md-4 col-sm-12">
                                                <div class="full">
                                                    <div class="full team_member_img text_align_center">
                                                        <img src={img9} alt="#" />
                                                        <div class="social_icon_team">
                                                            <ul class="social_icon">
                                                                <li><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                                                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <h3>Jone due</h3>
                                                    </div>
                                                    <div class="full text_align_center">
                                                        <p>this a long established fact that a reader will be distracted by the
                                                    readable content </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div> </div> <div class="bullets">
                                        <ul class="carousel-indicators">
                                            <li data-target="#team_slider" data-slide-to="0" class="active"></li>
                                            <li data-target="#team_slider" data-slide-to="1"></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <footer class="footer-box">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 margin-bottom_30">
                            <img src={f_logo} alt="#" />
                        </div>
                        <div class="col-xl-6 white_fonts">
                            <div class="row">
                                <div class="col-md-12 white_fonts margin-bottom_30">
                                    <h3>Contact Us</h3>
                                </div>
                                <div class="col-md-4">
                                    <div class="full icon">
                                        <img src={social1} />
                                    </div>
                                    <div class="full white_fonts">
                                        <p>London 145
                                    <br />United Kingdom</p>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="full icon">
                                        <img src={social2} />
                                    </div>
                                    <div class="full white_fonts">
                                        <p>consultation@gmail.com
                                    <br />consultation@gmail.com</p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="full icon">
                                        <img src={social3} />
                                    </div>
                                    <div class="full white_fonts">
                                        <p>+7586656566
                                    <br />+7586656566</p>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <ul class="full social_icon margin-top_20">
                                        <li><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                        <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6 white_fonts">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="footer_blog footer_menu">
                                        <h3>Menus</h3>
                                        <ul>
                                            <li><a href="index.html">Home</a></li>
                                            <li><a href="about.html">About Us</a></li>
                                            <li><a href="services.html">Services</a></li>
                                            <li><a href="#">Blog</a></li>
                                            <li><a href="contact.html">Contact us</a></li>
                                        </ul>
                                    </div>
                                    <div class="footer_blog recent_post_footer">
                                        <h3>Recent Post</h3>
                                        <p>Participate in staff meetings manage dedicated to marketing November 25, 2019</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="footer_blog full">
                                        <h3>Newsletter</h3>
                                        <div class="newsletter_form">
                                            <form action="index.html">
                                                <input type="email" placeholder="Your Email" name="#" required />
                                                <button>Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </footer>

            <div class="footer_bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <p class="crp">© 2019 Business . All Rights Reserved.</p>
                            <ul class="bottom_menu">
                                <li><a href="#">Term of Service</a></li>
                                <li><a href="#">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <a href="#" id="scroll-to-top" class="hvr-radial-out"><i class="fa fa-angle-up"></i></a>

        </div>
    )
}

export default Index
