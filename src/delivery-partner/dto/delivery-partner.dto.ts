import { IsString, IsOptional } from 'class-validator';

export class CreateDeliveryPartnerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;
}

export class UpdateDeliveryPartnerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;
}
