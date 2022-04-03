import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyrights">© 2021 Ephraim Phil, Powered by News API</p>

        <div className="footer__links-container">
          <ul className="footer__links">
            <li>
              <Link className="footer__link" to="/">
                Home
              </Link>
            </li>
            <li>
              <a className="footer__link" href="https://practicum.yandex.com/" target="_blank" rel="noreferrer">
                Practicum by Yandex
              </a>
            </li>
          </ul>
          <ul className="footer__social-media">
            <li>
              <a className="footer__social-link" href="https://github.com/effip24" target="_blank" rel="noreferrer">
                <i className="footer__icon footer__icon_type_gh"></i>
              </a>
            </li>
            <li>
              <a className="footer__social-link" href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <i className="footer__icon footer__icon_type_fb"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
