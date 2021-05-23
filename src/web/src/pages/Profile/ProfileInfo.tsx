import React from 'react';
import { Divider, Header, Icon, Table } from 'semantic-ui-react';
import { Loader } from '../../components/Loader';
import { EditProfileModal } from '../../components/modals/EditProfileModal';
import { handleDate } from '../../shared/utils';
import { IProfile } from './context/ProfileContext';

interface ProfileInfoProps {
  profile?: IProfile;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
  const userType = (t: number) => {
    switch (t) {
      case 1:
        return 'Walker';
      case 2:
        return 'Owner';
      case 3:
        return 'Admin';
    }
  };

  if (!profile) {
    return <Loader />;
  }

  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="info circle" />
          Profile information
        </Header>
      </Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}>Username</Table.Cell>
            <Table.Cell>{profile.Ime_uporabnik}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>{profile.Email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>User type</Table.Cell>
            <Table.Cell>{userType(profile.Tip)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>GSM</Table.Cell>
            <Table.Cell>{profile.GSM ?? 'Not given'}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Joined DogWalkers at</Table.Cell>
            <Table.Cell>{handleDate(profile.DatumUstvaritve ?? '')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <EditProfileModal profile={profile} />
    </>
  );
};
