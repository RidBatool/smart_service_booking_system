
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

const LandingBrand = () => {
  return (
    <section className="brand-section">
      <div className="brand-container">
        <h2 className="brand-title">
          <span className="logo-container">
            R
            <span className="logo">
              <FontAwesomeIcon icon={faCar} />
            </span>
            C
          </span>
          <span className="title">Rida Clinic</span>
        </h2>
        <p className="slogan">Your Trusted Partner for Car Care Solutions!</p>
      </div>
    </section>
  );
};

export default LandingBrand;
