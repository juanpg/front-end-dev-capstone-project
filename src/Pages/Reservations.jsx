import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Select, Stack, FormControl, FormLabel, FormErrorMessage, Textarea, Radio, RadioGroup, Container, ButtonGroup, Input, Checkbox, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useMediaQuery, useDisclosure } from "@chakra-ui/react";
import { DatePicker } from "antd";
import { useEffect, useRef, useState } from "react";
import { Form, Field, Formik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from 'yup';
import 'yup-phone-lite';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs';

dayjs.extend(customParseFormat);

import Layout from "../Components/Layout";
import Wizard from "../Components/Wizard";
import { CardTitle, DisplayTitle, ParagraphText, SectionTitle, Subtitle } from "../Components/Typography";
import { useNavigate } from "react-router-dom";

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

const availableHours = Array.from({length: 24}, (_, index) => {
  const hour = index/2 + 11;
  const minute = hour === parseInt(hour) ? ':00' : ':30';
  const ampm = hour >= 12 ? 'pm' : 'am';
  return `${parseInt(hour >= 13 ? hour - 12 : hour)}${minute} ${ampm}`
});

const disabledDate = (current) => current && current < dayjs().endOf('day');

const StepOne = ({ values, onNext, ...rest }) => {
  const [submitError, setSubmitError ] = useState(null);
  const inputRef = useRef(null);
  const [isLarge] = useMediaQuery('(min-width: 48em)');

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <Box display={{ base: 'block', md: 'flex' }} w='full' px='30px' justifyContent='center' alignItems='center' flexDirection='column' {...rest} >
      <SectionTitle display='block' placeSelf='start' p='20px' mb='30px'>Enter the event details</SectionTitle>
      <Box w='full' display='flex' justifyContent='center'>
        <Formik
          initialValues={{...values}}
          onSubmit={(values, actions) => {
            onNext(values);
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
            <Form style={ { width: isLarge ? '600px' : '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' } } >
              { submitError && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}
              <Field name='date' >
                {({ field, form }) => {
                  return (
                    <FormControl isInvalid={form.touched.date && form.errors.date} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel>
                        <CardTitle>Date</CardTitle>
                      </FormLabel>
                      <DatePicker 
                        id='date'
                        ref={inputRef}
                        {...field}
                        format='MM/DD/YYYY'
                        disabledDate={disabledDate}
                        showToday={false}
                        status={form.touched.date && form.errors.date ? 'error' : ''}
                        style={{width: '100%'}}
                        defaultValue={dayjs(new Date(), 'YYYY-MM-DD')}
                        value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
                        onChange={(date, dateString) => form.setFieldValue('date', date ? date.format('YYYY-MM-DD') : null) }
                        
                      />
                      <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name='time' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.touched.time && form.errors.time} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                    <FormLabel htmlFor="time">
                      <CardTitle>Time</CardTitle>
                    </FormLabel>
                    <Select placeholder="Select option" {...field}>
                      {availableHours.map(time => <option key={time} value={time}>{time}</option>)}
                    </Select>
                    <FormErrorMessage>{form.errors.time}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='diners' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.touched.diners && form.errors.diners} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                    <FormLabel htmlFor="diners">
                      <CardTitle>Number of diners</CardTitle>
                    </FormLabel>
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
                  <FormControl isInvalid={form.touched.occasion && form.errors.occasion} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                    <FormLabel htmlFor="occasion">
                      <CardTitle>Occasion</CardTitle>
                    </FormLabel>
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
                  <FormControl isInvalid={form.touched.seatingOptions && form.errors.seatingOptions} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                    <FormLabel htmlFor="seatingOptions">
                      <CardTitle>Seating options</CardTitle>
                    </FormLabel>
                    <RadioGroup name='seatingOptions' defaultValue="standard" {...field} onChange={(value) => form.setFieldValue('seatingOptions', value)} >
                      <Stack direction='column'>
                        <Radio value='standard' >Standard</Radio>
                        <Radio value='outside'>Outside</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{form.errors.seatingOptions}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='comments'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.touched.comments && form.errors.comments} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                    <FormLabel htmlFor="comments">Additional comments (Optional)</FormLabel>
                    <Textarea {...field} placeholder="Enter any additional comments about your reservation" rows='5' resize='none' />
                    <FormErrorMessage>{form.errors.comments}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button type='submit' bg='primary.yellow' w='320px' h='60px' isLoading={props.isSubmitting} isDisabled={!props.isValid}>
                <SectionTitle>NEXT</SectionTitle>                
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

const StepTwo = ({ values, onPrevious, onNext, ...rest }) => {
  const [submitError, setSubmitError ] = useState(null);
  const inputRef = useRef(null);
  const [isLarge] = useMediaQuery('(min-width: 48em)');

  useEffect(() => {
    inputRef.current.focus();
  }, [])
  
  return (
    <Box display={{ base: 'block', md: 'flex' }} w='full' px='30px' justifyContent='center' alignItems='center' flexDirection='column' {...rest} >
      <SectionTitle display='block' placeSelf='start' p='20px' mb='30px'>Please login or enter your contact information</SectionTitle>
      <Box w='full' display='flex' justifyContent='center'>
        <Formik
          initialValues={values}
          onSubmit={(values, actions) => {
            onNext(values);
          }}
          validationSchema={
            Yup.object({
              firstName: Yup.string().max(100 | "Must be at most 100 characters").required("Required"),
              lastName: Yup.string().max(100 | "Must be at most 100 characters").required("Required"),
              email: Yup.string().email("Please enter a valid email address").required("An email is required"),
              phone: Yup.string().phone("US", "Please enter a valid phone number").required("A phone number is required"),
            })
          }
        >
          {(props) => (
            <Form style={ { width: isLarge ? '600px' : '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' } } >
              { submitError && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}
              <Radio value='registered' isDisabled mb='42px'position='relative' width='100%' left={{ base: '0', lg: '-60px'}}>
                <CardTitle>Login</CardTitle>
              </Radio>
              {['username', 'password'].map(name => (
                <Field key={name} name={name}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.touched[name] && form.errors[name]} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel htmlFor={name} disabled>
                        <CardTitle>{ {username: 'E-mail', password: 'Password'}[name]}</CardTitle>
                      </FormLabel>
                      <Input 
                        isDisabled
                        placeholder={ {username: 'john@email.com', password: ''}[name]}
                        type={ {username: 'email', password: 'password'}[name]}
                        {...field} 
                      />
                      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              ))}
              <Radio value='guest' mb='42px' position='relative' width='100%' left={{ base: '0', lg: '-60px'}} isChecked>
                <CardTitle>Continue as guest</CardTitle>
              </Radio>
              {['firstName', 'lastName', 'email', 'phone'].map((name, idx) => (
                <Field key={name} name={name} >
                  {({ field, form }) => (
                    <FormControl isInvalid={form.touched[name] && form.errors[name]} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel htmlFor={name}>
                        <CardTitle>{ {firstName: 'First name', lastName: 'Last name', email: 'E-Mail', phone: 'Phone Number'}[name]}</CardTitle>
                      </FormLabel>
                      <Input 
                        ref={idx === 0 ? inputRef : null}
                        placeholder={ {firstName: 'John', lastName: 'Doe', email: 'john@email.com', phone: '000-000-0000'}[name]}
                        type={{ firstName: 'text', lastName: 'text', email: 'email', phone: 'tel' }[name]}
                        {...field} 
                      />
                      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              ))}
              <ButtonGroup spacing={{base: 0, md: '25px'}} flexDirection={{base: 'column-reverse', md: 'row'}} gap={{ base: '25px', md: '0'}}>
                <Button type='button' bg='primary.green' w='320px' h='60px' onClick={() => onPrevious(props.values)}>
                  <SectionTitle>PREVIOUS</SectionTitle>
                </Button>
                <Button type='submit' bg='primary.yellow' w='320px' h='60px' isLoading={props.isSubmitting} isDisabled={!props.isValid}>
                  <SectionTitle>NEXT</SectionTitle>                
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

const StepThree = ({ values, onPrevious, onNext, ...rest }) => {
  const [submitError, setSubmitError ] = useState(null);
  const [isLarge] = useMediaQuery('(min-width: 48em)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box display={{ base: 'block', md: 'flex' }} w='full' px='30px' justifyContent='center' alignItems='center' flexDirection='column' {...rest} >
      <SectionTitle placeSelf='start' p='20px'>Reservation Details</SectionTitle>
      <Box w='full' display='flex' justifyContent='center'>
        <Formik
          initialValues={ {
            name: values.firstName ? `${values.firstName} ${values.lastName}` : '',
            dateTime: values.date ? `${dayjs(values.date, 'YYYY-MM-DD').format('MM/DD/YYYY')} ${values.time}` : '',
            diners: values.diners,
            seatingOptions: values.seatingOptions ? `${values.seatingOptions[0].toUpperCase()}${values.seatingOptions.substr(1).toLowerCase()}` : '',
            sendSms: false, 
            sendEmail: false,
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            setTimeout(onOpen, 1000);
          }}
        >
          {(props) => (
            <Form style={ { width: isLarge ? '600px' : '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' } } >
              { submitError && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}
              {['name', 'dateTime', 'diners', 'seatingOptions', 'sendSms', 'sendEmail'].map(name => {
                const fields = {
                  name: {label: 'Name' },
                  dateTime: {label: 'Date and Time'},
                  diners: {label: 'Number of diners'},
                  seatingOptions: {label: 'Seating options'},
                  sendSms: {label: 'Send booking confirmation via text'},
                  sendEmail: {label: 'Send booking confirmation via email'}
                };

                return (
                  <Field key={name} name={name} >
                    {({ field, form }) => (
                      <FormControl isInvalid={form.touched[name] && form.errors[name]} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                        <FormLabel htmlFor={name}>
                          <CardTitle>{ fields[name].label }</CardTitle>
                        </FormLabel>
                        {typeof form.initialValues[name] !== 'boolean' ? 
                        (
                          <Input 
                            isReadOnly
                            type='text'
                            {...field}
                          />
                        ) : (
                          <Checkbox {...field}><CardTitle>Yes</CardTitle></Checkbox>
                        )}
                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                );
              })}
              <ButtonGroup spacing={{base: 0, md: '25px'}} flexDirection={{base: 'column-reverse', md: 'row'}} gap={{ base: '25px', md: '0'}}>
                <Button type='button' bg='primary.green' w='320px' h='60px' onClick={() => onPrevious()}>
                  <SectionTitle>PREVIOUS</SectionTitle>
                </Button>
                <Button type='submit' bg='primary.yellow' w='320px' h='60px' isLoading={props.isSubmitting} isDisabled={!props.isValid}>
                  <SectionTitle>FINISH</SectionTitle>                
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Box>
      <Modal 
        isOpen={isOpen}
        onClose={() => navigate('/')}
        isCentered        
      >
        <ModalOverlay />
        <ModalContent borderRadius='8px'>
          <ModalHeader bg='primary.yellow' color='black' borderTopRadius='8px'>
            <Subtitle>Reservation Confirmed</Subtitle>
          </ModalHeader>
          <ModalBody p='30px'>
            <ParagraphText as='p' mb='10px'>Your reservation has been confirmed.</ParagraphText>
            <ParagraphText as='p' mb='10px'>Go back to the <Link as={RouterLink} to='/'><CardTitle>Home Page</CardTitle></Link></ParagraphText>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
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