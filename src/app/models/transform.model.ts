import { formatDate } from '@angular/common';
import { TransformationType, TransformFnParams } from 'class-transformer';
import { Base64 } from 'js-base64';
import { Time } from './time.model';

export function transformBase64(params: TransformFnParams) {
  if (params.value === undefined || params.value === null) return undefined;
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    if (isBase64(params.value)) {
      return Base64.decode(params.value);
    }
    return params.value;
  } else {
    return params.value;
  }
}

function isBase64(str: string) {
  if (str === undefined || str === null) return false;
  if (str.length % 4 !== 0) return false;
  if (!str.match(/^[a-zA-Z0-9\+/]+={0,2}$/)) return false;
  return true;
}

export function transformDateTime(params: TransformFnParams) {
  if (params.value === undefined || params.value === null) return undefined;
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    if (typeof params.value === 'string') {
      return new Date(params.value);
    } else if (typeof params.value === 'number') {
      return new Date(params.value);
    } else {
      return params.value;
    }
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return formatDate(params.value as Date, 'yyyy-MM-ddTHH:mm:ssZZZZZ', 'en');
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  } else {
    return '';
  }
}
export function transformDate(params: TransformFnParams) {
  if (params.value === undefined || params.value === null) return undefined;
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return formatDate(params.value as Date, 'yyyy-MM-dd', 'en');
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  } else {
    return '';
  }
}
export function transformTime(params: TransformFnParams) {
  if (Array.isArray(params.value)) {
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return params.value.map((x) => new Time(x));
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      return params.value.map((x: Time) => {
        let value = x as Time;
        let date = new Date(0, 0, 0, value.hour, value.minute, value.second);
        return formatDate(date, 'HH:mm:ss', 'en');
      });
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      return params.value.map((x) => new Time(x));
    }
  } else {
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return new Time(params.value);
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      let value = params.value as Time;
      let date = new Date(0, 0, 0, value.hour, value.minute, value.second);
      return formatDate(date, 'HH:mm:ss', 'en');
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      return new Time(params.value);
    }
  }
  return params.value;
}
