import React from "react";
import '../CSS/style.css';

import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';
import img4 from '../img/img4.png';

const Navcontent=()=>
{
    return(
        <>
            <section className="main-header">
                
                <div className="left-h">
                  <h1>
                    Keep your <span>car clean</span> always
                  </h1>
                </div>
                <div className="right-h">
                  <img src={img1} alt="" />
                </div>
              </section>

              <section className="experience">
                <h1>
                  Based On <span>Experience</span>
                </h1>
                <div className="box">
                  <div className="fbox">
                    <img src={img2} alt="" />
                  </div>
                  <div className="mbox">
                    <img src={img3}alt="" />
                  </div>
                  <div className="lbox">
                    <img src={img4} alt="" />
                    <h3>Our Statistics</h3>
                    <input type="checkbox" /> We have 5+ years of Experience
                  <br />
                  <input type="checkbox" /> We have more than 1k+ cars serviced
                  </div>
                </div>
               
                <div className="statics">
                </div>
              </section>

              <section id="services" className="services">
                <h1>
                  Cleen Car Wash <span>Services</span>
                </h1>
                <h2>LOVE YOUR CAR, WE MAKE IT MORE ADORABLE</h2>

                <div className="service-box">
                  <div className="sbox">
                    <div className="img">
                      <img src="https://media.istockphoto.com/id/174942860/photo/tire-wash.jpg?s=612x612&w=0&k=20&c=IHqUkH8UZl1vyS02BAU5zbJ2xvE-_NMFwSXOgfr2jdI=" alt="" />
                    </div>
                    <p>
                      <span> NORMAL WASHING</span> The normal wash is a basic car wash service that focuses on cleaning the exterior of the vehicle. It typically includes a thorough cleaning of the car's body, windows, and wheels. 
                      The normal wash is designed to remove dirt, dust, and light stains from the vehicle's surface, leaving it looking clean and presentable. It is a great option for regular maintenance and general cleanliness of the car.
                    </p>
                    <button>Know More</button>
                  </div>
                  <div className="sbox">
                    <div className="img">
                      <img src="https://media.istockphoto.com/id/1332908487/photo/car-washing-cleaning-car-using-high-pressure-water-autowashing-outdoors.jpg?s=612x612&w=0&k=20&c=S7v7BoeEsTb7riQ5fgBrTXfDdK8gvG7isN3GY48YwFo=" alt="" />
                    </div>
                    <p>
                      <span>MEDIUM Washing</span> The medium wash offers a more comprehensive cleaning compared to the normal wash. In addition to cleaning the exterior of the car, it also includes interior cleaning and detailing. The medium wash involves vacuuming and wiping down the seats, dashboard, and other interior surfaces to remove dust, debris, and stains. It provides a more thorough cleaning experience and helps maintain the overall cleanliness
                       and hygiene of the car's interior.
                    </p>
                    <button>Know More</button>
                  </div>
                  <div className="sbox">
                    <div className="img">
                      <img src="https://media.istockphoto.com/id/1394573624/photo/washing-the-car-in-an-automatic-washing-machine-brushed-car-washing-machine.jpg?s=612x612&w=0&k=20&c=uZDexpx4YEvSkhuG95bs_n-gOV4mR11NF4LhaeFD8wY=" alt="" />
                    </div>
                    <p>
                      <span>PREMIUM WASHING</span> The premium wash is a top-tier car wash service that goes above and beyond in terms of cleaning and detailing. It encompasses both the exterior and interior cleaning and 
                      protection of the vehicle. The premium wash often includes services such as waxing or polishing the car's exterior, treating the tires and trim, and providing special attention to the interior, 
                      such as leather conditioning or fabric protection. It aims to provide a premium level of cleanliness, shine, and protection for the car, giving it a refreshed and rejuvenated look.
                    </p>
                    <button>Know More</button>
                  </div>
                 
                </div>
              </section>

              <section id="about" className="about">
                <h1>
                  <span>ABOUT US</span>
                </h1>
                <h2>Cleen for Clean Shiny Sparkling Cars in a hassle-free way...</h2>
                <p>
                  Cleen is a brand that is literally going to change the way people
                  think about car cleaning. It is a unique mechanized car cleaning concept
                  where cars are getting pampered by the latest equipment including high
                  pressure cleaning machines, spray injection and extraction machines,
                  high-powered vacuum cleaners, steam cleaners, and so on.
                </p>
                <button>
                  <img src="https://www.speedcarwash.com/images/franchising.png" alt="" />
                </button>
              </section>

              <section id="contact">
                <h1 className="section-header">Contact</h1>

                <div className="contact-wrapper">
                  <form id="contact-form" className="form-horizontal" role="form">
                    <div className="form-group">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="NAME"
                          name="name"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-sm-12">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="EMAIL"
                          name="email"
                          required
                        />
                      </div>
                    </div>

                    <textarea
                      className="form-control"
                      rows="10"
                      placeholder="MESSAGE"
                      name="message"
                      required
                    ></textarea>

                    <button className="btn btn-primary send-button" id="submit" type="submit" value="SEND">
                      <div className="alt-send-button">
                        <i className="fa fa-paper-plane"></i>
                        <span className="send-text">SEND</span>
                      </div>
                    </button>
                  </form>

                  <div className="direct-contact-container">
                    <ul className="contact-list">
                      <li className="list-item">
                        <i className="fa fa-map-marker fa-2x">
                          <span className="contact-text place"> BHOPAL , MADHYA PRADESH</span>
                        </i>
                      </li>
                      <li className="list-item">
                        <i className="fa fa-phone fa-2x">
                          <span className="contact-text phone">
                            <a href="tel:1-212-555-5555" title="Give me a call">
                              (+91) 9098834262
                            </a>
                          </span>
                        </i>
                      </li>
                      <li className="list-item">
                        <i className="fa fa-envelope fa-2x">
                          <span className="contact-text gmail">
                            <a href="mailto:#" title="Send me an email">
                              Cleen@gmail.com
                            </a>
                          </span>
                        </i>
                      </li>
                    </ul>

                    <hr />
                    <ul className="social-media-list">
                      <li>
                        <a href="#" className="contact-icon">
                          <i className="ri-github-line"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank" className="contact-icon">
                          <i className="ri-whatsapp-line"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank" className="contact-icon">
                          <i className="ri-twitter-line"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank" className="contact-icon">
                          <i className="ri-instagram-line"></i>
                        </a>
                      </li>
                    </ul>
                    <hr />

                    <div className="copyright">
                      &copy; ALL OF THE RIGHTS RESERVED
                    </div>
                  </div>
                </div>
              </section>
        </>
    )

}

export default Navcontent;