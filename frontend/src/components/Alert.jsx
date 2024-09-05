/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { UniversalContext } from '../context/UniversalContext';

const Alert = () => {
  const { getValue, setValue } = useContext(UniversalContext);
  const [visibility, setVisibility] = useState(getValue("AlertVisibility"));
  const type = getValue("AlertType");
  const message = getValue("AlertMessage");

  useEffect(() => {
    setVisibility(getValue("AlertVisibility"));
  }, [getValue("AlertVisibility")]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisibility(false);
      setValue("AlertVisibility", false);
    }, 5000); // 5000ms = 5 seconds
    return () => clearTimeout(timeoutId);
  }, [visibility]);

  const handleClose = () => {
    setValue("AlertVisibility", false);
  };

  if (!visibility) return null;

  return (
    <div
      className="position-fixed start-50 translate-middle-x z-index-10"
      style={{ zIndex: 100000,top:"0.5rem" }}
    >
      {type === 'primary' ? (
        <div className="alert alert-primary alert-dismissible text-bg-primary border-0 fade show" role="alert">
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
          <strong>Success! - </strong> {message}
        </div>
      ) : (
        <div className="alert alert-danger alert-dismissible text-bg-danger border-0 fade show" role="alert">
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
          <strong>Error! - </strong> {message}
        </div>
      )}
    </div>
  );
};

export default Alert;