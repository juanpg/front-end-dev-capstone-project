import { useState, useRef, useEffect } from "react";
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, FormControl, FormLabel, FormErrorMessage, Radio, Input, ButtonGroup, Button, useMediaQuery } from "@chakra-ui/react";
import { CardTitle, SectionTitle } from "../Components/Typography";
import { Form, Field, Formik } from "formik";
import * as Yup from 'yup';
import 'yup-phone-lite';

export default function CustomerDetails({ values, onPrevious, onNext, ...rest }) {
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
                <Button type='button' aria-label='Go to previous step' bg='primary.green' w='320px' h='60px' onClick={() => onPrevious(props.values)}>
                  <SectionTitle>PREVIOUS</SectionTitle>
                </Button>
                <Button type='submit' aria-label="Go to next step" bg='primary.yellow' w='320px' h='60px' isLoading={props.isSubmitting} isDisabled={!props.isValid}>
                  <SectionTitle>NEXT</SectionTitle>                
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}