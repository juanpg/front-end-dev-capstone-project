import { useState, useRef, useEffect, useReducer } from "react";
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, FormControl, FormLabel, FormErrorMessage, Select, RadioGroup, Stack, Radio, Textarea, Button, useMediaQuery } from "@chakra-ui/react";
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
                {({ field, form }) => (
                  <FormControl isInvalid={form.touched.time && form.errors.time} mb='42px' display={{ base: 'block', md: 'grid' }} gridTemplateColumns='1fr 1fr'>
                    <FormLabel htmlFor="time">
                      <CardTitle>Time</CardTitle>
                    </FormLabel>
                    <Select placeholder="Select option" {...field}>
                      {availableTimes.map(time => <option key={time} value={time}>{time}</option>)}
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