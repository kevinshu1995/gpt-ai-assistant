import express from 'express';
import { LineAssistant } from '../assistant/index.js';
import { validator } from '../middleware/index.js';
import { APP_URL, APP_PORT, LINE_API_SECRET } from '../config/index.js';
import '../services/discord.js';

const lineAssistant = new LineAssistant();

const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.get('/', (req, res) => {
  if (APP_URL) {
    res.redirect(APP_URL);
    return;
  }
  res.sendStatus(200);
});

app.post('/webhook', validator(LINE_API_SECRET), async (req, res) => {
  try {
    await lineAssistant.handleEvents(req.body.events);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
  lineAssistant.debug();
  res.sendStatus(200);
});

if (APP_PORT) {
  app.listen(APP_PORT);
}

export default app;

