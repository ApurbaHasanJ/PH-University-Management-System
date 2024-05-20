import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Export the configuration
export default {
  port: process.env.PORT || 5000, // Default to port 3000 if PORT is not defined
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND
};
