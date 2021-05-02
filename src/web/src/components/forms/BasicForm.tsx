import React, { useState } from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { UserTypeEnum } from '../../shared/Enums';
import { setAccessToken } from '../../shared/AccessToken';
import { request } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';

interface BasicFormProps {
  userType: UserTypeEnum;
  nextStep: () => void;
}

interface BasicForm {
  name: string;
  email: string;
  password: string;
  gsm?: string;
  userType: UserTypeEnum;
}

export const BasicForm: React.FC<BasicFormProps> = ({ userType, nextStep }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      gsm: '',
      userType,
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await request.post(`/register`, values);
        const { accessToken } = response.data;
        if (accessToken) {
          setAccessToken(accessToken);
          successToast("User succesfully registered! 🤗");
          nextStep();
        }
      } catch (e) {
        console.log(e);
        errorToast();
      }
      setLoading(false);
    },
  });
  return (
    <Form
      onSubmit={formik.handleSubmit}
      size="large"
      unstackable
      loading={loading}
    >
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
          fluid
          placeholder="Email address"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Form.Input
          placeholder="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
        />
      </Form.Field>
      <Form.Field inline>
        <label>GSM</label>
        <Form.Input
          placeholder="GSM"
          type="tel"
          pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
          name="gsm"
          value={formik.values.gsm}
          onChange={formik.handleChange}
        />
        <Label pointing="above">
          GSM field is optional and will never be publicly visible. It will only
          be shared with users that you agree to have a walk with.
        </Label>
      </Form.Field>
      <Button type="submit" size="huge" primary>
        Register
      </Button>
    </Form>
  );
};
