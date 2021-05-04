import { useFormik } from 'formik';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { setAccessToken } from '../../shared/AccessToken';
import { request } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import styles from './login.module.css';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await request.post('/login', values);
        if (response.status == 200) {
          const { accessToken } = response.data;
          setAccessToken(accessToken);
          successToast();
          history.push('/');
        }
      } catch (e) {
        const { message } = e.response.data;
        console.error(e.response.status)
        errorToast(message);
      }
      setLoading(false);
    },

  });

  return (
    <Grid
      centered
      className={styles.login_container}
      verticalAlign="middle"
      textAlign="center"
      container
    >
      <Grid.Column>
        <Header as="h1" textAlign="center">
          Login to DogWalkers app🐕
        </Header>
        <Segment raised padded="very">
          <Form
            onSubmit={formik.submitForm}
            size="huge"
            unstackable
            loading={loading}
            className={styles.login_form}
          >
            <Form.Field>
              <label>Email</label>
              <Form.Input
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
            <Button type="submit" size="huge" primary fluid>
              Login
            </Button>
          </Form>
          <div className={styles.register_wrapper}>
            <span
              className={styles.register_CTA}
              onClick={() => history.push('/register')}
            >
              Register
            </span>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
