import { useEffect, useContext, useRef, useState } from 'react';
import { RootStoreContext } from 'stores/stores.jsx';
import { userAuthCheck } from 'utils/api/users.js';

const useLoggedInUser = () => {
  const { userStore } = useContext(RootStoreContext);
  const isMounted = useRef(true);
  const [isCheckDone, setIsCheckDone] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await userAuthCheck();
        const { username, email, role } = res.data;

        userStore.setUsername(username);
        userStore.setEmail(email);
        userStore.setRole(role);
        userStore.logIn();
      } catch (err) {
        userStore.logOut();
        localStorage.setItem('jwt', '');
      }

      if (isMounted.current) {
        setIsCheckDone(true);
      }
    };

    if (!localStorage.getItem('jwt') && isMounted.current) {
      setIsCheckDone(true);
      return;
    }

    if (isMounted.current) {
      verifyToken();
    }
  }, [userStore]);

  return { isCheckDone };
};

export default useLoggedInUser;
