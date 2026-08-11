import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "./app.js";
import { prisma } from "./config/db.js";
import { hashPassword } from "./utils/password.js";

describe("Integration: authentication and student creation", () => {
  const testEmail = `integration-admin-${Date.now()}@example.com`;
  const testPassword = "IntegrationTest123!";
  const testRollNumber = `INT-${Date.now()}`;

  let adminUser;
  let createdStudent;

  it("should login as admin and create a student", async () => {
    const hashedPassword = await hashPassword(testPassword);

    adminUser = await prisma.user.create({
      data: {
        name: "Integration Admin",
        email: testEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: testEmail,
        password: testPassword,
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
    expect(loginResponse.body.user.email).toBe(testEmail);
    expect(loginResponse.body.user.role).toBe("ADMIN");

    const token = loginResponse.body.token;

    const createResponse = await request(app)
      .post("/api/students")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Integration Test Student",
        email: `integration-student-${Date.now()}@example.com`,
        rollNumber: testRollNumber,
        department: "IT",
        userId: adminUser.id,
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.name).toBe("Integration Test Student");
    expect(createResponse.body.rollNumber).toBe(testRollNumber);
    expect(createResponse.body.userId).toBe(adminUser.id);

    createdStudent = createResponse.body;
  });

  afterAll(async () => {
    if (createdStudent?.id) {
      await prisma.student.delete({
        where: {
          id: createdStudent.id,
        },
      });
    }

    if (adminUser?.id) {
      await prisma.user.delete({
        where: {
          id: adminUser.id,
        },
      });
    }

    await prisma.$disconnect();
  });
});