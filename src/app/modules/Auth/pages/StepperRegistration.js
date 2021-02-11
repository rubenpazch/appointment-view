/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Registration from './Registration';
import PatientInformation from './PatientInformation';
import RegistrationResume from './RegistrationResume';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const WrapperStepper = styled.div`
  width: 70vw;
`;

const WrapperStepNavigation = styled.div`
  padding: 15px 0 0 30px;
`;

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Patient Information', 'User Registration', 'Preview'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Patient Information...';
    case 1:
      return 'User Registration';
    case 2:
      return 'Preview';
    default:
      return 'Unknown step';
  }
}

const StepperRegistration = () => {
  const { activeStep } = useSelector(state => state.tokenStore);
  const [activeStepState, setActiveStepState] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const classes = useStyles();
  console.log({ activeStep });
  const isStepOptional = step => step === 1;
  const isStepSkipped = step => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStepState)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStepState);
    }

    setActiveStepState(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStepState(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStepState)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStepState(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStepState);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStepState(0);
  };

  const renderSwitch = param => {
    switch (param) {
      case 0:
        return <PatientInformation />;
      case 1:
        return <Registration />;
      case 2:
        return <RegistrationResume />;
      default:
        return <PatientInformation />;
    }
  };

  return (
    <WrapperStepper>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      { renderSwitch(activeStep) }
      <WrapperStepNavigation>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography
              className={classes.instructions}
            >
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </WrapperStepNavigation>
    </WrapperStepper>
  );
};

export default StepperRegistration;
