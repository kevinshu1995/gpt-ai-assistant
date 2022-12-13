import Assistant from './../assistant.js';
import { APP_ENV } from '../../config/index.js';

class DiscordAssistant extends Assistant {
  async handleEvent({ userId, message }) {
    const requestMessage = {
      text: message,
      type: 'text',
    };

    const response = await this.formatEvent({
      userId,
      message: requestMessage,
      type: 'text',
    });

    return response.messages[0].text;
  }
}

export default DiscordAssistant;

