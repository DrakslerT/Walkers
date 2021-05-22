import React, { useState } from 'react';
import { Confirm, Icon, Label, Message, Table } from 'semantic-ui-react';
import { IAd } from '.';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import { handleDate } from '../../shared/utils';

interface AdProps {
  ad: IAd;
  refetch: () => {};
}

export const Ad: React.FC<AdProps> = ({ ad, refetch}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModal, setEditModalOpen] = useState(false); // TODO
  const authRequest = getAuthRequest();

  const handleDelete = async () => {
    try {
      const response = await authRequest.post('oglas/delete', {
        AdId: ad.ID_oglas,
      });
      if (response.status === 200) {
        successToast(`Successfully deleted Ad ✔️`);
        refetch() // update users ad list
        setDeleteModalOpen(false);
      }
    } catch (e) {
      errorToast('Error when deleting Ad. Try Again! ⚠️');
      setDeleteModalOpen(false);
    }

    setDeleteModalOpen(false);
  };

  return (
    <Message size="huge" floating>
      <Confirm
        header={`${ad.lokacija} from ${handleDate(
          ad.CasZacetka
        )} to ${handleDate(ad.CasKonca)}`}
        content={'Are you sure you want to delete this Ad?'}
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        cancelButton="No, take me back."
        confirmButton="Yes, delete"
        closeOnEscape
        size="large"
      />
      <Message.Content>
        <Label
          corner="right"
          onClick={() => console.log(ad.ID_oglas)}
          color="yellow"
          as="a"
        >
          <Icon name="edit" />
        </Label>

        <Label
          attached="bottom right"
          onClick={() => setDeleteModalOpen(true)}
          color="red"
          as="a"
        >
          <Icon name="delete" size="large" />
          <span style={{ padding: '5px', userSelect: 'none' }}>
            Delete this Ad
          </span>
        </Label>
        <Table textAlign="left">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Icon name="map marker alternate" size="large" />
              </Table.Cell>
              <Table.Cell>
                <b>{ad.lokacija}</b>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="calendar" size="large" />
              </Table.Cell>
              <Table.Cell>{handleDate(ad.CasZacetka)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="calendar times" size="large" />
              </Table.Cell>
              <Table.Cell>{handleDate(ad.CasKonca)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Message.Content>
    </Message>
  );
};
