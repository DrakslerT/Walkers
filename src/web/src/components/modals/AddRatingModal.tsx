import React, { useState } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Rating,
  Segment,
} from 'semantic-ui-react';
import { IWalk } from '../../pages/MyWalks';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';

interface AddRatingModalProps {
  refetch?: () => {};
  walk: IWalk;
}

export const AddRatingModal: React.FC<AddRatingModalProps> = ({
  refetch,
  walk,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(1);
  const authRequest = getAuthRequest();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        walkerId: walk.spreh_id,
        walkId: walk.ID_sprehod,
        rating,
      };
      const response = await authRequest.post('setRating', payload);
      if (response.status === 200) {
        successToast(
          `Added rating ${rating} to walker. ${'⭐'.repeat(rating)}`
        );
        if (refetch) {
          refetch();
        }
        setLoading(false);
        return setOpen(false);
      }
    } catch (e) {
      console.error(e);
      errorToast();
      setLoading(false);
      return setOpen(false);
    }
  };

  return (
    <Modal
      closeIcon
      closeOnEscape
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="yellow" floated="right">
          <Icon name="star" />
          Rate Walker
        </Button>
      }
    >
      <Modal.Header>
        Rate username with {rating} <Icon name="star" color="yellow" />{' '}
      </Modal.Header>
      <Modal.Content>
        <Segment textAlign="center">
          <Header as="h2" content="How satisfied were you with this walk" />
          <Rating
            defaultRating={1}
            maxRating={5}
            icon="star"
            size="massive"
            onRate={(e, data) => {
              if (typeof data.rating === 'number') {
                setRating(data.rating);
              }
            }}
          />
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button
          loading={loading}
          color="green"
          labelPosition="right"
          icon="star"
          content="Rate walker"
          fluid
          onClick={handleSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};
