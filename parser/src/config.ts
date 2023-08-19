import { config as envConfig } from "dotenv";
envConfig();

const config = {
    TON_API_URL: "https://tonapi.io/v2",
    TON_API_SERVER_MAIN_KEY: `Bearer ${process.env.TON_API_SERVER_MAIN_KEY || ""}`,
}

export const TON_REQ_HEADER = {
    headers: {
        'Authorization': config.TON_API_SERVER_MAIN_KEY,
    },
}

export default config;
