import {AppointmentType} from './AppointmentType.ts';

export interface AppointmentTypePage {
  readonly content: AppointmentType[];
  readonly total: number;
  readonly pages: number;
}
