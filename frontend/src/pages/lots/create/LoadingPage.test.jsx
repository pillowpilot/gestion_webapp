import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoadingForm } from "./LoadingForm";


describe("Loading Form", () => {
  it("expect save btn to be disabled", async () => {
    const mockT = (k) => k;
    await render(
      <MemoryRouter>
        <LoadingForm t={mockT} />
      </MemoryRouter>
    );
    expect(await screen.findByText(/saveBtn/i)).toBeDisabled();
    });
});
