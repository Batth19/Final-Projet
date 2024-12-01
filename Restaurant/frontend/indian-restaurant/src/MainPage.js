import React from 'react';
import './MainPage.css'; // Import the CSS design

const MainPage = ({ onLogin }) => {
    return (
    
        <div className="main-page main-container">
            {/* Header section with restaurant title and login button */}
           
            <header className="header">
                <div className="header-content">
                    <h1>Indian Restaurant</h1>
                    <p>Learn about real Indian food.</p>
                    <button className="login-button" onClick={onLogin}>Login or Register</button>
                </div>
            </header>

            {/* Main content section with a slideshow and restaurant description */}
            <main className="main-content">
                <div className="slideshow-container">
                    <img src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Slideshow 1" className="slide" />
                </div>
                <div className="description">
                    <h2>Welcome to Our Indian Restaurant</h2>
                    <p>
                        Every meal at our restaurant should be an outstanding experience, in our opinion. 
                        We take great satisfaction in providing a genuine taste of India by combining spices and flavours from several parts of the country. 
                        Our chefs are masters of traditional Indian culinary methods, so each dish is made with the highest attention to detail and fervor.
                    </p>
                    <p>
                    Our menu has something for everyone, including vegetarian, vegan, and gluten-free alternatives, and includes rich, creamy curries and freshly baked naan. 
                    Every ingredient is obtained locally, guaranteeing that every mouthful is high-quality and fresh.
                    </p>
                    <p>
                    Savor your dinner in a cozy setting that pays homage to India's colorful culture. 
                    Whether you're having a special event to celebrate or are just searching for a tasty meal, our welcoming team will make your dining experience unforgettable with their outstanding service.
                    </p>
                    <p>
                    Come enjoy our year-round special events and promotions, where you may experience delectable flavors and revel in the rich Indian culinary traditions.
                    </p>
                    <p>
                    We hope to see you soon at our restaurant, where each visit will be a sensory journey for your palate!
                    </p>
                </div>
            </main>

            {/* Footer section with restaurant information and contact details */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>About Us</h3>
                        <p>
                            Our restaurant offers a true taste of India with a focus on quality, authenticity, and service. 
                            From our vibrant atmosphere to our delicious dishes, we aim to create an unforgettable dining experience for every guest.
                        </p>
                    </div>
                    <div className="footer-section contact">
                        <h3>Contact Us</h3>
                        <p><strong>Phone:</strong> 4038727240x</p>
                        <p><strong>Email:</strong> barindersinghbatth@gmail.com</p>
                    </div>
                    <div className="footer-section address">
                        <h3>Visit Us</h3>
                        <p>108 Bell Street, Red Deer, Alberta, T4R1M8</p>
                    </div>
                    <div className="footer-section hours">
                        <h3>Opening Hours</h3>
                        <p><strong>Monday - Friday:</strong> 10:00 AM - 10:00 PM</p>
                        <p><strong>Saturday - Sunday:</strong> 10:00 PM - 12:00 PM</p> 
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Our Restaurant. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;
