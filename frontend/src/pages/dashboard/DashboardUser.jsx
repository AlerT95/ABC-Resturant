/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,useContext, useState } from "react";
import { UniversalContext } from '../../context/UniversalContext';
import ItemCardGrid from '../../components/ItemCardGrid';
import PageTitle from '../../components/PageTitle';
import ItemEditForm from '../../components/EditItemForm';

const DashboardUser = () => {
  const { setValue,getValue } = useContext(UniversalContext);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const isUserEditMode = getValue("isUserEditMode");

  useEffect(() => {
    setValue('PageName','User');
    if (isUserEditMode) {
      setIsEditFormVisible(true);
    }
  }, [isUserEditMode]);

  const handleEditFormClose = () => {
    setIsEditFormVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <PageTitle />
      </div>
      {!isEditFormVisible && (
          <div className="row">
            <ItemCardGrid />
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

export default DashboardUser;