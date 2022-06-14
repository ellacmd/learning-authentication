import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctx = useContext(AuthContext)
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            { !ctx.isLoggedIn && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            { ctx.isLoggedIn && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
           {ctx.isLoggedIn && <button onClick={ctx.logout}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
