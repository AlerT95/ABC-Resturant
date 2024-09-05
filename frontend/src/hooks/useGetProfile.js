import { useEffect, useContext } from 'react';
import { getFirstProfileByUserId, createProfile } from '../api/profileApi';
import { UniversalContext } from '../context/UniversalContext';

const useGetProfile = () => {
  const { setValue } = useContext(UniversalContext);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user).id;
      getFirstProfileByUserId(userId).then(response => {
        if (response.ok) {
          const profile = response.profile;
          localStorage.setItem('profile', JSON.stringify(profile));
          setValue("profile",profile);
        } else {
          // If no profile found, create a new one
          createProfile('New', 'Customer', 'please inser your profile details', '', '', userId).then(response => {
            if (response.ok) {
              const profile = response.profile;
              localStorage.setItem('profile', JSON.stringify(profile));
              setValue("profile",profile);
            }
          });
        }
      });
    }
  }, []);

};

export default useGetProfile;