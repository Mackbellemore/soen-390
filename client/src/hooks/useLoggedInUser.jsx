import { useEffect, useContext, useRef, useState } from 'react';
import { RootStoreContext } from 'stores/stores.jsx';
import { useCookies } from 'react-cookie';
import { userAuthCheck } from 'utils/api/users.js';

const useLoggedInUser = () => {
  const { userStore } = useContext(RootStoreContext);
  const [cookies, setCookie, removeCookie] = useCookies(['hasLoggedOut']);
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
        const { username: resUsername, email: resEmail, role: resRole } = res.data;

        userStore.setUsername(resUsername);
        userStore.setEmail(resEmail);
        userStore.setRole(resRole);
        userStore.logIn();

        removeCookie('hasLoggedOut', { path: '/' });
      } catch (err) {
        userStore.logOut();

        setCookie('hasLoggedOut', true, { path: '/' });
      }

      if (isMounted.current) {
        setIsCheckDone(true);
      }
    };

    if (!localStorage.getItem('jwt')) {
      setIsCheckDone(true);
      return;
    }

    if (isMounted.current) {
      verifyToken();
    }
  }, [cookies.hasLoggedOut, removeCookie, setCookie, userStore]);

  return { isCheckDone };
};

export default useLoggedInUser;
