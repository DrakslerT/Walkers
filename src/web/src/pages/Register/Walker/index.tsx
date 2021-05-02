import React, { useCallback, useEffect, useState } from 'react';
import { Header, Icon, Segment, Step } from 'semantic-ui-react';
import { UserTypeEnum } from '../../../shared/Enums';
import { BasicForm } from '../../../components/forms/BasicForm';
import { ConfirmEmailForm } from '../../../components/forms/ConfirmEmailForm';
import { RegisterLayout } from '../Layout';

enum WalkerStepEnum {
  BasicInfo = 1,
  Activate = 2,
}

export const WalkerRegister: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const renderStep = useCallback(() => {
    switch (step) {
      case WalkerStepEnum.BasicInfo:
        return <BasicForm userType={UserTypeEnum.Walker} nextStep={nextStep} />;
      case WalkerStepEnum.Activate:
        return <ConfirmEmailForm />;
    }
  }, [step]);

  const nextStep = useCallback(() => {
    setStep((s) => s + 1);
  }, [setStep]);

  useEffect(() => {
    renderStep();
  }, [renderStep]);

  return (
    <RegisterLayout>
      <Header as="h1" size="huge" content="Register as a Dog Walker" />
      <Step.Group fluid>
        <Step
          active={step === WalkerStepEnum.BasicInfo}
          disabled={step < WalkerStepEnum.BasicInfo}
          completed={step > WalkerStepEnum.BasicInfo}
        >
          <Icon name="user" />
          <Step.Content>
            <Step.Title>User information</Step.Title>
            <Step.Description>
              Please fill out the form and submit to register
            </Step.Description>
          </Step.Content>
        </Step>
        <Step
          active={step === WalkerStepEnum.Activate}
          disabled={step < WalkerStepEnum.Activate}
          completed={step > WalkerStepEnum.Activate}
        >
          <Icon name="mail" />
          <Step.Content>
            <Step.Title>Confirm Email</Step.Title>
            <Step.Description>Confirm your email address</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

      <Segment raised padded="very">
        {renderStep()}
      </Segment>
    </RegisterLayout>
  );
};
