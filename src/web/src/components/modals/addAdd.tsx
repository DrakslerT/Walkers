import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import DateTimePicker from 'react-datetime-picker';

interface ObjavaOglasaProps {}

export const ObjavaOglasa: React.FC<ObjavaOglasaProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      lokacija: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const Payload = {...values, startDate, endDate}
      console.log(Payload)
      try {
        const authRequest = getAuthRequest();
        const response = await authRequest.post('/addAdd', Payload);
        if (response.status == 200) {
          successToast();
        }
      } catch (e) {
        errorToast();
        console.error(e.response.status)
      }
      setLoading(false);
    },

  })
  return (    
    <Modal
      as={Form} 
      onSubmit={formik.submitForm}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Objava oglasa</Button>}
    >
      <Modal.Header>Dodajanje oglasa</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form.Field>
            <label>Lokacija</label>
            <Form.Input
              placeholder="Lokacija"
              name="lokacija"
              type="lokacija"
              value={formik.values.lokacija}
              onChange={formik.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
          <label>Čas začetka:</label>
            <DateTimePicker
              onChange={setStartDate}
              value={startDate}
              disableClock={true}
            />
          </Form.Field>
          <Form.Field>
          <label>Čas konca:</label>
            <DateTimePicker
              onChange={setEndDate}
              value={endDate}
              disableClock={true}
            />
          </Form.Field>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Zavrzi
        </Button>
        <Button
          type="submit"
          content="Potrdi"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(true)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
};
