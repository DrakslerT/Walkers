import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';
import { Loader } from '../../components/Loader';
import Navbar from '../../components/navbar/Navbar';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';

export interface IUser {
  ID_uporabnik: number;
  Tip: number;
  Ime_uporabnik: string;
  Geslo: string;
  Email: string;
  GSM: number | null;
  Aktiviran: number;
  DatumUstvaritve: string;
  DatumSpremembe: string;
  DatumDeaktivacije: null;
}

export const AdminPage: React.FC = () => {
  const authRequest = getAuthRequest();

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await authRequest.get('admin/users');
      setUsers(response.data);
    } catch (e) {
      console.error(e);
      errorToast();
    }
    setLoading(false);
  };

  const deactivateUser = async (userId: number) => {
    setLoading(true);
    try {
      const response = await authRequest.post('admin/users/deactivate', {
        profileId: userId,
      });
      if (response.status === 200) {
        successToast();
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
      errorToast();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading || users.length === 0) {
    return <Loader msg="Loading admin page" />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Header>Admin view Users</Header>
        </Container>
        <Segment>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>User type</Table.HeaderCell>
                <Table.HeaderCell>Activated</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.map((user) => {
                return (
                  <Table.Row>
                    <Table.Cell>{user.ID_uporabnik}</Table.Cell>
                    <Table.Cell>{user.Ime_uporabnik}</Table.Cell>
                    <Table.Cell>{user.Email}</Table.Cell>
                    <Table.Cell>{user.Tip}</Table.Cell>
                    <Table.Cell>{user.Aktiviran}</Table.Cell>
                    <Table.Cell>
                      {user.Aktiviran !== null && (
                        <Button
                          color="red"
                          icon
                          labelPosition="left"
                          onClick={() => deactivateUser(user.ID_uporabnik)}
                        >
                          Deactivate
                          <Icon name="exclamation triangle" />
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>
      </main>
    </>
  );
};
