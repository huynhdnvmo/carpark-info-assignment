import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddMyFavoriteDto {
  @ApiProperty({
    example: 'ACB',
  })
  @IsString()
  carParkNo: string;
}
