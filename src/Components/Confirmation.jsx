import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, FormControl, FormLabel, FormErrorMessage, Input, Checkbox, ButtonGroup, Button, Link, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent,  useMediaQuery, useDisclosure } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { Subtitle, CardTitle, SectionTitle, ParagraphText } from "../Components/Typography";
import { Form, Field, Formik } from "formik";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs';

dayjs.extend(customParseFormat);

export default function Confirmation({ values, onPrevious, onNext, ...rest }) {
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
            const result = submitAPI(values);
            if(result) {
              setTimeout(onOpen, 1000);
            } else {
              actions.setSubmitting(false);
              setSubmitError('An error occurred while submitting the information');
            }
          }}
        >
          {(props) => (
            <Form style={ { width: isLarge ? '600px' : '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' } } >
              { submitError && (
                <Alert status='error' mb={3}>
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