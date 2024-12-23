import { CreateChargeDto } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentCreateCharge extends CreateChargeDto {
  @IsEmail()
  email: string;
}
