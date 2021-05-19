import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react';
import { ProfileContext } from '../../pages/Profile/context/ProfileContext';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import { DogForm } from '../forms/DogForm';

interface RemoveDogModalProps {
  dogs: any[];
}

type DogListItem = {
  key: string;
  text: string;
  value: number;
};

export const RemoveDogModal: React.FC<RemoveDogModalProps> = ({ dogs }) => {
  const [open, setOpen] = useState(false);
  const [dogId, setDogId] = useState<null | number>(null);
  const [dogList, setDogList] = useState<DogListItem[]>([]);
  const { updateProfile } = useContext(ProfileContext);

  useEffect(() => {
    let d: DogListItem[] = [];
    dogs.map((dog) => {
      const Dog: DogListItem = {
        key: dog.Ime_pes,
        text: dog.Ime_pes,
        value: dog.ID_pes,
      };
      d.push(Dog);
    });
    setDogList(d);
  }, []);

  const handleDeletion = async () => {
    try {
      if (dogId === null) {
        errorToast('Choose a dog you want to remove');
        return;
      }
      const authRequest = getAuthRequest();
      const response = await authRequest.post('/dogs/delete', { dogId });
      if (response.status === 200) {
        successToast();
        updateProfile()
        setOpen(false);
      }
    } catch (e) {
      errorToast();
    }
  };

  return (
    <Modal
      closeIcon
      closeOnEscape
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="red">
          <Icon name="delete" /> Remove dog
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
          onClick={handleDeletion}
          color="red"
        />
      </Modal.Actions>
    </Modal>
  );
};
