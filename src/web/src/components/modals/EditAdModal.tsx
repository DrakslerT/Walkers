import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Icon, Label, Modal } from 'semantic-ui-react';
import { IAd } from '../../pages/MyAds/index';
import DateTimePicker from 'react-datetime-picker';
import { errorToast, successToast } from '../../shared/Toast';
import { getAuthRequest } from '../../shared/http';

interface EditAdModalProps {
  Ad: IAd;
  refetch?: () => {}
}

export const EditAdModal: React.FC<EditAdModalProps> = ({ Ad, refetch }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialDates = {
    startTime: new Date(Ad.CasZacetka),
    endTime: new Date(Ad.CasKonca),
  };

  const [startDate, setStartDate] = useState(initialDates.startTime);
  const [endDate, setEndDate] = useState(initialDates.endTime);

  const formik = useFormik({
    initialValues: {
      location: Ad.lokacija,
    },
    onSubmit: (values) => console.log(values), // not used
  });

  const handleSubmit = async () => {
    setLoading(true)

    /** TODO fixme */
    // if (
    //   !formik.dirty &&
    //   startDate == initialDates.startTime &&
    //   endDate == initialDates.endTime
    // ) {
    //   successToast('No changes were made to the Ad ✔️');
    //   setLoading(false);
    //   return setOpen(false);
    // }
    // console.log(startDate === initialDates.startTime)
    // console.log(endDate === initialDates.endTime)

    try {
      const authRequest = getAuthRequest()
      const payload = {...formik.values, startDate, endDate, oglasId: Ad.ID_oglas}
      const response    = await authRequest.put('oglas/edit', payload)
      if (response.status === 200) {
          successToast('Ad successfully updated ✔️')
          setLoading(false)
          if (refetch) {
            refetch()
          }
          return setOpen(false)
      }
    } catch(e) {
      console.error(e)
      errorToast()
      setLoading(false)
      return setOpen(false);
    }
  };

  const handleReset = () => {
    setStartDate(initialDates.startTime);
    setEndDate(initialDates.endTime);
    formik.resetForm();
  };

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Label
          corner="right"
          onClick={() => setOpen(true)}
          color="yellow"
          as="a"
        >
          <Icon name="edit" />
        </Label>
      }
    >
      <Modal.Header>
        <Icon name="edit" /> Edit Ad
      </Modal.Header>
      <Modal.Content>
        <Form>
          <label>Location</label>
          <input
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </Form>
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
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="reset"
          content="Discard changes"
          labelPosition="right"
          icon="repeat"
          onClick={handleReset}
          color="black"
          disabled={loading}
        />
        <Button
          type="submit"
          content="Confirm changes"
          labelPosition="right"
          icon="arrow alternate circle right"
          onClick={handleSubmit}
          color="green"
          disabled={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};
