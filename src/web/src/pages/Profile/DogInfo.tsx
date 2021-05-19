import React from 'react';
import { Divider, Header, Icon, Table } from 'semantic-ui-react';
import { AddDogModal } from '../../components/modals/AddDogModal';
import { RemoveDogModal } from '../../components/modals/RemoveDogModal';
import { IDog, IProfile } from './context/ProfileContext';

interface DogInfoProps {
  profile?: IProfile;
}

export const DogInfo: React.FC<DogInfoProps> = ({ profile }) => {
  if (!profile) {
    return <div>...</div>;
  }

  const showDeleteDogBtn = profile.dogs.length > 1;

  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="paw" />
          Dogs
        </Header>
      </Divider>
      {profile.dogs.map((dog: IDog) => {
        return (
          <Table definition key={dog.Ime_pes}>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={4}>Dog name</Table.Cell>
                <Table.Cell>{dog.Ime_pes}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Breed</Table.Cell>
                <Table.Cell>{dog.Pasma_ime}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Temperament</Table.Cell>
                <Table.Cell>{dog.Temperament}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Height (in cm)</Table.Cell>
                <Table.Cell>{dog.Visina}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Weight (in kg)</Table.Cell>
                <Table.Cell>{dog.Teza}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        );
      })}

      <AddDogModal />
      {showDeleteDogBtn && <RemoveDogModal dogs={profile.dogs} />}
    </>
  );
};
