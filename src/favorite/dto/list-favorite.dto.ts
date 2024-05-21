import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListFavoriteDto {
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
