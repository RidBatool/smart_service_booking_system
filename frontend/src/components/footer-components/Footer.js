
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="footer nav-footer">
      <span className="copyright-icon">
        <FontAwesomeIcon icon={faCopyright} />
      </span>
      Rida Clinic | All Rights Reserved
    </footer>
  );
}
