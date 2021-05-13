import React, { useEffect, useState, useCallback } from 'react';
import { Header, Step, Icon, Segment } from 'semantic-ui-react';
import { isAuth } from '../../../shared/AccessToken';
import { UserTypeEnum } from '../../../shared/Enums';
import { BasicForm } from '../../../components/forms/BasicForm';
import { ConfirmEmailForm } from '../../../components/forms/ConfirmEmailForm';
import { RegisterLayout } from '../Layout';
import { DogForm } from '../../../components/forms/DogForm';
import { getAuthRequest } from '../../../shared/http';
import { getUser } from '../../../shared/UserInformation';
import { Loader } from '../../../components/Loader';
import { RouteComponentProps } from 'react-router-dom';

enum OwnerStepEnum {
  BasicInfo = 1,
  DogInfo = 2,
  Activate = 3,
}

export const OwnerRegister: React.FC<RouteComponentProps> = ({ history }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);

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
  /** Set correct step on inital load */
  useEffect(() => {
    setLoading(true);
    const user = getUser();
    const auth = isAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    if (user.userType === 1) {
      return history.replace('/register/walker');
    }

    const authRequest = getAuthRequest();
    authRequest
      .get(`dogs/count`)
      .then((response) => {
        if (response.data.dogsCount < 1) {
          setStep(OwnerStepEnum.DogInfo);
        } else {
          if (user.activated !== 1) {
            setStep(OwnerStepEnum.Activate);
          } else {
            history.push('/');
          }
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => s + 1);
  }, [setStep]);

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
        {loading ? <Loader /> : renderStep()}
      </Segment>
    </RegisterLayout>
  );
};
