import React, { useContext, useEffect } from 'react';
import { Header, Icon, Loader, Segment } from 'semantic-ui-react';
import { getUser } from '../../shared/UserInformation';
import { ProfileContext } from './context/ProfileContext';
import { DogInfo } from './DogInfo';
import { ProfileInfo } from './ProfileInfo';
import { WalkerStats } from './WalkerStats';

export const Settings: React.FC = () => {
  const user = getUser();
  const { profile, isFetching, updateProfile } = useContext(ProfileContext);

  useEffect(() => {
    updateProfile();
  }, []);

  /** Display DogInfo if owner, else walker stats (rating, avg response etc..) */
  const displayInfo = () => {
    if (user.userType === 2) {
      return (
        <>
          <ProfileInfo profile={profile} />
          <DogInfo profile={profile} />
        </>
      );
    }
    return (
      <>
        <ProfileInfo profile={profile} />
        <WalkerStats profile={profile} />
      </>
    );
  };
  return (
    <>
      <Header as="h1" attached="top">
        <Icon name="user circle" />
        <Header.Content>Profile settings</Header.Content>
      </Header>
      <Segment attached padded="very">
        {isFetching && profile === null ? (
          <Loader msg="Fetching user information..." />
        ) : (
          displayInfo()
        )}
      </Segment>
    </>
  );
};
