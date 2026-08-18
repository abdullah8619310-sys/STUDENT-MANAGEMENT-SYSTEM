import { describe, it, expect, vi, afterEach } from "vitest";
import { registerUser, loginUser } from "./auth.controller.js";
import { prisma } from "../config/db.js";
import { hashPassword } from "../utils/password.js";

describe("registerUser controller", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a user with a hashed password and return 201", async () => {
    const mockUser = {
      id: 1,
      name: "Sara Khan",
      email: "sara@example.com",
      role: "TEACHER",
      createdAt: new Date(),
    };

    vi.spyOn(prisma.user, "create").mockResolvedValue(mockUser);

    const req = {
      body: {
        name: "Sara Khan",
        email: "sara@example.com",
        password: "plainPassword123",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await registerUser(req, res);

    expect(prisma.user.create).toHaveBeenCalledTimes(1);

    const createArgs = prisma.user.create.mock.calls[0][0];

    expect(createArgs.data.name).toBe("Sara Khan");
    expect(createArgs.data.email).toBe("sara@example.com");
    expect(createArgs.data.password).not.toBe("plainPassword123");

    expect(createArgs.select).toEqual({
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    });

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      user: mockUser,
      token: expect.any(String),
    });
  });
});

describe("loginUser controller", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return 200 with user and token when credentials are correct", async () => {
    const hashedPassword = await hashPassword("correctPassword");

    const mockUser = {
      id: 1,
      name: "Sara Khan",
      email: "sara@example.com",
      password: hashedPassword,
      role: "TEACHER",
      createdAt: new Date(),
    };

    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser);

    const req = {
      body: {
        email: "sara@example.com",
        password: "correctPassword",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await loginUser(req, res);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: "sara@example.com",
      },
    });

    expect(res.status).toHaveBeenCalledWith(200);

    const response = res.json.mock.calls[0][0];

    expect(response.user.password).toBeUndefined();
    expect(response.user.email).toBe("sara@example.com");
    expect(response.token).toEqual(expect.any(String));
  });

  it("should return 401 when the user does not exist", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

    const req = {
      body: {
        email: "nobody@example.com",
        password: "whatever",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password",
    });
  });

  it("should return 401 when the password is incorrect", async () => {
    const hashedPassword = await hashPassword("correctPassword");

    const mockUser = {
      id: 1,
      name: "Sara Khan",
      email: "sara@example.com",
      password: hashedPassword,
      role: "TEACHER",
      createdAt: new Date(),
    };

    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser);

    const req = {
      body: {
        email: "sara@example.com",
        password: "wrongPassword",
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password",
    });
  });
});