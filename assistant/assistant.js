import { APP_DEBUG } from '../config/index.js';
import {
  PARTICIPANT_AI,
  PARTICIPANT_HUMAN,
  FINISH_REASON_STOP,
  complete,
} from '../services/openai.js';
import Storage from './storage.js';

class Assistant {
  storage = new Storage();

  handleEvents(events = []) {
    return Promise.all(events.map(event => this.handleEvent(event)));
  }

  async formatEvent({ userId, message, ...rest }) {
    const prompt = this.storage.getPrompt(userId);
    prompt.write(`${PARTICIPANT_HUMAN}: ${message.text}？`);
    try {
      const { text } = await this.chat({ prompt: prompt.toString() });
      prompt.write(`${PARTICIPANT_AI}: ${text}`);
      this.storage.setPrompt(userId, prompt);
      return { messages: [{ type: message.type, text }], ...rest };
    } catch (err) {
      console.error(err);
      return {
        messages: [{ type: message.type, text: err.message }],
        ...rest,
      };
    }
  }

  async chat({ prompt, text = '' }) {
    const { data } = await complete({ prompt });
    const [choice] = data.choices;
    prompt += choice.text.trim();
    text += choice.text
      .replace(PARTICIPANT_AI, '')
      .replace(':', '')
      .replace('：', '')
      .trim();
    const res = { prompt, text };
    return choice.finish_reason === FINISH_REASON_STOP ? res : this.chat(res);
  }

  debug() {
    if (APP_DEBUG) console.info(this.storage.toString());
  }
}

export default Assistant;

