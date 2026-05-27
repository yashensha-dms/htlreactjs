import React from 'react';
import './Footer.css';

const Link = ({ to, children, className = '', ...props }) => {
  return (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ marginTop: '0px' }}>
      <div className="topper-section">
        <div className="Topper-containers">
          <h5 className="footer-section-header">Company</h5>
          <div className="footer-link-group">
            <Link to="/about">About Us</Link>
            <Link to="/team">Our Team</Link>
            <Link to="/epc">EPC</Link>
            <Link to="/approach">Our Approach</Link>
            <Link to="/sustainability">Sustainability</Link>
          </div>
        </div>
        <div className="Topper-containers">
          <h5 className="footer-section-header">services</h5>
          <div className="footer-link-group">
            <Link to="/pharmaceuticals">Pharmaceuticals</Link>
            <Link to="/biopharmaceuticals">Biopharmaceuticals</Link>
            <Link to="/medical-devices">Medical Devices</Link>
            <Link to="/cosmetics">Cosmetics</Link>
            <Link to="/industrial-appliances">Industrial Appliances</Link>
          </div>
        </div>
        <div className="Topper-containers-last">
          <div className="last-inner-containers">
            <h5 className="footer-section-header">Contact us</h5>
            <div className="footer-link-group">
              <a href="tel:+912242174700">+91 22-42174700</a>
            </div>
          </div>
          <div className="last-inner-containers">
            <h5 className="footer-section-header">Follow us on</h5>
            <div className="footer-link-group">
              <a
                href="https://www.linkedin.com/company/htlaircon/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                >LinkedIn</a
              >
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="left">
          <img
            src={`${import.meta.env.BASE_URL}images/NEW LOGOS/FOOTERLOGO.svg`}
            style={{ height: '48px', width: 'auto', display: 'block' }}
            alt="HTL Aircon logo footer"
          />
          <object
            data={`${import.meta.env.BASE_URL}images/logo/iso.svg`}
            type="image/svg+xml"
            height="48px"
            title="ISO Certification Logo"
          ></object>
        </div>
        <div className="right">
          <div className="location-group">
            <a
              href="https://share.google/dYqwM77PdZPv6NQja"
              target="_blank"
              rel="noopener noreferrer"
              >Mumbai</a
            >
            <p>|</p>
            <a
              href="https://share.google/fDctcd6HFeUzxvvYq"
              target="_blank"
              rel="noopener noreferrer"
              >CBD-Belapur</a
            >
            <p>|</p>
            <a
              href="https://share.google/f0iUtcToDOtrwf9Aw"
              target="_blank"
              rel="noopener noreferrer"
              >Pune</a
            >
            <p>|</p>
            <a
              href="https://share.google/f0iUtcToDOtrwf9Aw"
              target="_blank"
              rel="noopener noreferrer"
              >Bangalore</a
            >
            <p>|</p>
            <a
              href="https://share.google/RqXjhF3mnm6aI3mZI"
              target="_blank"
              rel="noopener noreferrer"
              >Ahemdabad</a
            >
            <p>|</p>
            <a
              href="https://share.google/vvixY7bbSVbcva8Qg"
              target="_blank"
              rel="noopener noreferrer"
              >New Delhi</a
            >
            <p>|</p>
            <a
              href="https://share.google/NwzIG9w7KWwRPq3ca"
              target="_blank"
              rel="noopener noreferrer"
              >Hyderabad</a
            >
            <p>|</p>
            <a className="non-clickable">Africa</a>
          </div>
          <p className="copyrights">
            © <span id="currentYear">{currentYear}</span> HTL AIRCON. All rights reserved |
            Powered by
            <a
              href="https://dms.family/"
              target="_blank"
              rel="noopener noreferrer"
              className="copyright-link"
              > DMSG</a
            >
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
