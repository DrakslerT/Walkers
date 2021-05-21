import React, { useContext, useState } from 'react';
import { Button, Modal, Form, Icon, Loader } from 'semantic-ui-react';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import DateTimePicker from 'react-datetime-picker';
import { AddsContext } from '../../pages/Iskalnik/context/AddsContext';

interface Pasma {
  value: number;
  text: string;
  key: string;
}

type addAdProps = {
  refetch?: () => Promise<void>;
};

export const ObjavaOglasa: React.FC<addAdProps> = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lokacija, setLokacija] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pasma, setPasma] = useState(2);
  const { updateAdds } = useContext(AddsContext);
  const handleSubmit = async () => {
    setLoading(true);
    const payload = { lokacija, startDate, endDate, pasma };
    if (lokacija === '') {
      errorToast('You must enter a location. Try again!');
      setOpen(false);
      return;
    }
    try {
      const authRequest = getAuthRequest();
      const response = await authRequest.post('/addAdd', payload);
      if (response.status === 200) {
        successToast();
        updateAdds();

        if (refetch) {
          refetch();
        }

        setOpen(false);
      }
    } catch (e) {
      errorToast(e.response.data.message + '🚦');
      console.error();
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
      trigger={
        <Button fluid icon labelPosition="left" color="green">
          Add new
          <Icon name="add" />
        </Button>
      }
    >
      <Modal.Header>Dodajanje oglasa</Modal.Header>
      {loading ? (
        <Modal.Content>
          <Loader />
        </Modal.Content>
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
                      setPasma(data.value);
                    }
                  }}
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
