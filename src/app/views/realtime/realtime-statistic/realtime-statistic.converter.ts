import { EventType } from 'src/app/enums/event-type.enum';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { CurrentBusinessHallStatistic } from 'src/app/models/current-business-hall-statistic.model';
import { CurrentDayPassengerFlow } from 'src/app/models/current-day-passenger-flow.model';
import { RealtimeStatisticModel } from './realtime-statistic.model';

export class RealtimeStatisticConverter
  implements IConverter<CurrentBusinessHallStatistic, RealtimeStatisticModel>
{
  Convert(
    source: CurrentBusinessHallStatistic,
    passenger?: CurrentDayPassengerFlow
  ): RealtimeStatisticModel {
    let model = new RealtimeStatisticModel();
    model.delivery = source.AvgDeliveryNumber ?? 0;
    model.business = source.BusinessNumber ?? 0;
    model.record = source.TotalEventNumber ?? 0;
    model.device = source.OfflineDeviceNumber ?? 0;
    if (passenger) {
      model.in = passenger.InNum;
      model.out = passenger.OutNum;
      model.customer = passenger.CustomerNum ?? 0;
    }
    if (source.EventNumbers) {
      for (let i = 0; i < source.EventNumbers.length; i++) {
        const event = source.EventNumbers[i];
        let key = EventType[event.EventType] as string;
        if (key in model) {
          model[key] = event.Number;
        }
      }
    }
    return model;
  }
}
