import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

// TODO style me!
export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header as="h1" size="huge">
        404 Page not found
      </Header>
      <Link to="/">Go back to the app</Link>
    </>
  );
};
