// Mocking the isBlacklisted function
export const mockIsBlacklisted = jest.fn(async (email) => {
  // Example implementation for mock
  return email === "blacklisted@example.com";
});

// Mocking the database functions
export const mockDb = {
  transaction: jest.fn(async (callback) => {
    return await callback(mockTrx);
  }),
};

// Mock transaction object for db
export const mockTrx = {
  users: {
    insert: jest.fn(async () => [1]),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValue({ uuid: "12345" }),
  },
  wallets: {
    insert: jest.fn(async () => [1]),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValue({ uuid: "wallet123", amount: 100 }),
  },
};

// Mocking hashPassword function
export const mockHashPassword = jest.fn(async (_) => {
  // Example implementation for mock
  return "hashedPassword";
});

// Mocking signToken function
export const mockSignToken = jest.fn((_) => {
  // Example implementation for mock
  return "mockToken";
});

// Mocking logger
export const mockLogger = {
  error: jest.fn(),
};
