import { useState, useEffect,useContext } from "react";
import { updateProfile } from "../api/profileApi";
import { UniversalContext } from '../context/UniversalContext';
const EditProfile = () => {
  const { setValue } = useContext(UniversalContext);
  const [profile, setProfile] = useState({
    id: null,
    userId: null,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePicture: "",
    bio: "",
  });
  const[user,setUser] = useState("");

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await updateProfile(
        profile.id,
        user.id,
        profile.firstName,
        profile.lastName,
        profile.phoneNumber,
        profile.profilePicture,
        profile.bio
      );
      if (response.ok) {
        localStorage.setItem("profile", JSON.stringify(profile));
        setValue("profile",profile);
        setValue("AlertType", "primary");
          setValue("AlertMessage", "Profile updated successfully");
          setValue("AlertVisibility", true);
      } else {
        setValue("AlertType", "danger");
          setValue("AlertMessage", response.message);
          setValue("AlertVisibility", true);
        
      }
    } catch (error) {
      setValue("AlertType", "danger");
          setValue("AlertMessage", "Error updating profile");
          setValue("AlertVisibility", true);
      
    }
  };

  const handleFirstNameChange = (event) => {
    setProfile((prevProfile) => ({ ...prevProfile, firstName: event.target.value }));
  };

  const handleLastNameChange = (event) => {
    setProfile((prevProfile) => ({ ...prevProfile, lastName: event.target.value }));
  };

  const handlePhoneNumberChange = (event) => {
    setProfile((prevProfile) => ({ ...prevProfile, phoneNumber: event.target.value }));
  };

  const handleBioChange = (event) => {
    setProfile((prevProfile) => ({ ...prevProfile, bio: event.target.value }));
  };

  return (
    <div className="col-sm-12">
      <div className="card p-0">
        <div className="card-body p-0">
          <div className="profile-content">
            <div id="edit-profile" className="tab-pane">
              <div className="tab-content m-0 p-4">
                <div className="user-profile-content">
                  <div>
                    <div className="row row-cols-sm-2 row-cols-1">
                      <div className="mb-2">
                        <label className="form-label" htmlFor="FirstName">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={handleFirstNameChange}
                          id="FirstName"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="LastName">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={handleLastNameChange}
                          id="LastName"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="PhoneNumber">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={profile.phoneNumber}
                          onChange={handlePhoneNumberChange}
                          id="PhoneNumber"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-12 mb-3">
                        <label className="form-label" htmlFor="Bio">
                          Bio
                        </label>
                        <textarea
                          style={{ height: 125 }}
                          value={profile.bio}
                          onChange={handleBioChange}
                          id="Bio"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleUpdate}>
                      <i className="ri-save-line me-1 fs-16 lh-1" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;