import styles from './Iskalnik.module.css';
import {
  Button,
  Checkbox,
  Form,
  Header,
  Icon,
  Select,
} from 'semantic-ui-react';
import { useFormik } from 'formik';
import { getAuthRequest } from '../../shared/http';
import { useState } from 'react';
// import React, { useState } from 'react';
// import DateTimePicker from 'react-datetime-picker';

const avgTimeOptions = [
  { key: 'd', text: 'Daily', value: 7 },
  { key: '3d', text: 'Less than 3 days', value: 5 },
  { key: 'w', text: 'Weekly', value: 3 },
  { key: 'o', text: 'Other', value: 1 },
];

const Filter = () => {
  // const [when, setWhen] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      0: '', // name
      1: '', // pasma
      2: 1, // odzivniCas
      3: '', // lokacija
      4: '', // ocena
      5: false, // priljubljeni
      6: false, // izkušeni
    },
    onSubmit: async (values) => {
      setLoading(false);
      let queryString = `?0=${values[0]}&1=${values[1]}&2=${values[2]}&3=${values[3]}&4=${values[4]}`;
      if (values[5]) {
        queryString += `&5=${formik.values[5] ?? 'true'}`;
      }
      if (values[6]) {
        queryString += `&6=${formik.values[6] ?? 'true'}`;
      }
      const authRequest = getAuthRequest();
      const response = await authRequest(`/oglas/getOglasi${queryString}`);
      setLoading(false);
      console.log(response.data);
    },
  });

  return (
    <>
      <span className={styles.horizontal_container}>
        <Header as="h1" content="Filter" />
        <Icon name="filter" size="large" />
      </span>
      <hr />
      <Header as="h3">Search by:</Header>
      {/* <label>When?</label>
      <br />
      <DateTimePicker value={when} onChange={setWhen} /> */}

      <Form
        className={styles.filter_form}
        onSubmit={formik.handleSubmit}
        loading={loading}
      >
        <Form.Field>
          <label>Walker's name</label>
          <Form.Input
            type="text"
            fluid
            placeholder="John"
            name="0"
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <Form.Input
            type="text"
            fluid
            placeholder="eg. Ljubljana"
            name="3"
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Minumum rating</label>
          <Form.Input
            type="number"
            fluid
            placeholder="John"
            name="4"
            min="0"
            max="5"
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Checkbox
          label={<label>Only my favourites walkers</label>}
          name="5"
          onChange={(e, data) => {
            if (typeof data.checked === 'boolean') {
              formik.values[5] = data.checked;
            }
          }}
        />
        <Form.Checkbox
          label={<label>Only expirienced walkers</label>}
          name="6"
          onChange={(e, data) => {
            if (typeof data.checked === 'boolean') {
              formik.values[6] = data.checked;
            }
          }}
        />
        <Form.Select
          label="Average response time"
          options={avgTimeOptions}
          placeholder="eg. Daily"
          onChange={(e, data) => {
            if (typeof data.value === 'number') {
              formik.values[2] = data.value;
            }
          }}
        />
        <Button
          type="submit"
          size="small"
          icon
          labelPosition="left"
          fluid
          primary
        >
          Filter
          <Icon name="search" />
        </Button>
        <br />
        <Button
          type="submit"
          size="small"
          icon
          labelPosition="left"
          fluid
          secondary
        >
          Reset
          <Icon name="repeat" />
        </Button>
      </Form>
    </>
  );
};

export default Filter;
