import "dotenv/config";

export const configDotenvPort = () => { return {port: process.env.PORT || 3002}; };

