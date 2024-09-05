/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from 'react';
import bgProfile from '../assets/images/bg-profile.jpg';
import avatar1 from '../assets/images/users/avatar-1.jpg';
import { UniversalContext } from '../context/UniversalContext';
import config from "../utils/config.json";
import { getFirstProfileByUserId, createProfile, updateProfile } from '../api/profileApi';
import { uploadImage } from '../api/imageApi';

const apiUrl = config.API_URL;

const ProfileSummaryCard = () => {
  const { setValue, getValue } = useContext(UniversalContext);
  const [firstName, setFirstName] = useState('New');
  const [lastName, setLastName] = useState('Customer');
  const [phoneNumber, setPhoneNumber] = useState('please inser your profile details');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(avatar1); 
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserId(JSON.parse(user).id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getFirstProfileByUserId(userId).then(response => {
        if (response.ok) {
          const profile = response.profile;
          localStorage.setItem('profile',JSON.stringify(profile));
          setFirstName(profile.firstName);
          setLastName(profile.lastName);
          setPhoneNumber(profile.phoneNumber);
          setBio(profile.bio);
          setProfilePicture(apiUrl + profile.profilePicture);
        } else {
          // If no profile found, create a new one
          createProfile('New', 'Customer', '+9471000000', 'images/retrieve/default.jpg', '', userId).then(response => {
            if (response.ok) {
              const profile = response.profile;
              localStorage.setItem('profile',JSON.stringify(profile));
              setFirstName(profile.firstName);
              setLastName(profile.lastName);
              setPhoneNumber(profile.phoneNumber);
              setBio(profile.bio);
              setProfilePicture(apiUrl + profile.profilePicture);
            }
          });
        }
      });
    }
  }, [userId,getValue("profile")]);

  const handleEditProfileClick = () => {
    setValue('profileEdit', !getValue('profileEdit'));
  };

  const handleProfilePictureClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      uploadImage(file).then(response => {
        if (response.ok) {
          const uploadedFilename = response.uploadedFilename;
          const uploadFileUrl = 'images/retrieve/'+uploadedFilename;
          setProfilePicture(apiUrl + uploadFileUrl);
          // Update profile picture in database
          getFirstProfileByUserId(userId).then(response => {
            if (response.ok) {
              const profileId = response.profile.id;
              updateProfile(profileId, userId, firstName, lastName, phoneNumber, uploadFileUrl, bio).then(response => {
                if (response.ok) {
                  const profile = response.profile;
                  setValue('profile',JSON.stringify(profile));
                  localStorage.setItem('profile',JSON.stringify(profile));
                  console.log('Profile picture updated successfully');
                } else {
                  console.log('Error updating profile picture');
                }
              });
            } else {
              // If no profile found, create a new one
              createProfile(firstName, lastName, phoneNumber, uploadFileUrl, bio, userId).then(response => {
                if (response.ok) {
                  const profile = response.profile;
                  setValue('profile',JSON.stringify(profile));
                  localStorage.setItem('profile',JSON.stringify(profile));
                  console.log('Profile created successfully');
                } else {
                  console.log('Error creating profile');
                }
              });
            }
          });
        }
      });
    };
    fileInput.click();
  };

  return (
    <div className="col-sm-12">
      <div
        className="profile-bg-picture"
        style={{ backgroundImage: `url(${bgProfile})` }}
      >
        <span className="picture-bg-overlay"></span>
        {/* overlay */}
      </div>
      {/* meta */}
      <div className="profile-user-box">
        <div className="row">
          <div className="col-sm-6">
            <div className="profile-user-img">
              <img
                src={profilePicture} // use the state to display the selected image
                alt=""
                className="avatar-lg rounded-circle"
                onClick={handleProfilePictureClick} // add an onClick event to the image
              />
            </div>
            <div className="">
              <h4 className="mt-4 fs-17 ellipsis">{firstName} {lastName}</h4>
              <p className="font-13">{bio}</p>
              <p className="text-muted mb-0">
                <small>{phoneNumber}</small>
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="d-flex justify-content-end align-items-center gap-2">
              <button
                type="button"
                className="btn btn-soft-danger"
                onClick={handleEditProfileClick}
              >
                <i className="ri-settings-2-line align-text-bottom me-1 fs-16 lh-1"></i>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*/ meta */}
    </div>
  );
};

export default ProfileSummaryCard;