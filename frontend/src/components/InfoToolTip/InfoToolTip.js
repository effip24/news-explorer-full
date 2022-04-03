import "./InfoToolTip.css";

const InfoToolTip = ({ isOpen, onLinkClick, onClose }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button aria-label="close" type="button" className="popup__close" onClick={onClose}></button>
        <h6 className="popup__info-title">Registration successfully completed!</h6>
        <p className="popup__info-link" onClick={onLinkClick}>
          Sign in
        </p>
      </div>
    </div>
  );
};
export default InfoToolTip;
