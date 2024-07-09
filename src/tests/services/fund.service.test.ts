// @ts-nocheck
import FundService from "../../services/fund.service";
import db from "../../utils/db";
import { anotherAccountInput, myAccountInput } from "../../utils/interfaces";

// Mock the db utility
jest.mock("../../utils/db");

describe("Fund My Account", () => {
  let userService: FundService;

  let mockDb: any;
  let trx: any;

  beforeEach(() => {
    userService = new FundService();

    trx = {
      insert: jest.fn(),
      where: jest.fn().mockReturnThis(),
      update: jest.fn(),
    };

    mockDb = {
      transaction: jest.fn((cb) => cb(trx)),
      where: jest.fn().mockReturnThis(),
      first: jest.fn(),
    };

    // Ensure db returns mockDb for transaction handling
    (db as jest.Mock).mockImplementation(() => mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const input: myAccountInput = {
    user: { userId: 1 },
    amount: 200,
  };

  it("should  be sucessful ", async () => {
    const amount = 100;

    trx.update.mockResolvedValueOnce();

    trx.insert.mockResolvedValueOnce();

    mockDb.first.mockResolvedValueOnce({ amount });

    const result = await userService.myAccount(input);

    expect(result).toEqual({ amount: 300 });
  });

  it("should  be unsuccesful, if there is amount in the db is not a number ", async () => {
    const amount = "";

    trx.update.mockResolvedValueOnce();

    trx.insert.mockResolvedValueOnce();

    mockDb.first.mockResolvedValueOnce({ amount });

    expect.assertions(1);
    try {
      await userService.myAccount(input);
    } catch (error) {
      expect(error.message).toBe("User with invalid initial amount");
    }
  });
});

describe("Fund Another User's Account", () => {
  let userService: FundService;

  let mockDb: any;
  let trx: any;

  beforeEach(() => {
    userService = new FundService();

    trx = {
      insert: jest.fn(),
      where: jest.fn().mockReturnThis(),
      update: jest.fn(),
    };

    mockDb = {
      transaction: jest.fn((cb) => cb(trx)),
      where: jest.fn().mockReturnThis(),
      first: jest.fn(),
    };

    // Ensure db returns mockDb for transaction handling
    (db as jest.Mock).mockImplementation(() => mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should  be sucessful ", async () => {
    const input: anotherAccountInput = {
      user: { userId: 1 },
      amount: 50,
      email: "user@example.com",
    };
    const amount = 100;

    trx.update.mockResolvedValueOnce();
    trx.update.mockResolvedValueOnce();

    trx.insert.mockResolvedValueOnce();

    mockDb.first.mockResolvedValueOnce({
      email: "anotherUser@example.com",
      id: 2,
    });
    mockDb.first.mockResolvedValueOnce({ amount });
    mockDb.first.mockResolvedValueOnce({ amount: 30 });

    const result = await userService.anotherAccount(input);

    expect(result).toEqual({ amount: 50 });
  });

  it("should  be unsuccesful, if the user is the same ", async () => {
    const amount = 30;
    const input: anotherAccountInput = {
      user: { userId: 1, email: "user@example.com" },
      amount: 50,
      email: "user@example.com",
    };

    expect.assertions(1);
    try {
      await userService.anotherAccount(input);
    } catch (error) {
      expect(error.message).toBe(
        "Not applicable. Try using fund my account module"
      );
    }
  });

  it("should  be unsuccesful, if the user does not exist ", async () => {
    const input: anotherAccountInput = {
      user: { userId: 1 },
      amount: 50,
      email: "user@example.com",
    };
    mockDb.first.mockResolvedValueOnce();

    expect.assertions(1);
    try {
      await userService.anotherAccount(input);
    } catch (error) {
      expect(error.message).toBe("user does not exist");
    }
  });

  it("should  be unsuccesful, Insufficient Amount ", async () => {
    const amount = 100;
    const input: anotherAccountInput = {
      user: { userId: 1, email: "user@example.com" },
      amount: 50,
      email: "anotherUser@example.com",
    };
    mockDb.first.mockResolvedValueOnce({
      email: input.email,
      id: 2,
    });
    mockDb.first.mockResolvedValueOnce({ amount });
    mockDb.first.mockResolvedValueOnce({ amount: 30 });

    // expect.assertions(1);
    try {
      await userService.anotherAccount(input);
    } catch (error) {
      expect(error.message).toBe(
        "Insufficient amount. Unable to transfer funds"
      );
    }
  });
});

describe("Withdraw from My Account", () => {
  let userService: FundService;

  let mockDb: any;
  let trx: any;

  beforeEach(() => {
    userService = new FundService();

    trx = {
      insert: jest.fn(),
      where: jest.fn().mockReturnThis(),
      update: jest.fn(),
    };

    mockDb = {
      transaction: jest.fn((cb) => cb(trx)),
      where: jest.fn().mockReturnThis(),
      first: jest.fn(),
    };

    // Ensure db returns mockDb for transaction handling
    (db as jest.Mock).mockImplementation(() => mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should  be sucessful ", async () => {
    const input: myAccountInput = {
      amount: 50,
      user: { userId: 1 },
    };
    const amount = 100;

    trx.update.mockResolvedValueOnce();

    trx.insert.mockResolvedValueOnce();

    mockDb.first.mockResolvedValueOnce({
      amount,
    });

    const result = await userService.withdraw(input);

    expect(result).toEqual({ amount: 50 });
  });

  it("should  be unsuccesful, Insufficient Amount ", async () => {
    const amount = 10;
    const input: anotherAccountInput = {
      amount: 50,
      user: { userId: 1 },
    };

    mockDb.first.mockResolvedValueOnce({ amount });

    // expect.assertions(1);
    try {
      await userService.withdraw(input);
    } catch (error) {
      expect(error.message).toBe("Insufficient amount to withdraw");
    }
  });
});
