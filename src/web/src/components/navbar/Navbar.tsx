import { useState } from 'react';
import styles from './navbar.module.css';
import { clearUserInfo, getUser } from '../../shared/UserInformation';
import { NavLink, useHistory } from 'react-router-dom';
import { removeToken } from '../../shared/AccessToken';
import { request } from '../../shared/http';

const MenuItems = [
  {
    name: 'Home',
    url: '/register',
    icon: 'link large home icon',
    userID: -1,
  },
  {
    name: 'My dogs',
    url: '#',
    icon: 'link large clone outline icon',
    userID: 2,
  },
  {
    name: 'My ads',
    url: '#',
    icon: 'link large clone outline icon',
    userID: 1,
  },
  {
    name: 'My walks',
    url: '#',
    icon: 'link large map outline icon',
    userID: -1,
  },
  {
    name: 'Settings',
    url: '#',
    icon: 'link large cog icon',
    userID: -1,
  },
];

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const user = getUser();
  const history = useHistory();

  const handleLogout =  async () => {
    // first remove information on client
    clearUserInfo();
    removeToken();
    // Clear the server auth data
    await request.post('logout')
    // redirect to / -> should auto redirect to login
    history.replace('/');
  };

  return (
    <nav className={styles.NavbarItems}>
      <a href="/">
        <img className={styles.logo_picture} src="../../../Logo192.png" />
      </a>
      <div className={styles.menu_opener}>
        <i
          aria-hidden="true"
          className={clicked ? 'angle up icon' : 'bars large icon'}
        ></i>
      </div>
      <ul className={styles.menu}>
        {MenuItems.map((item, index) => {
          if (item.userID === -1 || item.userID === user.userType) {
            return (
              <li key={index}>
                <NavLink exact className={styles.nav_links} to={item.url}>
                  <div className={styles.item_icon}>
                    <i aria-hidden="true" className={item.icon}></i>
                  </div>
                  <div className={styles.item_text}>{item.name}</div>
                </NavLink>
              </li>
            );
          }
        })}
        {/* Logout link */}
        <li>
          <div className={styles.nav_links} onClick={handleLogout}>
            <div className={styles.item_icon}>
              <i aria-hidden="true" className={'link large log out icon'}></i>
            </div>
            <div className={styles.item_text}>Logout</div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
