import React, { useState } from 'react';
import { Header, Icon, Menu, Form } from 'semantic-ui-react';
import { ObjavaOglasa } from '../../components/modals/addAdd';
import { getUser } from '../../shared/UserInformation';
import Filter from './Filter';
import styles from './Iskalnik.module.css';

// TODO Style and adjust it
const Sidebar = () => {
  const user = getUser();
  return (
    <Menu
      vertical
      stackable
      style={{ height: '100vh', width: '100%' }}
      color="blue"
    >
      <Header as="h1" style={{ padding: '10px' }} textAlign="center">
        🐕 DogWalkers 🐕
      </Header>
      {user.userType === 1 && (
        <Menu.Item>
          <ObjavaOglasa />
        </Menu.Item>
      )}
      <Menu.Item>
        <Filter />
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
