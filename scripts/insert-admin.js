#!/usr/bin/env node

import readline from "readline";
import argon2 from "argon2";
import Joi from "joi";
import UserRepo from "../dist/repositories/user.js";
import { db } from "../dist/config/db.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

const bodySchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
  user_role_id: Joi.number().integer().positive().required()
});

async function insertAdmin() {
  try {
    console.log("👤 Creating new admin user...\n");

    const email = await askQuestion("Email: ");
    const password = await askQuestion("Password (min 8 chars): ");
    const user_role_id = parseInt(await askQuestion("Role ID (Admin Role): "), 10);

    const newUser = { email, password, user_role_id };

    const { error } = bodySchema.validate(newUser);
    if (error) {
      console.error("\n❌ Validation Error:", error.details);
      rl.close();
      process.exit(1);
    }

    newUser.password = await argon2.hash(newUser.password);

    const trx = await db.transaction();

    try {
      const result = await UserRepo.default.insert(newUser, trx);
      await trx.commit();

      console.log("\n✅ Admin user created successfully!");
      console.log("User ID:", result.id);
    } catch (err) {
      await trx.rollback();
      console.error("\n❌ Error inserting admin user:", err.message);
    }
  } catch (err) {
    console.error("\n❌ Unexpected error:", err.message);
  } finally {
    rl.close();
    process.exit(0);
  }
}

insertAdmin();
