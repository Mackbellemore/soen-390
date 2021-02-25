/* eslint-disable promise/always-return */
import { App } from './App';
const app = new App();

const uncaughtException = (err: Error): void => {
  console.error(err.message, null, ['uncaught', 'exception'], {
    stack: err.stack,
  });
  process.exit(1);
};

const gracefulClose = () => {
  app
    .close()
    .then(() => {
      console.log('gracefully shutting down');
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
};

process.on('uncaughtException', uncaughtException);

// Catch any unhandledRejection events and console error it for debugging
process.on('unhandledRejection', (reason: string, p: Promise<unknown>) => {
  console.error(`Unhandled Rejection at: Promise', ${p}, reason: ${reason}`, null, [
    'unhandled',
    'rejection',
  ]);
});

// close our application when the user kills the server or the server exits unexpectedly
process.on('SIGTERM', gracefulClose);
process.on('SIGINT', gracefulClose);

// This is the absolute start of our entire backend
app
  .init()
  .then(() => {
    return app.start();
  })
  .catch(uncaughtException);
