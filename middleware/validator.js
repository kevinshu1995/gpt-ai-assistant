import { validateSignature } from '../utils/index.js';
import { APP_ENV } from '../config/index.js';

const validator = secret => (req, res, next) => {
  const signature = req.header('x-line-signature');
  if (APP_ENV === 'production') {
    if (secret && !validateSignature(req.rawBody, secret, signature)) {
      res.sendStatus(403);
      return;
    }
  }
  next();
};

export default validator;

