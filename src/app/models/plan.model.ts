import { Transform } from 'class-transformer';
import { transformDateTime } from './transform.model';

export class Plan {
  Id!: string;
  No!: 0;
  Name!: string;
  Status!: 0;
  PlanUrl!: string;
  HallId!: string;
  Description?: string;
  @Transform(transformDateTime)
  CreateTime!: Date;
  @Transform(transformDateTime)
  UpdateTime!: Date;
  PassengerServerUnid?: string;
}
