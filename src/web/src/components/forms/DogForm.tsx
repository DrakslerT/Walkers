import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import styles from './forms.module.css';

interface Pasma {
  value: number;
  text: string;
  key: string;
}

interface DogFormProps {
  nextStep: () => void;
}

export const DogForm: React.FC<DogFormProps> = ({ nextStep }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      gender: 'male',
      breed: 0,
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const authRequest = getAuthRequest();
        const response = await authRequest.post('/dogs/add', values);
        if (response.status === 200) {
          successToast();
          nextStep();
        }
      } catch (e) {
        errorToast();
        console.log(e);
      }
      setLoading(false);
    },
  });

  let pasme: Pasma[] = [
    { value: 1, text: 'Samoyed', key: 'S' },
    { value: 2, text: 'German sheppard', key: 'G' },
    { value: 3, text: 'Terier', key: 'T' },
  ];

  // TODO Fetch pasme on load
  // useEffect(() => {
  // }, [])

  return (
    <Form
      onSubmit={formik.handleSubmit}
      size="huge"
      unstackable
      loading={loading}
    >
      <Form.Field>
        <label>Dog name</label>
        <Form.Input
          placeholder="Dogs name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
        />
      </Form.Field>
      <Form.Field>
        <label>Dog gender</label>
        <div className={styles.row}>
          <div className={styles.radio}>
            <input
              required
              name="gender"
              value="male"
              type="radio"
              onChange={formik.handleChange}
            />
            <label className={styles.radioLabel} htmlFor="male">
              Male
            </label>
          </div>
          <div className={styles.radio}>
            <input
              name="gender"
              value="female"
              type="radio"
              onChange={formik.handleChange}
            />
            <label className={styles.radioLabel} htmlFor="female">
              Female
            </label>
          </div>
        </div>
      </Form.Field>
      <Form.Field>
        <label>Breed</label>
        <Form.Select
          options={pasme}
          name="pasma"
          onChange={(e, data) => {
            if (typeof data.value === 'number') {
              formik.values.breed = data.value;
            }
          }}
        />
      </Form.Field>
      <Button type="submit" size="huge" primary>
        Add dog
      </Button>
    </Form>
  );
};
