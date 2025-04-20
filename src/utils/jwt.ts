import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants";
import { redis } from "../config/db";


export function signToken(payload: string | object | Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET_KEY,
            {
                // expiresIn: "1h"
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token!);
            });
    });
}

export async function verifyToken(token: string) {
    return new Promise(async (resolve, reject) => {

        jwt.verify(token, JWT_SECRET_KEY, {}, async (err, decoded) => {
            if (err) return reject(err);

            // Check if token is revoked in Redis
            // const token = await getToken((<any>decoded).id);
            // if (!token) return reject(new Error("Token revoked"));
            resolve(decoded);

        });
    });
}

export async function storeToken(userId: number, token: string) {
    const key = `auth:${userId}`;
    await redis.set(key, token, "EX", 3600); // 1-hour expiration
}

export async function getToken(userId: number) {
    return await redis.get(`auth:${userId}`);
}


export async function revokeToken(userId: number) {
    await redis.del(`auth:${userId}`);
}