import { useContext, useState, useEffect } from "react";
import { UniversalContext } from '../context/UniversalContext';

const Dialogbox = () => {
  const { getValue, setValue } = useContext(UniversalContext);
  const [visibility, setVisibility] = useState(getValue("DialogVisibility"));
  const type = getValue("DialogType");
  const message = getValue("DialogMessage");

  useEffect(() => {
    setVisibility(getValue("DialogVisibility"));
  }, [getValue("DialogVisibility")]);

  const handleClose = () => {
    setValue("DialogVisibility", false);
  };

  if (!visibility) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: 'block' }}
      aria-modal="true"
      role="dialog"
    >
      {type === 'primary' ? (
        <div className="modal-dialog modal-sm">
          <div className="modal-content modal-filled bg-success">
            <div className="modal-body p-4">
              <div className="text-center">
                <i className="ri-check-line h1"></i>
                <h4 className="mt-2">Well Done!</h4>
                <p className="mt-3">{message}</p>
                <button type="button" className="btn btn-light my-2" data-bs-dismiss="modal" onClick={handleClose}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-dialog modal-sm">
          <div className="modal-content modal-filled bg-danger">
            <div className="modal-body p-4">
              <div className="text-center">
                <i className="ri-close-circle-line h1"></i>
                <h4 className="mt-2">Oh snap!</h4>
                <p className="mt-3">{message}</p>
                <button type="button" className="btn btn-light my-2" data-bs-dismiss="modal" onClick={handleClose}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialogbox;