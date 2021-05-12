import { Header, Icon, Menu } from 'semantic-ui-react';
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
      {user.userType === 1 && (
        <Menu.Item>
          <span className={styles.horizontal_container}>
            <Header as="h1" content="Actions" />
            <Icon name="tasks" size="large" />
          </span>
          <hr />
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
