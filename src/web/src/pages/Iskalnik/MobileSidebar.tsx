import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

// TODO probably for second release
const MobileSidebar = () => {
  return (
    <Sidebar
      as={Menu}
      animation={'push'}
      direction={'left'}
      icon="labeled"
      inverted
      vertical
      visible={true}
      width="thin"
    >
      <Menu.Item as="a">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="gamepad" />
        Games
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Channels
      </Menu.Item>
    </Sidebar>
  );
};

export default MobileSidebar;
