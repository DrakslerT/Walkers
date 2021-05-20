import React, { useContext, useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { ProfileContext } from '../../pages/Profile/context/ProfileContext';
import { DogForm } from '../forms/DogForm';

export const AddDogModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const {updateProfile} = useContext(ProfileContext)

  const handleSubmit = () => {
    updateProfile()
    setOpen(false)
  }

  return (
    <Modal
      closeIcon
      closeOnEscape
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="green">
          <Icon name="plus" /> Add new dog
        </Button>
      }
    >
      <Modal.Header>
        <Icon name="paw" />
        Add your 🐶
      </Modal.Header>
      <Modal.Content>
        <Header>Fill out your best friend information</Header>
        <DogForm nextStep={handleSubmit} />
      </Modal.Content>
    </Modal>
  );
};
