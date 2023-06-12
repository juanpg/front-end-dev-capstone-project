import { useState, useRef, useEffect, useReducer, useId } from "react";
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, FormControl, FormLabel, FormErrorMessage, Select, Input, RadioGroup, Stack, Radio, Textarea, Button, useMediaQuery } from "@chakra-ui/react";
import { CardTitle, SectionTitle } from "../Components/Typography";
import { DatePicker } from "antd";
import { Form, Field, Formik } from "formik";
import * as Yup from 'yup';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs';

import { updateTimes, initializeTimes } from "../Reducers/TimesReducer";

dayjs.extend(customParseFormat);

const disabledDate = (current) => current && current < dayjs().endOf('day');

export default function EventDetails({ values, onNext, ...rest }) {
  const [submitError, setSubmitError ] = useState(null);
  const inputRef = useRef(null);
  const [isLarge] = useMediaQuery('(min-width: 48em)');
  
  const [availableTimes, dispatcher] = useReducer(updateTimes, null, initializeTimes);

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <Box display={{ base: 'block', md: 'flex' }} w='full' px='30px' justifyContent='center' alignItems='center' flexDirection='column' {...rest} >
      <SectionTitle display='block' placeSelf='start' p='20px' mb='30px'>Enter the event details</SectionTitle>
      <Box w='full' display='flex' justifyContent='center'>
        <Formik
          initialValues={{...values}}
          validateOnMount={true}
          onSubmit={(values, actions) => {
            onNext(values);
          }}
          validationSchema={
            Yup.object({
              date: Yup.string().required("Required"),
              time: Yup.string().required("Required"),
              diners: Yup.number().required("Required").moreThan(0, 'Please enter a number between 1 and 10').lessThan(11, 'Please enter a number between 1 and 10'),
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
                  const id = useId();
                  return (
                    <FormControl isInvalid={form.touched.date && form.errors.date} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel htmlFor={id}>
                        <CardTitle>Date</CardTitle>
                      </FormLabel>
                      <DatePicker 
                        id={id}
                        ref={inputRef}
                        {...field}
                        format='MM/DD/YYYY'
                        disabledDate={disabledDate}
                        showToday={false}
                        status={form.touched.date && form.errors.date ? 'error' : ''}
                        style={{width: '100%'}}
                        defaultValue={dayjs(new Date(), 'YYYY-MM-DD')}
                        value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
                        onChange={(date, dateString) => {
                          const newDate = date ? date.format('YYYY-MM-DD') : null;
                          form.setFieldValue('date', newDate);
                          dispatcher({type: 'new_date', newDate});
                        }}
                        
                      />
                      <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name='time' >
                {({ field, form }) => {
                  const id = useId()
                  return (
                    <FormControl isInvalid={form.touched.time && form.errors.time} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel htmlFor={id}>
                        <CardTitle>Time</CardTitle>
                      </FormLabel>
                      <Select id={id} placeholder="Select option" {...field}>
                        {availableTimes.map(time => <option key={time} value={time}>{time}</option>)}
                      </Select>
                      <FormErrorMessage>{form.errors.time}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name='diners' >
                {({ field, form }) => {
                  const id = useId();
                  return (
                    <FormControl isInvalid={form.touched.diners && form.errors.diners} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel htmlFor={id}>
                        <CardTitle>Number of diners</CardTitle>
                      </FormLabel>
                      <Input id={id} type='number' min='1' max='10' step='1' placeholder='Enter number of diners' {...field} />
                      <FormErrorMessage>{form.errors.diners}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name='occasion'>
                {({ field, form }) => {
                  const id = useId();
                  return (
                    <FormControl isInvalid={form.touched.occasion && form.errors.occasion} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel htmlFor={id}>
                        <CardTitle>Occasion</CardTitle>
                      </FormLabel>
                      <Select id={id} placeholder="Select option" {...field}>
                        <option value='birthday'>Birthday</option>
                        <option value='engagement'>Engagement</option>
                        <option value='anniversary'>Anniversary</option>
                        <option value='other'>Other</option>
                      </Select>
                      <FormErrorMessage>{form.errors.occasion}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name='seatingOptions'>
                {({ field, form }) => {
                  return (
                    <FormControl isInvalid={form.touched.seatingOptions && form.errors.seatingOptions} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel>
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
                  );
                }}
              </Field>
              <Field name='comments'>
                {({ field, form }) => {
                  const id = useId();
                  return (
                    <FormControl isInvalid={form.touched.comments && form.errors.comments} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                      <FormLabel htmlFor={id}>Additional comments (Optional)</FormLabel>
                      <Textarea {...field} id={id} placeholder="Enter any additional comments about your reservation" rows='5' resize='none' />
                      <FormErrorMessage>{form.errors.comments}</FormErrorMessage>
                    </FormControl>
                  )
                }}
              </Field>
              <Button type='submit' aria-label="Go to next step" bg='primary.yellow' w='320px' h='60px' isLoading={props.isSubmitting} isDisabled={!props.isValid}>
                <SectionTitle>NEXT</SectionTitle>                
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}