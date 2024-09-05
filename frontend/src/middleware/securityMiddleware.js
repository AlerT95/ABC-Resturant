export const barrier = (setValue, navigate) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.userType === 'customer' && userData.status === 'verified') {
        setValue('userType', 'customer');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 3000);
      } else if (userData.userType === 'admin' && userData.status === 'verified') {
        setValue('userType', 'admin');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 3000);
      }  else if (userData.userType === 'staff' && userData.status === 'verified') {
        setValue('userType', 'staff');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 3000);
      }else if (userData.status === 'unverified') {
        setTimeout(() => {
          navigate('/verification', { replace: true });
        }, 3000);
      }
    }
  };