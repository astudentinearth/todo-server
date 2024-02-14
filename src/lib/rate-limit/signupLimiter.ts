import { RateLimiterRedis } from "rate-limiter-flexible";
import { redisClient } from "../db";

/** Maximum number of accounts a client can create per day. */
const MAX_ACCOUNTS_BY_IP: number = 5;

/** Maximum number of signup requests a client can send every 6 hours. */
const MAX_ATTEMPTS_BY_IP: number = 50;

const limitAccountByIP = new RateLimiterRedis({
    storeClient: redisClient,
    useRedisPackage: true,
    keyPrefix: "signup_max_accounts_by_ip",
    points: MAX_ACCOUNTS_BY_IP,
    duration: 60 * 60 * 24,
    blockDuration: 60 * 60 * 24
});

const limitAttemptsByIP = new RateLimiterRedis({
    storeClient: redisClient,
    useRedisPackage: true,
    keyPrefix: "signup_max_attempts_by_ip",
    points: MAX_ATTEMPTS_BY_IP,
    duration: 60 * 60 * 6,
    blockDuration: 60 * 60 * 6
});

export const signupLimiter = {MAX_ACCOUNTS_BY_IP, MAX_ATTEMPTS_BY_IP, limitAccountByIP, limitAttemptsByIP};