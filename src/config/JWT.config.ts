import * as dotenv from 'dotenv';
dotenv.config();

export const JWTConfig = {
  JWTSecretKey: process.env.JWT_SECRET,
  TimeExpiry: process.env.JWT_TIME_EXPIRY || '1d',
};
