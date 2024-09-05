import { useContext } from 'react';
import EditProfile from "../../components/EditProfile";
import ProfileSummaryCard from "../../components/ProfileSummaryCard";
import { UniversalContext } from '../../context/UniversalContext';

const DashboardIndex = () => {
  const { getValue } = useContext(UniversalContext);
  const isEditing = getValue('profileEdit');
  return (
    <div className="container-fluid">
      <div className="row">
        <ProfileSummaryCard/>
      </div>
      {isEditing && (
        <div className="row">
          <EditProfile/>
        </div>
      )}

    </div>
  );
};

export default DashboardIndex;