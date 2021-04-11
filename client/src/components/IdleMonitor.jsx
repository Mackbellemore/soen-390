import IdleTimer from 'react-idle-timer';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { observer } from 'mobx-react-lite';

const IdleMonitor = () => {
  const history = useHistory();
  const { userStore } = useContext(RootStoreContext);

  const handleOnIdle = () => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!userStore.loggedIn) return;

    history.push('/bye');
    localStorage.setItem('jwt', '');
    userStore.logOut();
  };

  return <IdleTimer timeout={1000 * 60 * 5} onIdle={handleOnIdle} debounce={500} />;
};

export default observer(IdleMonitor);
