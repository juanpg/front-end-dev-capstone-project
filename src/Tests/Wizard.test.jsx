import { vi, describe, expect, test, beforeEach, beforeAll } from "vitest";
import { render, screen } from '@testing-library/react';
import { theme } from "../theme";
import { ChakraProvider } from "@chakra-ui/react";

import Wizard from "../Components/Wizard";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("Wizard test", () => {
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

  test("Step count", async () => {
    render(<ChakraProvider theme={theme}><Wizard steps={steps} activeStep={0} /></ChakraProvider>)

    const wizardSteps = await screen.findAllByRole('status')

    expect(wizardSteps.length).toBe(steps.length)
  })

  test("First step is active", async () => {
    render(<ChakraProvider theme={theme}><Wizard steps={steps} activeStep={0} /></ChakraProvider>)

    const wizardSteps = await screen.findAllByRole('status')

    const firstStep = wizardSteps[0];
    const secondStep = wizardSteps[1];
    const thirdStep = wizardSteps[2];

    expect(firstStep.title).toBe('Step 1 - Current')
    expect(secondStep.title).toBe('Step 2 - Pending')
    expect(thirdStep.title).toBe('Step 3 - Pending')
  })

  test("Second step active, first step is complete", async () => {
    render(<ChakraProvider theme={theme}><Wizard steps={steps} activeStep={1} /></ChakraProvider>)

    const wizardSteps = await screen.findAllByRole('status')
    const firstStep = wizardSteps[0];
    const secondStep = wizardSteps[1];
    const thirdStep = wizardSteps[2]

    expect(firstStep.nodeName).toBe('svg')
    expect(firstStep.getAttribute('aria-label')).toBe('Step 1 - Complete')
    expect(secondStep.title).toBe('Step 2 - Current')
    expect(thirdStep.title).toBe('Step 3 - Pending')
  })

  test("Third step active, first two are complete", async () => {
    render(<ChakraProvider theme={theme}><Wizard steps={steps} activeStep={2} /></ChakraProvider>)

    const wizardSteps = await screen.findAllByRole('status')
    const firstStep = wizardSteps[0];
    const secondStep = wizardSteps[1];
    const thirdStep = wizardSteps[2]

    expect(firstStep.nodeName).toBe('svg')
    expect(firstStep.getAttribute('aria-label')).toBe('Step 1 - Complete')
    expect(secondStep.nodeName).toBe('svg')
    expect(secondStep.getAttribute('aria-label')).toBe('Step 2 - Complete')
    expect(thirdStep.title).toBe('Step 3 - Current')
  })
})