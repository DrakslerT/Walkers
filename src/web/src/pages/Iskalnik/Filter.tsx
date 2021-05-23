import styles from './Iskalnik.module.css';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { AddsContext } from './context/AddsContext';
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
  const { updateAdds } = useContext(AddsContext);
  const formik = useFormik({
    initialValues: {
      name: '', // name
      breed: '', // pasma
      responseTime: 0, // odzivniCas
      location: '', // lokacija
      rating: '', // ocena
      favourites: false, // priljubljeni
      experienced: false, // izkušeni
    },
    onSubmit: async (values) => {
      if (!formik.dirty && !values.experienced && !values.favourites) {
        return updateAdds();
      }
      const query = new URLSearchParams();
      query.append('name', values.name);
      query.append('breed', values.breed);
      query.append('responseTime', values.responseTime.toString());
      query.append('location', values.location);
      query.append('rating', values.rating);
      query.append('favourites', values.favourites ? '1' : '');
      query.append('experienced', values.experienced ? '1' : '');

      const queryString = `?${query.toString()}`;

      updateAdds(queryString);
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

      <Form className={styles.filter_form} onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Walker's name</label>
          <Form.Input
            type="text"
            fluid
            placeholder="John"
            name="name"
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <Form.Input
            type="text"
            fluid
            placeholder="eg. Ljubljana"
            name="location"
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Minumum rating</label>
          <Form.Input
            type="number"
            fluid
            placeholder="0-5"
            name="rating"
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
              formik.values.favourites = data.checked;
            }
          }}
        />
        <Form.Checkbox
          label={<label>Only expirienced walkers</label>}
          name="6"
          onChange={(e, data) => {
            if (typeof data.checked === 'boolean') {
              formik.values.experienced = data.checked;
            }
          }}
        />
        <Form.Select
          label="Average response time"
          options={avgTimeOptions}
          placeholder="eg. Daily"
          onChange={(e, data) => {
            if (typeof data.value === 'number') {
              formik.values.responseTime = data.value;
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
          type="reset"
          size="small"
          icon
          labelPosition="left"
          fluid
          secondary
          onClick={() => {
            formik.resetForm();
            formik.values.favourites = false;
            formik.values.experienced = false;
          }}
        >
          Reset
          <Icon name="repeat" />
        </Button>
      </Form>
    </>
  );
};

export default Filter;
