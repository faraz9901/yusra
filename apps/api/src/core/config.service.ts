import dotenv from 'dotenv';

const isTest = process.env.NODE_ENV === 'test';

if (isTest) {
    dotenv.config({ path: '.env.test', override: true });
} else {
    dotenv.config();
}

// Central place for reading and validating environment variables
type ENV_VARIABLES = 'PORT' | 'DATABASE_URL' | 'NODE_ENV' | 'JWT_SECRET';

class ConfigService {

    constructor(private env: { [key: string]: string | undefined }) { }

    // Read a single environment variable and optionally throw if it is missing
    getValue(key: ENV_VARIABLES, throwOnMissing = false): string {

        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value || "";
    }

    // Ensure that all required keys exist when the app boots
    public ensureValues(keys: ENV_VARIABLES[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    // Port used by the HTTP server
    public getPort() {
        return Number(this.getValue("PORT"));
    }



}

const configService = new ConfigService(process.env)
    .ensureValues([
        "PORT",
        "DATABASE_URL",
        "NODE_ENV",
        "JWT_SECRET",
    ]);


export { configService };

