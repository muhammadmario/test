// src/__tests__/LoginPage.test.jsx
import { render, fireEvent, screen, waitFor, describe, it } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage Component", () => {
  it("renders login form correctly", async () => {
    render(LoginPage);

    // Check if the login form elements are present
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("handles login correctly", async () => {
    render(LoginPage);

    // Mock axios.post
    globalThis.axios = {
      post: jest
        .fn()
        .mockResolvedValue({ data: { token: "your_mocked_token" } }),
    };

    // Fill in the login form
    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "password123" },
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
    globalThis.axios = {
      post: jest.fn().mockRejectedValue({
        response: { data: { error: "Invalid credentials" } },
      }),
    };

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
