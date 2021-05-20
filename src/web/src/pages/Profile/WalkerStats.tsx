import React from 'react';
import { Divider, Header, Icon, Rating, Statistic } from 'semantic-ui-react';
import { useWindowSize } from '../../shared/useWindow';
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

  const { width } = useWindowSize();

  if (!profile || !width) {
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
      <Statistic.Group size="large" widths={width > 992 ? '3' : '1'}>
        <Statistic>
          <Statistic.Value>
            {responseTime(profile.stats.OdzivniCas)}
          </Statistic.Value>
          <Statistic.Label>Response time</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Rating
              maxRating={5}
              defaultRating={profile.stats.PovprecnaOcena}
              icon="star"
              size="massive"
              disabled
            />
          </Statistic.Value>
          <Statistic.Label>Average rating</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{profile.stats.StSprehodov}</Statistic.Value>
          <Statistic.Label>Number of walks</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </>
  );
};
