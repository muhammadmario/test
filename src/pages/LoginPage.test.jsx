// src/__tests__/LoginPage.test.jsx
import { fireEvent, screen, waitFor, describe, it, mock } from "vitest";
import LoginPage from "./LoginPage";
import { render } from "@testing-library/react";
import { JSDOM } from "jsdom";

// Set up a simple DOM for the tests
const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window;

describe("LoginPage Component", () => {
  it("renders login form correctly", async () => {
    render(<LoginPage />);

    // Check if the login form elements are present
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("handles login correctly", async () => {
    render(LoginPage);

    // Mock axios.post
    mock(
      globalThis,
      "axios.post",
      mock.fn().mockResolvedValue({ data: { token: "your_mocked_token" } })
    );

    // Fill in the login form
    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "eve.holt@reqres.in" },
    });
    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "cityslicka" },
    });

    // Trigger the form submission
    fireEvent.click(screen.getByText("Login"));

    // Wait for the axios.post mock to resolve
    await waitFor(() => {
      // Check if the login function has been called with the correct arguments
      expect(globalThis.axios.post).toHaveBeenCalledWith(
        "https://reqres.in/api/login",
        {
          email: "test@example.com",
          password: "password123",
        }
      );

      // Check if the user is redirected after successful login
      expect(globalThis.location.pathname).toEqual("/");
    });
  });

  it("handles login error", async () => {
    render(LoginPage);

    // Mock axios.post to throw an error
    mock(
      globalThis,
      "axios.post",
      mock.fn().rejects({
        response: { data: { error: "Invalid credentials" } },
      })
    );

    // Fill in the login form
    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Trigger the form submission
    fireEvent.click(screen.getByText("Login"));

    // Wait for the axios.post mock to reject
    await waitFor(() => {
      // Check if the error message is displayed
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
