import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import {
  IProfile,
  ProfileContext,
} from '../../pages/Profile/context/ProfileContext';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';

interface EditProfileModalProps {
  profile: IProfile;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useContext(ProfileContext);
  const initValues = {
    name: profile.Ime_uporabnik,
    email: profile.Email,
    GSM: profile.GSM ?? '',
  };

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => console.log(values), // not used
  });

  const handleSubmit = async () => {
    setLoading(true);
    if (!formik.dirty) {
      successToast('No changes were made to the profile');
      setLoading(false)
      setOpen(false);
    }

    try {
      console.log(formik.values);
      const authRequest = getAuthRequest();
      const response = await authRequest.put('profile/update', formik.values);

      if (response.status === 200) {
        successToast('Profile successfully updated');
        updateProfile();
        setLoading(false)
        setOpen(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false)
      errorToast();
    }
  };

  const handleReset = () => {
    formik.setValues(initValues);
  };

  return (
    <Modal
      closeIcon
      closeOnEscape
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="yellow">
          <Icon name="edit" /> Edit profile information
        </Button>
      }
    >
      <Modal.Header>
        <Icon name="user" />
        Edit profile
      </Modal.Header>
      <Modal.Content>
        <Header>Update user information you want to change</Header>
        <Form size="huge" loading={loading}>
          <Form.Field>
            <label>Name</label>
            <Form.Input
              placeholder="First Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Form.Input
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>GSM</label>
            <Form.Input
              placeholder="GSM"
              name="GSM"
              value={formik.values.GSM}
              onChange={formik.handleChange}
              required
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          content="Discard changes"
          labelPosition="right"
          icon="repeat"
          onClick={() => handleReset()}
          color="black"
        />
        <Button
          type="submit"
          content="Confirm changes"
          labelPosition="right"
          icon="arrow alternate circle right"
          onClick={() => handleSubmit()}
          color="green"
        />
      </Modal.Actions>
    </Modal>
  );
};
