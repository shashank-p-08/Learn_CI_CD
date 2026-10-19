const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');

async function main() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix('api');
  await app.listen(0);

  try {
    const response = await fetch(`${await app.getUrl()}/api/customers`);
    if (!response.ok) {
      throw new Error(`Smoke request failed with HTTP ${response.status}`);
    }
  } finally {
    await app.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
