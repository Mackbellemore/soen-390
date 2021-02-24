import { useEffect, useContext, useCallback, useRef } from 'react';
import { RootStoreContext } from 'stores/stores.jsx';
import { useCookies } from 'react-cookie';
import { userAuthCheck } from 'utils/api/users.js';

/*
On certain occasions, this hook maybe cause a slight memory leak when the component using this hook
has unmounted but the async call still runs.
I tried to make it better using a useRef to check if the hook is mounted
and to skip the verifyToken call if the component is not mounted.
 */
const useLoggedInUser = () => {
  const { userStore } = useContext(RootStoreContext);
  const [cookies, setCookie, removeCookie] = useCookies(['hasLoggedOut']);
  const _isMounted = useRef(true);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const verifyToken = useCallback(async () => {
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
  }, [removeCookie, setCookie, userStore]);

  useEffect(() => {
    if (cookies.hasLoggedOut === undefined && _isMounted.current) {
      verifyToken();
    }
  }, [cookies.hasLoggedOut, verifyToken]);

  return { verifyToken };
};

export default useLoggedInUser;
