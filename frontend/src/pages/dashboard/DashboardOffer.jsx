import { useEffect,useContext, useState } from "react";
import { UniversalContext } from '../../context/UniversalContext';
import ItemCardGrid from '../../components/ItemCardGrid';
import PageTitle from '../../components/PageTitle';
import ItemEditForm from '../../components/EditItemForm';

const DashboardOffer = () => {
  const { setValue,getValue } = useContext(UniversalContext);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const isOfferEditMode = getValue("isOfferEditMode");
  const userType = getValue("userType");
  useEffect(() => {
    setValue('PageName','Offer');
    if (isOfferEditMode) {
      setIsEditFormVisible(true);
    }
  }, [isOfferEditMode]);

  const handleAddItemClick = () => {
    setValue("isOfferEditMode",false);
    setIsEditFormVisible(true);
  };

  const handleEditFormClose = () => {
    setIsEditFormVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <PageTitle />
      </div>
      {!isEditFormVisible && (
        <div>
          {userType === "admin" && (
          <div className="row mb-2 me-2 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-auto"
              onClick={handleAddItemClick}
            >
              Add Offer
              <i className="ri-add-fill fs-6 text-primary" />
            </button>
          </div>
          )}
          <div className="row">
            <ItemCardGrid />
          </div>
        </div>
      )}
      {isEditFormVisible && (
        <div className="row">
          <ItemEditForm onClose={handleEditFormClose} />
        </div>
      )}
    </div>
  );
};

export default DashboardOffer;