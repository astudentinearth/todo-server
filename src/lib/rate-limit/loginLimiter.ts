import { RateLimiterRedis } from "rate-limiter-flexible";
import { redisClient } from "@/lib/db"

/**
 * Maximum number of failed attempts per day before the IP address gets blocked for a day.
 */
const MAX_FAILURES_BY_IP = 100;

/**
 * Maximum number of consecutive fails by username-IP pair before 1 hour of blockage.
 */
const MAX_CONSECUTIVE_FAILS = 10;

/** Limits failed login attempts by IP per day. */
const limiterBruteForceByIP = new RateLimiterRedis({
    storeClient: redisClient,
    useRedisPackage: true,
    keyPrefix: "login_ip_fails_per_day",
    points: MAX_FAILURES_BY_IP,
    duration: 60 * 60 * 24,
    blockDuration: 60 * 60 * 24
});

/** Limits failed consecutive login attempts by username+IP. */
const limiterConsecutiveFailsByPair = new RateLimiterRedis({
    storeClient: redisClient,
    useRedisPackage: true,
    keyPrefix: "login_consecutive_fails_by_username_and_ip",
    points: MAX_CONSECUTIVE_FAILS,
    duration: 60 * 60 * 24 * 90,
    blockDuration: 60 * 60
});

const getUsernameIPkey = (username:string, ip:string) => `${username}_${ip}`;

export const loginLimiter = {limiterBruteForceByIP, limiterConsecutiveFailsByPair, getUsernameIPkey, MAX_CONSECUTIVE_FAILS, MAX_FAILURES_BY_IP};