import { vi, describe, expect, test, beforeEach, beforeAll } from "vitest";
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { theme } from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import dayjs from "dayjs";

import EventDetails from "../Components/EventDetails";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, 'fetchAPI', {
  writable: true,
  value: vi.fn().mockImplementation(date => ['17:00', '17:30'])
});

describe("Event details - Step 1", () => {
  test("Next button disabled when form is empty", async () => {
    const values = {
      date: '',
      time: '',
      diners: '',
      seatingOptions: '',
      comments: ''
    };
    const handleNext = vi.fn();
    render(<ChakraProvider theme={theme}><EventDetails values={values} onNext={handleNext} /></ChakraProvider>)
    const nextButton = await screen.findByText(/Next/i)
    expect(nextButton).toBeDefined()
    expect(nextButton.getAttribute('disabled')).toBeDefined()
  })

  test("Attempt to enter today's date shouldn't work", async () => {
    const user = userEvent.setup()
    const values = {
      date: '',
      time: '',
      diners: '',
      seatingOptions: '',
      comments: ''
    }
    const handleNext = vi.fn()
    render(<ChakraProvider theme={theme}><EventDetails values={values} onNext={handleNext} /></ChakraProvider>)

    const dateInput = await screen.findByLabelText(/Date/i)
    expect(dateInput).toBeDefined()

    await user.click(dateInput)

    const todaysCell = document.querySelector('.ant-picker-cell-today')
    try {
      await user.click(todaysCell)
    } catch (error) {
      return true      
    }
    throw Error("Was able to click on today")
  })

  test("Enter tomorrow's date", async () => {
    const user = userEvent.setup()
    const values = {
      date: '',
      time: '',
      diners: '',
      seatingOptions: '',
      comments: ''
    }
    const handleNext = vi.fn()
    render(<ChakraProvider theme={theme}><EventDetails values={values} onNext={handleNext} /></ChakraProvider>)

    const dateInput = await screen.findByLabelText(/Date/i)
    expect(dateInput).toBeDefined()

    await user.click(dateInput)

    await user.clear(dateInput)

    const tomorrow = dayjs().add(1, 'day').format('MM/DD/YYYY')
    
    await user.type(dateInput, tomorrow)

    await user.tab()

    expect(dateInput.value).toBe(tomorrow)
  })

  test("Time options should be empty", async () => {
    const user = userEvent.setup()
    const values = {
      date: '',
      time: '',
      diners: '',
      seatingOptions: '',
      comments: ''
    }
    const handleNext = vi.fn()
    render(<ChakraProvider theme={theme}><EventDetails values={values} onNext={handleNext} /></ChakraProvider>)

    const timeInput = await screen.findByLabelText(/Time/i)
    expect(timeInput).toBeDefined()

    const timeOptions = timeInput.querySelectorAll('option')

    expect(timeOptions.length).toBe(1)
  })

  test("Time options should be have options after date has been entered", async () => {
    const user = userEvent.setup()
    const values = {
      date: '',
      time: '',
      diners: '',
      seatingOptions: '',
      comments: ''
    }
    const handleNext = vi.fn()
    render(<ChakraProvider theme={theme}><EventDetails values={values} onNext={handleNext} /></ChakraProvider>)

    const dateInput = await screen.findByLabelText(/Date/i)
    expect(dateInput).toBeDefined()

    await user.click(dateInput)

    await user.clear(dateInput)

    const tomorrow = dayjs().add(1, 'day').format('MM/DD/YYYY')
    
    await user.type(dateInput, tomorrow)

    await user.tab()

    const timeInput = await screen.findByLabelText(/Time/i)
    expect(timeInput).toBeDefined()

    const timeOptions = timeInput.querySelectorAll('option')

    expect(timeOptions.length).not.toBe(1)
  })

  test("Next button should be enabled after all required fields", async () => {
    const user = userEvent.setup()
    const values = {
      date: '',
      time: '',
      diners: '',
      seatingOptions: '',
      comments: ''
    }
    const handleNext = vi.fn( (values) => {
      return values.date === dayjs().add(1, 'day').format('YYYY-MM-DD')
          && values.time !== ''
          && values.diners === '1'
          && values.seatingOptions === 'standard'
          && values.comments === ''
    } )
    
    render(<ChakraProvider theme={theme}><EventDetails values={values} onNext={handleNext} /></ChakraProvider>)

    const nextButton = await screen.findByText(/Next/i)
    expect(nextButton).toBeDefined()
    expect(nextButton.getAttribute('disabled')).toBeDefined()

    const dateInput = await screen.findByLabelText(/Date/i)
    expect(dateInput).toBeDefined()

    await user.click(dateInput)

    await user.clear(dateInput)

    const tomorrow = dayjs().add(1, 'day').format('MM/DD/YYYY')
    
    await user.type(dateInput, tomorrow)

    await user.tab()

    expect(nextButton.getAttribute('disabled')).toBeDefined()

    const timeInput = await screen.findByLabelText(/Time/i)
    expect(timeInput).toBeDefined()

    const timeOptions = timeInput.querySelectorAll('option');
    userEvent.selectOptions(timeInput, timeOptions[1].value)

    expect(nextButton.getAttribute('disabled')).toBeDefined()

    const dinersInput = await screen.findByLabelText(/Number of diners/i)
    userEvent.type(dinersInput, '1')

    expect(nextButton.getAttribute('disabled')).toBeDefined()

    const occasion = await screen.findByLabelText(/Occasion/i)
    userEvent.selectOptions(occasion, 'birthday')

    expect(nextButton.getAttribute('disabled')).toBeDefined()

    const standardSeating = await screen.findByLabelText(/Standard/i)
    userEvent.click(standardSeating)

    expect(nextButton.getAttribute('disabled')).toBe(null)

    await userEvent.click(nextButton)

    expect(handleNext).toHaveReturned(true);
  })
})