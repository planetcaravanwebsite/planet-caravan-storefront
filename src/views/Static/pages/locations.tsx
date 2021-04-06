import "../scss/index.scss";
import * as React from "react";

export const Locations: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <div className="locations-page">
          <h1>Locations</h1>
          <div className="locations-grid">
            <div className="locations-grid-item">
              <div className="iframe-container">
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe
                  className="responsive-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.8493427751514!2d-84.51275728432763!3d39.13265964064643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8841b39268e2fa01%3A0xdcd03ce7e3fa1256!2sPlanet%20Caravan%20Smoke%20Shop%20(Jefferson)!5e0!3m2!1sen!2sus!4v1614624950716!5m2!1sen!2sus"
                />
              </div>
              <h2>Jefferson</h2>
              <div className="store-address">
                <p>2826 Jefferson Ave</p>
                <p>Cincinnati, OH 45219</p>
                <p>
                  <a href="tel:5138610420">(513) 861-0420</a>
                </p>
              </div>
              <div className="store-hours">
                <p>Mon-Sat: 9AM–10PM</p>
                <p>Sunday 10AM–9PM</p>
              </div>
            </div>
            <div className="locations-grid-item">
              <div className="iframe-container">
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe
                  className="responsive-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3095.0650863034075!2d-84.52328118432771!3d39.12775034093723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8841b3f572577135%3A0x91493720628c7e29!2s243%20W%20McMillan%20St%2C%20Cincinnati%2C%20OH%2045219!5e0!3m2!1sen!2sus!4v1614628647144!5m2!1sen!2sus"
                />
              </div>
              <h2>West McMillan</h2>
              <div className="store-address">
                <p>243 W McMillan St</p>
                <p>Cincinnati, OH 45219</p>
                <p>
                  <a href="tel:5135790420">(513) 579-0420</a>
                </p>
              </div>
              <div className="store-hours">
                <p>Mon-Sat: 10AM–11PM</p>
                <p>Sun: 10AM–10PM</p>
              </div>
            </div>
            <div className="locations-grid-item">
              <div className="iframe-container">
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe
                  className="responsive-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3085.048153540227!2d-84.46235288432302!3d39.355146127436115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x884045601c72835d%3A0x8d648dcba897bf56!2s8097%20Beckett%20Center%20Dr%2C%20West%20Chester%20Township%2C%20OH%2045069!5e0!3m2!1sen!2sus!4v1614628713853!5m2!1sen!2sus"
                />
              </div>
              <h2>West Chester</h2>
              <div className="store-address">
                <p>8097 Beckett Center Dr</p>
                <p>West Chester Township, OH 45069</p>
                <p>
                  <a href="tel:5138680710">(513) 868-0710</a>
                </p>
              </div>
              <div className="store-hours">
                <p>Mon-Sat: 9AM–10PM</p>
                <p>Sunday 10AM–9PM</p>
              </div>
            </div>
            <div className="locations-grid-item">
              <div className="iframe-container">
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe
                  className="responsive-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3090.126210912123!2d-84.5951846843254!3d39.24000653428044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88404a630792194b%3A0x70e9ecf9a0e1f4ff!2s9268%20Colerain%20Ave%2C%20Cincinnati%2C%20OH%2045251!5e0!3m2!1sen!2sus!4v1614628767840!5m2!1sen!2sus"
                />
              </div>
              <h2>Colerain</h2>
              <div className="store-address">
                <p>9268 Colerain Ave</p>
                <p>Cincinnati, OH 45251</p>
                <p>
                  <a href="tel:5133810710">(513) 381-0710</a>
                </p>
              </div>
              <div className="store-hours">
                <p>Mon-Sat: 9AM–10PM</p>
                <p>Sunday 10AM–9PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
