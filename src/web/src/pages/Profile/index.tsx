import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from '../../components/navbar/Navbar';
import { ProfileContextProvider } from './context/ProfileContext';
import styles from './Profile.module.css';
import { Settings } from './Settings';

export const ProfilePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <ProfileContextProvider>
        <Container textAlign="left" className={styles.align_container}>
          <Settings />
        </Container>
      </ProfileContextProvider>
    </>
  );
};
