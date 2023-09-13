export interface AppointmentTypeDTO {
  readonly id?: number;
  readonly name: string;
  readonly description?: string;
  readonly duration_minutes: number;
  readonly color_hex_code: string;
  readonly created_at?: string;
  readonly last_modified_at?: string;
}
