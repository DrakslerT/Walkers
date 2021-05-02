import React, { useEffect, useState, useCallback } from 'react';
import { Header, Step, Icon, Segment } from 'semantic-ui-react';
import { isAuth } from '../../../shared/AccessToken';
import { UserTypeEnum } from '../../../shared/Enums';
import { BasicForm } from '../../../components/forms/BasicForm';
import { ConfirmEmailForm } from '../../../components/forms/ConfirmEmailForm';
import { RegisterLayout } from '../Layout';
import { DogForm } from '../../../components/forms/DogForm';

enum OwnerStepEnum {
  BasicInfo = 1,
  DogInfo = 2,
  Activate = 3,
}

export const OwnerRegister: React.FC = () => {
  const setCorrectStep = () => {
    const auth = isAuth();
    if (auth) {
      return OwnerStepEnum.DogInfo;
    }
    return OwnerStepEnum.BasicInfo;
  };

  const [step, setStep] = useState<number>(setCorrectStep);

  const renderStep = useCallback(() => {
    switch (step) {
      case OwnerStepEnum.BasicInfo:
        return <BasicForm userType={UserTypeEnum.Owner} nextStep={nextStep} />;
      case OwnerStepEnum.DogInfo:
        return <DogForm nextStep={nextStep} />;
      case OwnerStepEnum.Activate:
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
      <Header as="h1" size="huge" content="Register as a Dog Owner" />
      <Step.Group fluid>
        <Step
          active={step === OwnerStepEnum.BasicInfo}
          disabled={step < OwnerStepEnum.BasicInfo}
          completed={step > OwnerStepEnum.BasicInfo}
        >
          <Icon name="user" />
          <Step.Content>
            <Step.Title>User Information</Step.Title>
            <Step.Description>
              Please fill out the form and submit to register
            </Step.Description>
          </Step.Content>
        </Step>
        <Step
          active={step === OwnerStepEnum.DogInfo}
          disabled={step < OwnerStepEnum.DogInfo}
          completed={step > OwnerStepEnum.DogInfo}
        >
          <Icon name="paw" />
          <Step.Content>
            <Step.Title>Dog Information</Step.Title>
            <Step.Description>Add your best friend!</Step.Description>
          </Step.Content>
        </Step>
        <Step
          active={step === OwnerStepEnum.Activate}
          disabled={step < OwnerStepEnum.Activate}
          completed={step > OwnerStepEnum.Activate}
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
