import { useEffect, useState } from "react";
import axios from "axios";

import "./Quote.css";

const Quote = () => {
  const [quoteData, setQuoteData] = useState(null);

  useEffect(() => {
    axios
      .get("https://quotes.rest/qod.json?category=inspire")
      .then((response) => setQuoteData(response.data));
  }, []);

  return (
    <div
      className="quote-block"
      style={{
        backgroundImage: `url(${
          quoteData && quoteData.contents.quotes[0].background
        })`,
      }}
    >
      <div className="bg-transparent"></div>
      {quoteData !== null ? (
        <div className="quote-body">
          <i className="fas fa-quote-right fa-2x"></i>
          <p className="quote">{quoteData.contents.quotes[0].quote}</p>
          <span className="quote-author">
            By : {quoteData.contents.quotes[0].author}
          </span>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              fontSize: "0.9em",
              fontWeight: "bold",
              justifyContent: "center",
              marginTop: "1rem",
              zIndex: 50,
            }}
          >
            <img
              src="https://theysaidso.com/branding/theysaidso.png"
              height="20"
              width="20"
              alt="theysaidso.com"
            />
            <a
              href="https://theysaidso.com"
              title="Powered by quotes from theysaidso.com"
              style={{
                color: "#ccc",
                marginLeft: "4px",
                verticalAlign: "middle",
              }}
            >
              They Said So®
            </a>
          </div>
        </div>
      ) : (
        <h4 className="loading-text">Loading...</h4>
      )}
    </div>
  );
};

export default Quote;
