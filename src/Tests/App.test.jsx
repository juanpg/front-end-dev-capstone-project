import { describe, expect, test } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router";
import Home from "../Pages/Home";

describe("Home test", () => {
  test("Should show navigation", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);

    expect(screen.getByText(/This is the home page/i)).toBeDefined()
  })
})