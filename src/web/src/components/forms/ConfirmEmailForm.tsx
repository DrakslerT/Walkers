import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Header } from 'semantic-ui-react';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import { getUser } from '../../shared/UserInformation';
import styles from './forms.module.css';

export const ConfirmEmailForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const user = getUser();
  const authRequest = getAuthRequest();
  const history = useHistory();
  const formik = useFormik({
    initialValues: { ActivationCode: '' },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await authRequest.post('/activate_user', values);
        if (response.status === 200) {
          successToast('Account has been activated! 🎉');
          history.push('/');
        }
      } catch (e) {
        errorToast();
        console.error(e);
      }
      setLoading(false);
    },
  });

  const handleResendCode = async () => {
    if (resend) {
      errorToast('Only one resend is permitted! ⚠️');
      return;
    }
    try {
      const response = await authRequest.get('/resend_activation');
      successToast(response.data.message);
      setResend(true);
    } catch (e) {
      console.error(e);
      errorToast();
    }
  };

  return (
    <Form
      onSubmit={formik.handleSubmit}
      size="huge"
      loading={loading}
      widths="equal"
    >
      <Header
        as="h1"
        content="Activation code"
        textAlign="center"
        subheader={`Hey ${user.username}! We sent you an email with confirmation code. Please enter it here to activate your account`}
      />
      <Form.Field>
        <Form.Input
          icon="lock"
          placeholder="6 character code"
          name="ActivationCode"
          value={formik.values.ActivationCode}
          onChange={formik.handleChange}
          className={styles.text_centre}
          required
        />
      </Form.Field>
      <div className={styles.center_horizontal}>
        <Button type="submit" size="huge" primary>
          Activate
        </Button>
        <span className={styles.resend_confirmation} onClick={handleResendCode}>
          Resend the activation code
        </span>
      </div>
    </Form>
  );
};
