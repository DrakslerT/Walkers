import { Dimmer, Loader as SLoader } from 'semantic-ui-react';

interface LoaderProps {
  msg?: string;
}

export const Loader = ({ msg = 'Loading...' }: LoaderProps) => {
  return (
    <Dimmer active inverted>
      <SLoader inverted content={msg} size="large"/>
    </Dimmer>
  );
};
