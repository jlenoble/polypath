import path from 'path';
import untildify from 'untildify';

export const absolute = arg => {
  switch (arg[0]) {
  case '/':
    return arg;
  case '~':
    return untildify(arg);
  case '!':
    return '!' + absolute(arg.substring(1));
  default:
    return path.resolve(arg);
  }
};
