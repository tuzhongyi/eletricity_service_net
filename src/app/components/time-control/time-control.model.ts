export class TimeModel {
  [key: string]: any;

  constructor(time?: Date);
  constructor(hour: number, minute: number, second: number);
  constructor(time?: Date | number, minute?: number, second?: number) {
    if (!time) {
      time = new Date();
    }
    if (time instanceof Date) {
      this.hour = time.getHours();
      this.minute = time.getMinutes();
      this.second = time.getSeconds();
    } else {
      this.hour = time;
      this.minute = minute ?? 0;
      this.second = second ?? 0;
    }
  }
  hour: number;
  minute: number;
  second: number;

  toDate(date?: Date) {
    if (date) {
      date = new Date(date.getTime());
    } else {
      date = new Date();
    }
    date.setHours(this.hour);
    date.setMinutes(this.minute);
    date.setSeconds(this.second);
    return date;
  }

  static format(num: number) {
    if (num < 10) {
      return `0${num}`;
    }
    return num.toString();
  }
}

export class TimeDurationModel {
  constructor(begin: Date, end: Date) {
    this.begin = new TimeModel(begin);
    this.end = new TimeModel(end);
  }
  begin: TimeModel;
  end: TimeModel;
}
