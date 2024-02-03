import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Form } from "./Form";

describe("Form", () => {
  it("register required name and required properties", async () => {
    const formMethodsMock = {
      register: jest.fn(),
      handleSubmit: jest.fn(),
      control: jest.fn(),
      formState: { errors: [], isSubmitSuccessful: false },
    };

    await render(
      <MemoryRouter>
        <Form
          t={(k) => (k)}
          formMethods={formMethodsMock}
          properties={[]}
        />
      </MemoryRouter>
    );
    
    expect(await formMethodsMock.register).toHaveBeenCalledTimes(2);
    expect(await formMethodsMock.register).toHaveBeenCalledWith("name", {required: "lots.create.errors.requiredName"});
    expect(await formMethodsMock.register).toHaveBeenCalledWith("parcel", {required: "lots.create.errors.requiredProperty"});
  });

  it("no properties alert in document", async () => {
    const formMethodsMock = {
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: [], isSubmitSuccessful: false },
    };

    await render(
      <MemoryRouter>
        <Form
          t={(k) => (k)}
          formMethods={formMethodsMock}
          properties={[]}
        />
      </MemoryRouter>
    );
    expect(await screen.findByText(/noPropertiesMsg/i)).toBeInTheDocument();
  });

  it("expect save btn to be enabled", async () => {
    const formMethodsMock = {
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: [], isSubmitSuccessful: false },
    };

    await render(
      <MemoryRouter>
        <Form
          t={(k) => (k)}
          formMethods={formMethodsMock}
          properties={[]}
        />
      </MemoryRouter>
    );
    expect(await screen.findByText(/saveBtn/i)).toBeEnabled();
  });
});
