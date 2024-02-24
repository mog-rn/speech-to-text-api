import {buildServer} from "./utils/server";
import {logger} from "./utils/logger";
import {env} from "./config/env";

async function gracefulShutdown({app}: {
    app: Awaited<ReturnType<typeof buildServer>>
}) {

    await app.close();
}

async function main() {
    const app = await buildServer();
    await app.listen({
        port: +env.PORT,
        host: env.HOST,
    });

    logger.debug(env);

    // await migrate(db, {
    //     migrationsFolder: "./migrations",
    // })

    const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

    for (const signal of signals) {
        process.on(signal, async () => {
            logger.info(`Received ${signal}`);
            await gracefulShutdown({app});
        });
    }
}

main().then(() => {});