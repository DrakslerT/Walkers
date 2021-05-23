import React from 'react';
import { Divider, Header, Icon, Table } from 'semantic-ui-react';
import { Loader } from '../../components/Loader';
import { AddDogModal } from '../../components/modals/AddDogModal';
import { RemoveDogModal } from '../../components/modals/RemoveDogModal';
import { IDog, IProfile } from './context/ProfileContext';

interface DogInfoProps {
  profile?: IProfile;
}

export const DogInfo: React.FC<DogInfoProps> = ({ profile }) => {
  if (!profile) {
    return <Loader />;
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
                <Table.Cell width={4}>Dog gender</Table.Cell>
                <Table.Cell>
                  {dog.Spol === 0 ? (
                    <>
                      <Icon name="mars" /> Male
                    </>
                  ) : (
                    <>
                      <Icon name="venus" /> Female
                    </>
                  )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Breed</Table.Cell>
                <Table.Cell>{dog.breed.Pasma_ime}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Temperament</Table.Cell>
                <Table.Cell>{dog.breed.Temperament}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Height (in cm)</Table.Cell>
                <Table.Cell>{dog.breed.Visina}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Weight (in kg)</Table.Cell>
                <Table.Cell>{dog.breed.Teza}</Table.Cell>
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
