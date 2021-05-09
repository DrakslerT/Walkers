import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import DateTimePicker from 'react-datetime-picker';

interface ObjavaOglasaProps {}

interface Pasma {
  value: number;
  text: string;
  key: string;
}

export const ObjavaOglasa: React.FC<ObjavaOglasaProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [lokacija, setLokacija] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pasma, setPasma] = useState(2);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = { lokacija, startDate, endDate, pasma };
    try {
      const authRequest = getAuthRequest();
      const response = await authRequest.post('/addAdd', payload);
      if (response.status == 200) {
        successToast();
        setOpen(false);
      }
    } catch (e) {
      errorToast();
      console.error(e.response.status);
    }
    setLoading(false);
  };

  let pasme: Pasma[] = [
    { value: 1, text: 'Samoyed', key: 'S' },
    { value: 2, text: 'German sheppard', key: 'G' },
    { value: 3, text: 'Terier', key: 'T' },
  ];

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button primary>Add new</Button>}
    >
      <Modal.Header>Dodajanje oglasa</Modal.Header>
      {loading ? (
        <Modal.Content>loading...</Modal.Content>
      ) : (
        <>
          <Modal.Content>
            <Modal.Description>
              <label>Lokacija</label>
              <Form.Input
                placeholder="Lokacija"
                name="lokacija"
                type="text"
                onChange={(e) => setLokacija(e.target.value)}
                required
              />
              <br />
              <div>
                <label>Start time:</label>
                <br />
                <DateTimePicker
                  onChange={setStartDate}
                  value={startDate}
                  disableClock={true}
                  key="start"
                />
              </div>
              <br />
              <div>
                <label>End time:</label>
                <br />
                <DateTimePicker
                  onChange={setEndDate}
                  value={endDate}
                  disableClock={true}
                  key="end"
                />
              </div>
              <br />
              <div>
                <label>Breed:</label>
                <br />
                <Form.Select
                  options={pasme}
                  name="pasma"
                  onChange={(e, data) => {
                  if (typeof data.value === 'number') {
                    setPasma(data.value)
                  }}}
                />
              </div>
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
              onClick={handleSubmit}
              positive
            />
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};
