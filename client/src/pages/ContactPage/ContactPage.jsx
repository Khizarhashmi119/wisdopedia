import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <p>You can follow us on</p>
      <div className="social-links">
        <a href="https://www.facebook.com/officialwisdopedia">
          <div className="social-link">
            <i className="fab fa-facebook-f"></i>
          </div>
        </a>
        <a href="https://www.instagram.com/officialwisdopedia">
          <div className="social-link">
            <i className="fab fa-instagram"></i>
          </div>
        </a>
        <a href="https://www.linkedin.com/company/wisdopedia">
          <div className="social-link">
            <i className="fab fa-linkedin-in"></i>
          </div>
        </a>
      </div>
      <p>or you can leave a message (we will contact you after sometime)</p>
      <form className="contact-form">
        <input
          className="contact-input"
          type="email"
          name="email"
          id="contact-email"
          placeholder="Email*"
          required
        />
        <input
          className="contact-input"
          type="text"
          name="subject"
          id="contact-subject"
          placeholder="Subject*"
          required
        />
        <textarea
          className="contact-input"
          name="message"
          id="contact-message"
          rows="5"
          placeholder="Message*"
          required
        ></textarea>
        <input
          className="contact-input"
          type="text"
          name="firstName"
          id="contact-first-name"
          placeholder="First Name*"
          required
        />
        <input
          className="contact-input"
          type="text"
          name="lastName"
          id="contact-last-ame"
          placeholder="Last Name"
        />
        <input
          className="contact-input"
          type="text"
          name="country"
          id="contact-country"
          placeholder="Country*"
          required
        />
        <input
          className="contact-input"
          type="text"
          name="city"
          id="contact-city"
          placeholder="City"
        />
        <small>* required fields</small>
        <button className="contact-input" id="contact-send-btn" type="submit">
          <i className="fas fa-paper-plane"></i> Send
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
