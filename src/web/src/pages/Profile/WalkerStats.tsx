import React from 'react';
import { Divider, Header, Icon, Rating, Table } from 'semantic-ui-react';
import { IProfile } from './context/ProfileContext';

interface WalkerStatsProps {
  profile?: IProfile;
}

export const WalkerStats: React.FC<WalkerStatsProps> = ({ profile }) => {
  const responseTime = (n: number) => {
    switch (n) {
      case 7:
        return 'Daily';
      case 5:
        return 'Less than 3 days';
      case 3:
        return 'Weekly';
      case 1:
        return 'More than a week';
    }
  };

  if (!profile) {
    return <div>...</div>;
  }

  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="chart bar" />
          Stats
        </Header>
      </Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}>Average response time</Table.Cell>
            <Table.Cell>{responseTime(profile.stats.OdzivniCas)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Average rating</Table.Cell>
            <Table.Cell>
              <Rating
                maxRating={5}
                defaultRating={profile.stats.PovprecnaOcena}
                icon="star"
                size="large"
                disabled
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Number of walks</Table.Cell>
            <Table.Cell>{profile.stats.StSprehodov}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};
