import { AlertDescription, AlertIcon, AlertTitle, Flex, Box, Button, Heading, Select, Stack, FormControl, FormLabel, FormErrorMessage, Textarea, HStack, Radio, RadioGroup, VStack, Container } from "@chakra-ui/react";
import { useState } from "react";
import { Form, Field, Formik } from "formik";
import * as Yup from 'yup';

import Layout from "../Components/Layout";
import Wizard from "../Components/Wizard";
import { Alert } from "antd";
import DateInput from "../Components/DateInput";
import TimeInput from "../Components/TimeInput";

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

const StepOne = ({ onNext }) => {
  const [submitError, setSubmitError ] = useState(null);
  return (
    <Box display={{ base: 'block', md: 'flex' }} justifyContent='center'  >
      <Heading fontSize='sectionTitle' fontWeight='sectionTitle'>Enter the event details</Heading>
      <Box>
        <Formik
          initialValues={{
            date: '',
            time: '',
            diners: 0,
            occasion: '',
            seatingOptions: 'standard',
            comments: ''
          }}
          onSubmit={(values, actions) => {
            onNext(1, values);
          }}
          validationSchema={
            Yup.object({
              date: Yup.string().required("Required"),
              time: Yup.string().required("Required"),
              diners: Yup.number().required("Required").moreThan(0, 'Required').lessThan(9, 'Required'),
              occasion: Yup.string().required('Required'),
              seatingOptions: Yup.string().required("Required"),
            })
          }
        >
          {(props) => (
            <Form>
              { submitError && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}
              <DateInput label='Date' name='date' />
              <TimeInput label='Time' name='time' format='HH:mm' />
              <Field name='diners'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.touched.diners && form.errors.diners} mb={3}>
                    <FormLabel htmlFor="diners" fontSize='cardTitle' fontWeight='cardTitle'>Number of diners</FormLabel>
                    <Select placeholder="Select option" {...field} >
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                    </Select>
                    <FormErrorMessage>{form.errors.diners}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='occasion'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.touched.occasion && form.errors.occasion} mb={3}>
                    <FormLabel htmlFor="occasion" fontSize='cardTitle' fontWeight='cardTitle'>Occasion</FormLabel>
                    <Select placeholder="Select option" {...field}>
                      <option value='birthday'>Birthday</option>
                      <option value='engagement'>Engagement</option>
                      <option value='anniversary'>Anniversary</option>
                      <option value='other'>Other</option>
                    </Select>
                    <FormErrorMessage>{form.errors.occasion}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='seatingOptions'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.touched.seatingOptions && form.errors.seatingOptions} mb={3}>
                    <FormLabel htmlFor="seatingOptions" fontSize='cardTitle' fontWeight='cardTitle'>Seating options</FormLabel>
                    <RadioGroup name='seatingOptions' defaultValue="standard">
                      <Stack direction='column'>
                        <Radio value='standard'>Standard</Radio>
                        <Radio value='outside'>Outside</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{form.errors.seatingOptions}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='comments'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.touched.comments && form.errors.comments} mb={3}>
                    <FormLabel htmlFor="comments">Additional comments (Optional)</FormLabel>
                    <Textarea {...field} placeholder="Enter any additional comments about your reservation" />
                    <FormErrorMessage>{form.errors.comments}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button type='submit' isLoading={props.isSubmitting} isDisabled={!props.isValid}>
                {props.isSubmitting ? 'NEXT' : 'NEXT' }
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

const StepTwo = ({ onPrevious, onNext }) => {
  const [submitError, setSubmitError ] = useState(null);

  return (
    <Box>

    </Box>
  )
}

export default function Reservations() {
  const [step, setStep] = useState(0);
  const [eventDetails, setEventDetails] = useState({date: '', time: '', diners: 0, occasion: '', seatingOptions: '', comments: ''});

  const handleNext = (step, information) => {
    setStep((s) => s + 1);
  }
  return (
    <Layout>
      <Container
        maxW='4xl'
      >
        <Heading color='primary.yellow'>Little Lemon</Heading>
        <Heading>Chicago</Heading>
        <Heading>Find a table for any occasion.</Heading>
        <Stack w='full' border='1px' position='relative'>
          <Wizard steps={steps} activeStep={step} mb={3} p={10} />
          {step === 0 && <StepOne onNext={handleNext} />}
        </Stack>
      </Container>
    </Layout>
  )
}