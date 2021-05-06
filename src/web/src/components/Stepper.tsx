import React from 'react';
import { Step, Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

export interface StepProp {
  status: boolean | null;
  icon: SemanticICONS;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: StepProp[];
}


/** Currently not in use, but could be swapped in the future for other manually inserted steppers (mainly register maybe somewhere else) */
export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <Step.Group fluid>
      {steps.map((step) => {
        <Step
          active={step.status === null}
          disabled={step.status === false}
          completed={step.status === true}
        >
          <Icon name={step.icon} />
          <Step.Content>
            <Step.Title>{step.title}</Step.Title>
            <Step.Description>{step.description}</Step.Description>
          </Step.Content>
        </Step>;
      })}
    </Step.Group>
  );
};
