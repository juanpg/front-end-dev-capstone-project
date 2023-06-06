import React from 'react';
import { DatePicker } from 'antd';
import { Field } from 'formik';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

dayjs.extend(customParseFormat);

const DateInput = ({ label, name, ...rest }) => {
  return (
    <Field name={name}>
      {
        ({ field, form }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <FormControl isInvalid={form.touched[name] && form.errors[name] } mb={3}>
              <FormLabel>{label}</FormLabel>
              <DatePicker
                id={name}
                {...field}
                {...rest}
                value={value ? dayjs(value, 'YYYY-MM-DD') : null}
                status={form.touched[name] && form.errors[name] ? 'error' : ''}
                onChange={val => setFieldValue(name, val ? val.format('YYYY-MM-DD') : null)}
              />
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          );
        }
      }
    </Field>
  );
};

export default DateInput;
