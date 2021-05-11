import { useState } from 'react';
import styles from './navbar.module.css';
import { getUser } from '../../shared/UserInformation';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

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
  {
    name: 'Log out',
    url: '/',
    icon: 'link large log out icon',
    userID: -1,
  },
];

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const history = useHistory();
  const user = getUser();
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
      </ul>
    </nav>
  );
};

export default Navbar;
