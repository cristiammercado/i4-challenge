import {FetchService} from './FetchService.ts';
import {AppointmentType} from '../types/model/AppointmentType.ts';
import {AppointmentTypePage} from '../types/model/AppointmentTypePage.ts';
import {AppointmentTypeDTO} from '../types/dto/AppointmentTypeDTO.ts';
import {PageResultDTO} from '../types/dto/PageResultDTO.ts';

export class AppointmentTypesService {

  private static readonly BASE_URL: string = '/appointment-types';

  public static async getAppointmentTypes(page: number): Promise<AppointmentTypePage | undefined> {
    const result: PageResultDTO<AppointmentTypeDTO> | undefined = await FetchService.get<PageResultDTO<AppointmentTypeDTO>>(`${AppointmentTypesService.BASE_URL}?page=${page}&size=5`);

    if (result) {
      return {
        content: result.content.map<AppointmentType>((dto: AppointmentTypeDTO) => {
          return {
            id: dto.id ?? -1,
            name: dto.name,
            description: dto.description ?? '',
            duration: dto.duration_minutes,
            color: dto.color_hex_code,
            createdAt: new Date(dto.created_at ?? ''),
            lastModifiedAt: new Date(dto.last_modified_at ?? '')
          };
        }),
        pages: result.total_pages,
        total: result.total_elements
      };
    }
  }

  public static async create(dto: AppointmentTypeDTO): Promise<AppointmentType | undefined> {
    const result: AppointmentTypeDTO | undefined = await FetchService.post<AppointmentTypeDTO>(AppointmentTypesService.BASE_URL, dto);

    if (result) {
      return {
        id: result.id ?? -1,
        name: result.name,
        description: result.description ?? '',
        duration: result.duration_minutes,
        color: result.color_hex_code,
        createdAt: new Date(result.created_at ?? ''),
        lastModifiedAt: new Date(result.last_modified_at ?? '')
      };
    }
  }

  public static async read(id: number): Promise<AppointmentType | undefined> {
    const result: AppointmentTypeDTO | undefined = await FetchService.get<AppointmentTypeDTO>(`${AppointmentTypesService.BASE_URL}/${id}`);

    if (result) {
      return {
        id,
        name: result.name,
        description: result.description ?? '',
        duration: result.duration_minutes,
        color: result.color_hex_code,
        createdAt: new Date(result.created_at ?? ''),
        lastModifiedAt: new Date(result.last_modified_at ?? '')
      };
    }
  }

  public static async update(id: number, dto: AppointmentTypeDTO): Promise<AppointmentType | undefined> {
    const result: AppointmentTypeDTO | undefined = await FetchService.put<AppointmentTypeDTO>(`${AppointmentTypesService.BASE_URL}/${id}`, dto);

    if (result) {
      return {
        id,
        name: result.name,
        description: result.description ?? '',
        duration: result.duration_minutes,
        color: result.color_hex_code,
        createdAt: new Date(result.created_at ?? ''),
        lastModifiedAt: new Date(result.last_modified_at ?? '')
      };
    }
  }

  public static async delete(id: number): Promise<void> {
    await FetchService.delete(`${AppointmentTypesService.BASE_URL}/${id}`);
  }
}
