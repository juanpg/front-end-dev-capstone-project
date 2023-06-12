import { vi, describe, expect, test, beforeEach } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import Reservations from "../Pages/Reservations";

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

// https://www.eternaldev.com/blog/testing-a-react-application-with-vitest/

describe("Reservations test", () => {
  beforeEach(() => render(<ChakraProvider><MemoryRouter><Reservations /></MemoryRouter></ChakraProvider>) )
  test("Should render", async () => {
    expect(await screen.findByText(/Find a table for any occasion./i)).toBeDefined()
  })

  test("Should show 3 steps", async () => {
    expect(await screen.findByText(/First/i)).toBeDefined()
    expect(await screen.findByText(/Second/i)).toBeDefined()
    expect(await screen.findByText(/Third/i)).toBeDefined()
  })

  test("First step should be active", async () => {
    expect(await screen.findByText(/Enter the Event Details/i)).toBeDefined()
  })

  test("Next button should be disabled", async () => {
    const nextButton = await screen.findByText(/Next/i)
    expect(nextButton).toBeDefined()
    expect(nextButton.getAttribute('disabled')).toBeDefined()
  })
})