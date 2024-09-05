import { useContext } from "react";
import { UniversalContext } from '../context/UniversalContext';

const PageTitle = () => {
  const { getValue } = useContext(UniversalContext);
  const userType = getValue("userType");
  const pageName = getValue('PageName') ? getValue('PageName') : "Welcome!";

  // Inline styles
  const pageTitleBoxStyle = {
    backgroundColor: "#272e03", // Light grey background
    padding: "15px",
    borderRadius: "5px",
    color:"#fff",
    marginBottom: "20px"
  };

  const breadcrumbStyle = {
    margin: "0",
    padding: "10px 0",
    backgroundColor: "#272e03", // Bootstrap's light gray
    borderRadius: "5px",
    color:"#fff"
  };

  const pageTitleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff" // Dark text
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box" style={pageTitleBoxStyle}>
          <div className="page-title-right">
            <ol className="breadcrumb m-0" style={breadcrumbStyle}>
              <li className="breadcrumb-item">
                <a href="#">ABC</a>
              </li>
              {userType !== undefined && (
                <li className="breadcrumb-item" >
                  <a href="#" style={{color:'#fff'}}>Dashboards</a>
                </li>
              )}
              <li className="breadcrumb-item active"  style={{color:'#fff'}}>{pageName}</li>
            </ol>
          </div>
          <h4 className="page-title" style={pageTitleStyle}>{pageName}</h4>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
