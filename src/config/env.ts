import zennv from 'zennv';
import { z } from 'zod';

export const env = zennv({
    dotenv: true,
    schema: z.object({
        PORT: z.string().default('3000'),
        HOST: z.string().default('0.0.0.0'),
        DATABASE_CONNECTION: z.string().default(''),
        NODE_ENV: z.string().default('development'),
        LOG_LEVEL: z.string().default('debug'),
        LOG_PRETTY: z.boolean().default(false),
    })
});