import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListCarParkDto {
  @ApiPropertyOptional({
    description:
      'Carpark that offer free parking. ex: SUN & PH FR 7AM-10.30PM | NO',
    example: 'NO',
  })
  @IsOptional()
  freeParking: string;

  @ApiPropertyOptional({
    description: 'Carpark that offer night parking. ex: YES | NO',
    example: 'YES',
  })
  @IsOptional()
  nightParking: string;

  @ApiPropertyOptional({
    description:
      'Carpark that can meet my vehicle height requirement. Ex: gantry_height > 1.8',
    example: 1.8,
  })
  @IsOptional()
  minimumGantryHeight: number;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  page: number;

  @ApiPropertyOptional({
    example: 20,
  })
  @IsOptional()
  pageSize: number;
}
