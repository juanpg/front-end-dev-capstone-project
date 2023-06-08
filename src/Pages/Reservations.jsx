import { Stack, Container } from "@chakra-ui/react";
import { useState } from "react";

import Layout from "../Components/Layout";
import Wizard from "../Components/Wizard";
import { DisplayTitle, Subtitle } from "../Components/Typography";
import EventDetails from "../Components/EventDetails";
import CustomerDetails from "../Components/CustomerDetails";
import Confirmation from "../Components/Confirmation";

const steps = [
  {
    title: 'First',
    description: 'Event details'
  },
  {
    title: 'Second',
    description: 'Customer details'
  },
  {
    title: 'Third',
    description: 'Confirmation'
  }
];

const StepOne = ({ values, onNext, ...rest }) => {
  return <EventDetails values={values} onNext={onNext} {...rest} />
}

const StepTwo = ({ values, onPrevious, onNext, ...rest }) => {
  return <CustomerDetails values={values} onPrevious={onPrevious} onNext={onNext} {...rest} />
}

const StepThree = ({ values, onPrevious, onNext, ...rest }) => {
  return <Confirmation values={values} onPrevious={onPrevious} onNext={onNext} {...rest} />
}

export default function Reservations() {
  const [step, setStep] = useState(0);
  const [eventDetails, setEventDetails] = useState({date: '', time: '', diners: 0, occasion: '', seatingOptions: '', comments: ''});
  const [customerDetails, setCustomerDetails] = useState({firstName: '', lastName: '', email: '', phone: ''});

  const handleNext = (information) => {
    if(step === 0) {
      setEventDetails(information);
    } else if(step === 1) {
      setCustomerDetails(information);
    }
    setStep((s) => s + 1);
  }
  const handlePrevious = (information) => {
    step === 1 && setCustomerDetails(information);
    setStep((s) => s - 1);
  }
  return (
    <Layout>
      <Container
        maxW='4xl'
      >
        <DisplayTitle mb='0' color='primary.yellow'>Little Lemon</DisplayTitle>
        <Subtitle mb='12px'>Chicago</Subtitle>
        <Subtitle mb='48px'>Find a table for any occasion.</Subtitle>
        <Stack w='full' border='1px' position='relative' justify='center' align='center'>
          <Wizard steps={steps} activeStep={step} mb={3} w='95%' />
          {step === 0 && <StepOne values={eventDetails} onNext={handleNext} mb={3} />}
          {step === 1 && <StepTwo values={customerDetails} onNext={handleNext} onPrevious={handlePrevious} mb={3} />}
          {step === 2 && <StepThree values={{...eventDetails, ...customerDetails}} onNext={handleNext} onPrevious={handlePrevious} mb={3} />}
        </Stack>
      </Container>
    </Layout>
  )
}