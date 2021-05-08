import React, { useState } from 'react';
import { Dropdown, Header, Icon, Input, Menu } from 'semantic-ui-react';
import { ObjavaOglasa } from '../../components/modals/addAdd';

// TODO Style and adjust it
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');
  const handleItemClick = (name: string) => setActiveItem(name);
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
      <Menu.Item>
        <ObjavaOglasa />
      </Menu.Item>

      <Menu.Item>
        Home
        <Menu.Menu>
          <Menu.Item
            name="search"
            active={activeItem === 'search'}
            onClick={() => handleItemClick('search')}
          >
            Search
          </Menu.Item>
          <Menu.Item
            name="add"
            active={activeItem === 'add'}
            onClick={() => handleItemClick('add')}
          >
            Add
          </Menu.Item>
          <Menu.Item
            name="about"
            active={activeItem === 'about'}
            onClick={() => handleItemClick('about')}
          >
            Remove
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item
        name="browse"
        active={activeItem === 'browse'}
        onClick={() => handleItemClick('browse')}
      >
        <Icon name="grid layout" />
        Browse
      </Menu.Item>
      <Menu.Item
        name="messages"
        active={activeItem === 'messages'}
        onClick={() => handleItemClick('messages')}
      >
        Messages
      </Menu.Item>

      <Dropdown item text="More">
        <Dropdown.Menu>
          <Dropdown.Item icon="edit" text="Edit Profile" />
          <Dropdown.Item icon="globe" text="Choose Language" />
          <Dropdown.Item icon="settings" text="Account Settings" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default Sidebar;
