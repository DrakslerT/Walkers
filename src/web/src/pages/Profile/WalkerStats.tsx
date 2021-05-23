import React from 'react';
import { Divider, Header, Icon, Rating, Statistic } from 'semantic-ui-react';
import { Loader } from '../../components/Loader';
import { useWindowSize } from '../../shared/useWindow';
import { handleResponseTime } from '../../shared/utils';
import { IProfile } from './context/ProfileContext';

interface WalkerStatsProps {
  profile?: IProfile;
}

export const WalkerStats: React.FC<WalkerStatsProps> = ({ profile }) => {
  const { width } = useWindowSize();

  if (!profile || !width) {
    return <Loader />;
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
            {handleResponseTime(profile.stats.OdzivniCas)}
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
