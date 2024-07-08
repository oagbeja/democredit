// Import your signupUser function
import UserService from "../../services/user.service";
import {
  mockDb,
  mockHashPassword,
  mockIsBlacklisted,
  mockSignToken,
  mockTrx,
} from "./mock";

import { sigupInput } from "../../utils/interfaces";

const userService = new UserService();
const signupUser = userService.signupUser;

describe("signupUser function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user successfully", async () => {
    const input: sigupInput = {
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      nin: 123456789,
      email: "newuser@example.com",
    };

    mockIsBlacklisted.mockResolvedValue(false);
    mockDb.transaction.mockImplementation(
      async (callback) => await callback(mockTrx)
    );
    mockHashPassword.mockResolvedValue("hashedPassword");
    mockSignToken.mockReturnValue("mockToken");

    const result: any = await signupUser(input);

    expect(result.token).toBe("mockToken");
    expect(result.firstName).toBe("John");
    expect(result.email).toBe("newuser@example.com");
    expect(result.walletId).toBe("wallet123");
    expect(result.amount).toBe(100);

    expect(mockIsBlacklisted).toHaveBeenCalledWith("newuser@example.com");
    expect(mockDb.transaction).toHaveBeenCalledTimes(1);
    expect(mockHashPassword).toHaveBeenCalledWith("password123");
    expect(mockTrx.users.insert).toHaveBeenCalledWith({
      password: "hashedPassword",
      first_name: "John",
      last_name: "Doe",
      nin: "123456789",
      email: "newuser@example.com",
    });
  });

  it("should handle blacklisted email", async () => {
    const input: sigupInput = {
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      nin: 123456789,
      email: "blacklisted@example.com",
    };

    mockIsBlacklisted.mockResolvedValue(true);

    await expect(signupUser(input)).rejects.toThrow(
      "401****Sorry, you are Karma blacklisted"
    );

    expect(mockIsBlacklisted).toHaveBeenCalledWith("blacklisted@example.com");
    expect(mockDb.transaction).not.toHaveBeenCalled();
  });

  // Add more test cases for other scenarios (e.g., existing user, database errors)
});
