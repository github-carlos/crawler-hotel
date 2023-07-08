import { CrawlerApp } from "src/app";
require('dotenv').config();

const app = new CrawlerApp();
const port = process.env.PORT;
app.start(port)

// Applying graceful shutdown
process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
});