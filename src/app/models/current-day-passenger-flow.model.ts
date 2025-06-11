import { Transform } from 'class-transformer';
import { WeatherType } from '../enums/weather-type.enum';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** 当前天级客流信息 */
export class CurrentDayPassengerFlow implements IModel {
  /**	String	记录ID	M */
  Id!: string;
  /**	DateTime	当前时间	M */
  @Transform(transformDateTime)
  Time!: Date;
  /**	String	营业厅ID	M */
  HallId!: string;
  /**	String	营业厅名称	O */
  HallName?: string;
  /**	Int32	进入客流数量	M */
  InNum!: number;
  /**	Int32	离开客流数量	M */
  OutNum!: number;
  /**	Int32	滞留客流数量	O */
  RetentionNum?: number;
  /**	Int32	当天天气信息	O */
  Weather?: WeatherType;
  /**	Double	空气指数	O */
  Aqi?: number;
  /**	Double	最低气温，单位：摄氏度	O */
  LowTemp?: number;
  /**	Double	最高气温，单位：摄氏度	O */
  HighTemp?: number;
  /**	Int32	顾客数量	O */
  CustomerNum?: number;
  /**	Int32	顾客组数量	O */
  CustomerGroupNum?: number;
}
