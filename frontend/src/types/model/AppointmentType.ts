export interface AppointmentType {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly duration: number;
  readonly color: string;
  readonly createdAt: Date;
  readonly lastModifiedAt: Date;
}
