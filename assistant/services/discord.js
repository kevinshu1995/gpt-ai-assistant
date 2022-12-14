import Assistant from './../assistant.js';
import { APP_ENV } from '../../config/index.js';

class DiscordAssistant extends Assistant {
  async handleEvent({ replyToken, type, source, message }) {
    // if (type !== EVENT_TYPE_MESSAGE) return null;
    // if (message.type !== MESSAGE_TYPE_TEXT) return null;
    // const response = this.formatEvent({
    //   replyToken,
    //   type,
    //   userId: source.userId,
    //   message,
    // });
    // return APP_ENV === 'local' ? response : reply(response);
  }
}

export default DiscordAssistant;
