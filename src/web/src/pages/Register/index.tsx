import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Header, Grid, Button, Divider, Segment } from 'semantic-ui-react';
import { useWindowSize } from '../../shared/useWindow';
import { RegisterLayout } from './Layout';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { width } = useWindowSize();

  const showDivider = useCallback(() => {
    if (!width) {
      return;
    }
    if (width > 992) {
      return <Divider vertical>OR</Divider>;
    }
  }, [width]);

  useEffect(() => {
    showDivider();
  }, [showDivider]);

  return (
    <RegisterLayout>
      <Header as="h1" size="huge" content="Register as" />
      <Segment placeholder>
        <Grid container columns="2" verticalAlign="middle" textAlign="center">
          <Grid.Column computer={6} mobile={12}>
            <Button
              primary
              content="Dog Owner"
              icon="paw"
              size="huge"
              onClick={() => history.push('/register/owner')}
            />
          </Grid.Column>

          <Grid.Column computer={6} mobile={12}>
            <Button
              primary
              content="Dog Walker"
              icon="blind"
              size="huge"
              onClick={() => history.push('/register/walker')}
            />
          </Grid.Column>
        </Grid>
        {showDivider()}
      </Segment>
      <Button
        secondary
        content="I already have an account"
        icon="arrow left"
        onClick={() => history.push('/login')}
      ></Button>
    </RegisterLayout>
  );
};
