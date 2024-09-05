/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect,useContext, useState } from "react";
import { UniversalContext } from '../../context/UniversalContext';
import ItemCardGrid from '../../components/ItemCardGrid';
import PageTitle from '../../components/PageTitle';
import ItemEditForm from '../../components/EditItemForm';

const DashboardCategory = () => {
  const { setValue,getValue } = useContext(UniversalContext);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const isCategoryEditMode = getValue("isCategoryEditMode");
  const handleAddItemClick = () => {
    setValue("isCategoryEditMode",false);
    setIsEditFormVisible(true);
  };

  useEffect(() => {
    setValue('PageName','Category');
    if (isCategoryEditMode) {
      setIsEditFormVisible(true);
    }
  }, [isCategoryEditMode]);

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
          <div className="row mb-2 me-2 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-auto"
              onClick={handleAddItemClick}
            >
              Add Category
              <i className="ri-add-fill fs-6 text-primary" />
            </button>
          </div>
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

export default DashboardCategory;