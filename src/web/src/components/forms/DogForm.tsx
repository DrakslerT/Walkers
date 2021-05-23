import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import { BreedDropdown } from './BreedDropdown';
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
  const [breed, setBreed] = useState<number | undefined>(undefined);
  const formik = useFormik({
    initialValues: {
      name: '',
      gender: 'male',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const authRequest = getAuthRequest();
        const payload = { ...values, breed };
        const response = await authRequest.post('/dogs/add', payload);
        if (response.status === 200) {
          successToast();
          nextStep();
        }
      } catch (e) {
        errorToast();
        console.error(e.response.data);
      }
      setLoading(false);
    },
  });

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
        <BreedDropdown emitBreed={setBreed} />
      </Form.Field>
      <Button type="submit" size="huge" primary>
        Add dog
      </Button>
    </Form>
  );
};
