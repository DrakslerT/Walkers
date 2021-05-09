import React, { Component }  from 'react';
import styles from './navbar.module.css';
import { RouteComponentProps } from 'react-router';
import { Icon } from 'semantic-ui-react';
import { getUser } from '../../shared/UserInformation';

const user=getUser();

const MenuItems = [
    {
        name: 'Home',
        url: '/',
        icon: 'link large home icon',
        userID: -1
    },
    {
        name: 'My dogs',
        url: '#',
        icon: 'link large clone outline icon',
        userID: 1
    },
    {
        name: 'My ads',
        url: '#',
        icon: 'link large clone outline icon',
        userID: 2
    },
    {
        name: 'My walks',
        url: '#',
        icon: 'link large map outline icon',
        userID: -1
    },
    {
        name: 'Settings',
        url: '#',
        icon: 'link large cog icon',
        userID: -1
    },
    {
        name: 'Log out',
        url: '/',
        icon: 'link large log out icon',
        userID: -1
    }
]

export default class Navbar extends Component {
    state = {
        clicked: false
    }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    
    render() {
        return (
            <nav className={styles.NavbarItems}>
                <a  href="/">
                    <img className={styles.logo_picture} src="../../../Logo192.png" />
                </a>
                <div className={styles.menu_opener}><i aria-hidden="true" className={this.state.clicked ? "angle up icon" : "bars large icon"}></i></div>
                <ul className={styles.menu}>
                    {MenuItems.map((item, index) => {
                        if (item.userID === -1) {
                            return (
                            <li key={index}>
                                <a className={styles.nav_links} href={item.url}>
                                    <div className={styles.item_icon}><i aria-hidden="true" className={item.icon}></i></div>
                                    <div className={styles.item_text}>{item.name}</div>
                                </a>
                            </li>
                        )}
                        if (user.userType === item.userID) {
                            return (
                            <li key={index}>
                                <a className={styles.nav_links} href={item.url}>
                                    <div className={styles.item_icon}><i aria-hidden="true" className={item.icon}></i></div>
                                    <div className={styles.item_text}>{item.name}</div>
                                </a>
                            </li>
                        )}
                    })}
                </ul>
            </nav>
        );
    }
}