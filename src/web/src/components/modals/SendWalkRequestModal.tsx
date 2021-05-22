import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react';
import { Loader } from '../Loader'
import { ProfileContext } from '../../pages/Profile/context/ProfileContext';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import { IDog } from '../../pages/Profile/context/ProfileContext'

type DogListItem = {
  key: string;
  text: string;
  value: number;
};

type RequestModalProps = {
  oglasID : number
}

export const SendWalkRequestModal: React.FC<RequestModalProps> = ({ oglasID }) => {
  const [open, setOpen] = useState(false);
  const [dogId, setDogId] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);
  const [dogList, setDogList] = useState<DogListItem[]>([]);

  async function fetchDogs() {
      try {
        setLoading(true);
        const authRequest = getAuthRequest();
        const response = await authRequest.get('dogs/list');

        let d: DogListItem[] = [];
        response.data.map((dog: IDog) => {
          const Dog: DogListItem = {
            key: dog.Ime_pes,
            text: dog.Ime_pes,
            value: dog.ID_pes,
          }
          return d.push(Dog);
        });
        setDogList(d);

        setLoading(false);
      } catch (error) {
        console.error(error);
        errorToast();
        setLoading(false);
      }
  }

  async function handleOpenModal() {
    setOpen(true);
    if(dogList === []) {
      //await fetchDogs();
    }
  }

  if(dogList === [] || loading) {
    return <Loader/>
  }

  const sendWalkRequest = async () => {
    try {
      const authRequest = getAuthRequest();
      const response = await authRequest.post('/sendWalkRequest', {IDoglasa: oglasID, dogId: 1});
      if (response.status === 200) {
        successToast();
        setOpen(false);
      }
    } catch (e) {
      errorToast(e.response.data.message + '🚦');
      setOpen(false);
    }
  };

  return (
    <Modal
      closeIcon
      closeOnEscape
      onClose={() => setOpen(false)}
      onOpen={handleOpenModal}
      open={open}
      trigger={
        <Button 
        fluid positive
        onClick={handleOpenModal}
        >
          I'm interested
        </Button>
      }
    >
      <Modal.Header>
        <Icon name="paw" />
        We are sad to see your friend go 😢
      </Modal.Header>
      <Modal.Content>
        <Header>Choose a dog you want to remove</Header>
        <Dropdown
          placeholder="Select dog"
          fluid
          selection
          options={dogList}
          onChange={(e, data) => {
            if (typeof data.value === 'number') {
              setDogId(data.value);
            }
          }}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Confirm deletion"
          labelPosition="right"
          icon="delete"
          onClick={sendWalkRequest}
          color="green"
        />
      </Modal.Actions>
    </Modal>
  );
};
