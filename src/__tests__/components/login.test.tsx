/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminLoginPage from "@/app/admin/login/page";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

// Mock the logo asset
jest.mock("@/assets/logo.png", () => ({ src: "/logo.png", height: 36, width: 36 }));

describe("AdminLoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("renders the password input and sign-in button", () => {
    render(<AdminLoginPage />);

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows heading text", () => {
    render(<AdminLoginPage />);
    expect(screen.getByText(/admin panel/i)).toBeInTheDocument();
  });

  it("redirects to /admin/dashboard on successful login", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<AdminLoginPage />);

    await userEvent.type(screen.getByLabelText(/password/i), "correct-password");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin/dashboard");
    });
  });

  it("shows error message on failed login", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(<AdminLoginPage />);

    await userEvent.type(screen.getByLabelText(/password/i), "wrong-password");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid password/i)).toBeInTheDocument();
    });
  });

  it("calls the auth API with the entered password", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<AdminLoginPage />);

    await userEvent.type(screen.getByLabelText(/password/i), "my-secret");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/admin/auth",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ password: "my-secret" }),
      }),
    );
  });

  it("disables the button while loading", async () => {
    let resolveLogin: (v: unknown) => void;
    (global.fetch as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveLogin = resolve;
      }),
    );

    render(<AdminLoginPage />);
    const button = screen.getByRole("button", { name: /sign in/i });

    await userEvent.type(screen.getByLabelText(/password/i), "pass");
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/signing in/i);

    // Resolve the fetch to clean up
    resolveLogin!({ ok: false });
  });
});
