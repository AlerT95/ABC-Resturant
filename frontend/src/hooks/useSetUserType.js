import { useState, useEffect,useContext } from 'react';
import { UniversalContext } from '../context/UniversalContext';
const useSetUserType = () => {
  const [userType, setUserType] = useState(null);
  const {setValue } = useContext(UniversalContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.userType === 'customer') {
        setValue('userType', 'customer');
        setUserType('customer');
      } else if (userData.userType === 'admin') {
        setValue('userType', 'admin');
        setUserType('admin');
      }
    }
  }, []);

  return userType;
};

export default useSetUserType;