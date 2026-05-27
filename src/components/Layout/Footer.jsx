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
        {/* Column 1: Company */}
        <div className="Topper-containers">
          <h5 className="footer-section-header">Company</h5>
          <div className="footer-link-group">
            <Link to="/about">About Us</Link>
            <Link to="/team">Our Team</Link>
            <Link to="/culturePage">People & Culture</Link>
            <Link to="/services">Services</Link>
            <Link to="/CSR" className="disabled">ESG</Link>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="Topper-containers">
          <h5 className="footer-section-header">services</h5>
          <div className="footer-link-group">
            <Link to="/hvac">HVAC</Link>
            <Link to="/mep">MEP</Link>
            <Link to="/BaseBuild">Base build</Link>
            <Link to="/Cleanroom">Cleanrooms</Link>
            <Link to="/InteriorFitout">C&I & Interior fit-out</Link>
            <Link to="/VirtualProjectManagement">Virtual Project Management</Link>
            <Link to="/OperationNmaintainance">Operations & Maintenance</Link>
          </div>
        </div>

        {/* Column 3: Sectors */}
        <div className="Topper-containers">
          <h5 className="footer-section-header">Sectors</h5>
          <div className="footer-link-group">
            <Link to="/commGcc">Commercial Real Estate & GCC</Link>
            <Link to="/Industrial">Industrial & Warehousing</Link>
            <Link to="/DataCentres">Data Centres & Critical rooms</Link>
            <Link to="/Biotech">Pharma & biotech life sciences</Link>
            <Link to="/hospitality">Hospitality & Luxury Retail</Link>
            <Link to="/healthcare">Hospital & healthcare</Link>
            <Link to="/Educational">Educational institutes</Link>
            <Link to="/Infra">Gov & Infra</Link>
          </div>
        </div>

        {/* Column 4: Contact & Socials */}
        <div className="Topper-containers-last">
          <div className="last-inner-containers">
            <h5 className="footer-section-header">Contact us</h5>
            <div className="footer-link-group">
              <a href="mailto:info@htlaircon.com">info@htlaircon.com</a>
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
              >
                LinkedIn
              </a>
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
            >
              Mumbai
            </a>
            <p>|</p>
            <a
              href="https://share.google/fDctcd6HFeUzxvvYq"
              target="_blank"
              rel="noopener noreferrer"
            >
              CBD-Belapur
            </a>
            <p>|</p>
            <a
              href="https://share.google/f0iUtcToDOtrwf9Aw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pune
            </a>
            <p>|</p>
            <a
              href="https://share.google/f0iUtcToDOtrwf9Aw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bangalore
            </a>
            <p>|</p>
            <a
              href="https://share.google/RqXjhF3mnm6aI3mZI"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ahemdabad
            </a>
            <p>|</p>
            <a
              href="https://share.google/vvixY7bbSVbcva8Qg"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Delhi
            </a>
            <p>|</p>
            <a
              href="https://share.google/NwzIG9w7KWwRPq3ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hyderabad
            </a>
            <p>|</p>
            <span className="non-clickable">Africa</span>
          </div>
          <p className="copyrights">
            © <span id="currentYear">{currentYear}</span> HTL AIRCON. All rights reserved | Powered by{' '}
            <a
              href="https://dms.family/"
              target="_blank"
              rel="noopener noreferrer"
              className="copyright-link"
            >
              DMSG
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
