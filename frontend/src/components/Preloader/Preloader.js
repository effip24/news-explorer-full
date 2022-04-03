import "./Preloader.css";

const Preloader = ({ isSearchingNews }) => {
  return (
    <div className="circle-preloader" style={{ display: `${isSearchingNews ? "flex" : ""}` }}>
      <i className="circle-preloader__spinner"></i>
      <p className="circle-preloader__text">Searching for news...</p>
    </div>
  );
};
export default Preloader;
