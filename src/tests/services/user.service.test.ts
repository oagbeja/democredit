// @ts-nocheck

import UserService from "../../services/user.service";
import { signupInput } from "../../utils/interfaces";
import { signToken } from "../../utils/jwt";
import db from "../../utils/db";
import { hashPassword } from "../../utils/bcryptHelper";

// Mock the db utility
jest.mock("../../utils/db");

jest.mock("../../utils/jwt");

describe("Sign up User", () => {
  let userService: UserService;

  let mockDb: any;
  let trx: any;

  beforeEach(() => {
    userService = new UserService();

    trx = {
      insert: jest.fn(),
      where: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      first: jest.fn(),
    };

    mockDb = {
      transaction: jest.fn((cb) => cb(trx)),
      where: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      first: jest.fn(),
    };

    // Ensure db returns mockDb for transaction handling
    (db as jest.Mock).mockImplementation(() => mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const input: signupInput = {
    firstName: "John",
    lastName: "Doe",
    nin: 90909090901,
    email: "john@example.com",
    password: "Test@123830",
  };

  const userId = 1;
  const walletId = 1;
  const userUuid = "a2a64ec4-3d1a-11ef-b470-b901d52a5119";
  const walletUuid = "a2a64ef2-3d1a-11ef-b470-b901d52a5119";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJTZWd1biIsImVtYWlsIjoia2RsYTFAdGVzdzQuY29tIiwiaWQiOiJhMjFkN2M3Mi0zZTBhLTExZWYtYjlkMi0zNzhkMWVlZTUyY2UiLCJsYXN0TmFtZSI6IlRvbGEiLCJpYXQiOjE3MjA1NDAwODZ9.MMWNj4k_1AvWXHIdwEMouslQvJtWrjbKl_qnUzpOAa4";
  const amount = 0;

  it("should  be sucessful ", async () => {
    // Mock the isBlacklisted method
    jest.spyOn(userService, "isBlacklisted").mockResolvedValue(false);

    trx.insert
      .mockResolvedValueOnce([userId])
      .mockResolvedValueOnce([walletId]);
    trx.first
      .mockResolvedValueOnce({ uuid: userUuid })
      .mockResolvedValueOnce({ uuid: walletUuid, amount });

    // Mocking the additional query result
    mockDb.where.mockReturnThis();
    mockDb.orWhere.mockReturnThis();
    mockDb.first.mockResolvedValueOnce(undefined);

    signToken.mockReturnValue(token);

    const result = await userService.signupUser(input);

    expect(result).toBeInstanceOf(Object);
  });

  it("should  be blacklisted ", async () => {
    // Mock the isBlacklisted method
    jest.spyOn(userService, "isBlacklisted").mockResolvedValue(true);

    expect.assertions(1);
    try {
      await userService.signupUser(input);
    } catch (error) {
      expect(error.message).toBe("401****Sorry, you are Karma blacklisted");
    }
  });

  it("should be able to find existing Users ", async () => {
    // Mock the isBlacklisted method
    jest.spyOn(userService, "isBlacklisted").mockResolvedValue(false);
    mockDb.where.mockReturnThis();
    mockDb.orWhere.mockReturnThis();
    mockDb.first.mockResolvedValueOnce({ nin: input.nin, email: input.email });

    expect.assertions(1);
    try {
      await userService.signupUser(input);
    } catch (error) {
      expect(error.message).toBe("401****User already exists");
    }
  });
});

describe("Login User", () => {
  let userService: UserService;

  let mockDb: any;
  beforeEach(() => {
    userService = new UserService();

    mockDb = {
      where: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      first: jest.fn(),
    };

    // Ensure db returns mockDb for transaction handling
    (db as jest.Mock).mockImplementation(() => mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const input: loginInput = {
    email: "john@example.com",
    password: "Test@123830",
  };

  const uuid = "a2a64ef2-3d1a-11ef-b470-b901d52a5119";
  const walletUuid = "a2a64ef2-3d1a-11ef-b470-b901d52a5130";
  const lastName = "Doe";
  const firstName = "John";
  const id = 1;
  const amount = 90;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJTZWd1biIsImVtYWlsIjoia2RsYTFAdGVzdzQuY29tIiwiaWQiOiJhMjFkN2M3Mi0zZTBhLTExZWYtYjlkMi0zNzhkMWVlZTUyY2UiLCJsYXN0TmFtZSI6IlRvbGEiLCJpYXQiOjE3MjA1NDAwODZ9.MMWNj4k_1AvWXHIdwEMouslQvJtWrjbKl_qnUzpOAa4";

  it("should login with password", async () => {
    const hashedPassword: string = await hashPassword(input.password);

    // Mocking the additional query result
    mockDb.where.mockReturnThis();
    mockDb.orWhere.mockReturnThis();

    mockDb.first.mockResolvedValueOnce({
      password: hashedPassword,
      id,
      uuid,
      last_name: lastName,
      first_name: firstName,
    });

    mockDb.first.mockResolvedValueOnce({
      uuid: walletUuid,
      amount,
    });

    signToken.mockReturnValue(token);

    let result = await userService.login(input);

    expect(result).toEqual({
      token,
      firstName,
      email: input.email,
      id: uuid,
      lastName,
      walletId: walletUuid,
      amount,
    });
  });

  it("should not login with wrong password", async () => {
    const hashedPassword: string = await hashPassword("Hello");

    // Mocking the additional query result
    mockDb.where.mockReturnThis();
    mockDb.orWhere.mockReturnThis();

    mockDb.first.mockResolvedValueOnce({
      password: hashedPassword,
      id,
      uuid,
      last_name: lastName,
      first_name: firstName,
    });

    expect.assertions(1);
    try {
      await userService.login(input);
    } catch (error) {
      expect(error.message).toBe("Invalid password");
    }
  });

  it("should not login with wrong email", async () => {
    // Mocking the additional query result
    mockDb.where.mockReturnThis();
    mockDb.orWhere.mockReturnThis();

    mockDb.first.mockResolvedValueOnce();

    expect.assertions(1);
    try {
      await userService.login(input);
    } catch (error) {
      expect(error.message).toBe("User not found");
    }
  });
});
