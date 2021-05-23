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
  const [passwordChange, togglePasswordChange] = useState(false);
  const { updateProfile } = useContext(ProfileContext);
  const initValues = {
    name: profile.Ime_uporabnik,
    email: profile.Email,
    GSM: profile.GSM ?? '',
  };

  const formikEdit = useFormik({
    initialValues: initValues,
    onSubmit: (values) => console.log(values), // not used
  });

  const formikPass = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: (values) => console.log(values),
  }); // not used )

  const handleSubmit = async () => {
    if (!passwordChange) {
      await submitEditProfileForm();
    } else {
      await submitChangePassword();
    }
  };

  const submitEditProfileForm = async () => {
    setLoading(true);
    if (!formikEdit.dirty) {
      successToast('No changes were made to the profile ✔️');
      setLoading(false);
      setOpen(false);
    }

    try {
      const authRequest = getAuthRequest();
      const response = await authRequest.put(
        'profile/update',
        formikEdit.values
      );

      if (response.status === 200) {
        successToast('Profile successfully updated ✔️');
        updateProfile();
        handleReset();
        setLoading(false);
        setOpen(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      errorToast();
    }
  };

  const submitChangePassword = async () => {
    setLoading(true);

    if (!formikPass.dirty) {
      successToast('No changes were made to the profile ✔️');
      setLoading(false);
      setOpen(false);
      return;
    }

    if (formikPass.values.newPassword !== formikPass.values.confirmPassword) {
      errorToast('New passwords do not match 🥺');
      setLoading(false);
      return;
    }

    if (formikPass.values.oldPassword === formikPass.values.newPassword) {
      errorToast('Old and new passwords are the same 😊');
      setLoading(false);
      return;
    }

    try {
      const authRequest = getAuthRequest();
      const response = await authRequest.put(
        'profile/password',
        formikPass.values
      );
      if (response.status === 200) {
        successToast('Password updated ✔️');
        handleReset();
        setLoading(false);
        setOpen(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorToast();
    }
    setLoading(false);
  };

  const handleReset = () => {
    formikEdit.setValues(initValues);
    formikPass.resetForm();
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
        <Header
          content={
            !passwordChange
              ? 'Update user information you want to change'
              : 'Reset your password'
          }
        />
        {!passwordChange ? (
          <Form size="huge" loading={loading}>
            <Form.Field>
              <label>Name</label>
              <Form.Input
                placeholder="First Name"
                name="name"
                value={formikEdit.values.name}
                onChange={formikEdit.handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                placeholder="Email"
                name="email"
                value={formikEdit.values.email}
                onChange={formikEdit.handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>GSM</label>
              <Form.Input
                placeholder="GSM"
                name="GSM"
                value={formikEdit.values.GSM}
                onChange={formikEdit.handleChange}
                required
              />
            </Form.Field>
          </Form>
        ) : (
          <Form size="huge" loading={loading}>
            <Form.Field>
              <label>Confirm your old password</label>
              <Form.Input
                placeholder="Old password"
                name="oldPassword"
                value={formikPass.values.oldPassword}
                onChange={formikPass.handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Enter new password</label>
              <Form.Input
                placeholder="Enter new password"
                name="newPassword"
                type="password"
                value={formikPass.values.newPassword}
                onChange={formikPass.handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Repeat your new password</label>
              <Form.Input
                placeholder="Confirm password"
                name="confirmPassword"
                type="password"
                value={formikPass.values.confirmPassword}
                onChange={formikPass.handleChange}
                required
              />
            </Form.Field>
          </Form>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          content={
            !passwordChange ? 'Change password' : 'Edit profile information'
          }
          labelPosition="right"
          icon={!passwordChange ? 'exclamation triangle' : 'edit'}
          onClick={() => togglePasswordChange(!passwordChange)}
          color={!passwordChange ? 'red' : 'yellow'}
          disabled={loading}
        ></Button>
        <Button
          type="reset"
          content="Discard changes"
          labelPosition="right"
          icon="repeat"
          onClick={() => handleReset()}
          color="black"
          disabled={loading}
        />
        <Button
          type="submit"
          content="Confirm changes"
          labelPosition="right"
          icon="arrow alternate circle right"
          onClick={() => handleSubmit()}
          color="green"
          disabled={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};
