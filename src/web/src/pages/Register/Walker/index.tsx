import React, { useCallback, useEffect, useState } from 'react';
import { Header, Icon, Segment, Step } from 'semantic-ui-react';
import { UserTypeEnum } from '../../../shared/Enums';
import { BasicForm } from '../../../components/forms/BasicForm';
import { ConfirmEmailForm } from '../../../components/forms/ConfirmEmailForm';
import { RegisterLayout } from '../Layout';
import { isAuth } from '../../../shared/AccessToken';
import { getUser } from '../../../shared/UserInformation';
import { RouteComponentProps } from 'react-router-dom';
import { Loader } from '../../../components/Loader';

enum WalkerStepEnum {
  BasicInfo = 1,
  Activate = 2,
}

export const WalkerRegister: React.FC<RouteComponentProps> = ({ history }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const renderStep = useCallback(() => {
    switch (step) {
      case WalkerStepEnum.BasicInfo:
        return <BasicForm userType={UserTypeEnum.Walker} nextStep={nextStep} />;
      case WalkerStepEnum.Activate:
        return <ConfirmEmailForm />;
    }
  }, [step]);

  /** Set correct step on inital load */
  useEffect(() => {
    setLoading(true);
    const user = getUser();
    const auth = isAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    if (user.userType === 2) {
      history.replace('/register/owner');
    }

    if (user.activated !== 1) {
      setStep(WalkerStepEnum.Activate);
    } else {
      history.push('/');
    }
    setLoading(false);
    return () => {};
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => s + 1);
  }, [setStep]);

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
        {loading ? <Loader /> : renderStep()}
      </Segment>
    </RegisterLayout>
  );
};
