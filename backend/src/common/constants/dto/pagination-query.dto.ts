import { IsOptional, IsPositive, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @Min(0)
  @IsInt()
  @Type(() => Number)
  offset: number = 0;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string = 'lastName'; // Default sort field

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'ASC'; // Default sort order
}