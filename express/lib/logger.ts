import path from 'path';
import winston, { format, transports } from 'winston';
import { SPLAT } from 'triple-beam';
import { isObject, trimEnd } from 'lodash';

const { combine, timestamp, printf, align, errors, colorize } = format;

function formatObject(param: any) {
  if (param && param.stack) {
    if (param.ctx && param.type) {
      return JSON.stringify(
        {
          code: param.code,
          type: param.type,
          data: param.data,
        },
        null,
        2
      );
    }
    return JSON.stringify(param);
  }
  if (isObject(param)) {
    return JSON.stringify(param);
  }
  return param;
}

const all = format((info: any) => {
  const splat = info[SPLAT] || [];

  const isSplatTypeMessage = typeof info.message === 'string' && (info.message.includes('%s') || info.message.includes('%d') || info.message.includes('%j'));
  if (isSplatTypeMessage) {
    return info;
  }
  let message = formatObject(info.message);
  const rest = splat.map(formatObject).join(' ');
  message = trimEnd(`${message} ${rest}`);
  return { ...info, message };
});

const file = (thisModule?: NodeModule) =>
  format((info: any) => {
    if (!thisModule) {
      return info;
    }
    const BASE_PATH = path.resolve('.');
    const fileName = thisModule.filename;
    const moduleName = fileName.split(BASE_PATH)[1];
    return { ...info, moduleName };
  });

// replace authorization token in the header with '*'
const ignoreAuthorization = format((error) => {
  if (error.config?.headers?.Authorization) {
    // eslint-disable-next-line no-param-reassign
    error.config.headers.Authorization = error.config.headers.Authorization.replace(/./gi, '*');
  }
  return error;
});

export class Logger {
  public static create(thisModule: NodeModule) {
    return winston.createLogger({
      format: combine(
        ignoreAuthorization(),
        errors({ stack: true }),
        colorize(),
        all(),
        file(thisModule)(),
        timestamp(),
        align(),
        printf((info) => `[${new Date(info.timestamp).toLocaleString()}] ${info.level}  [${info.moduleName}]: ${info.message} ${info.stack ? `\n${info.stack}` : ''}`)
      ),
      transports: [new transports.Console()],
    });
  }
}
