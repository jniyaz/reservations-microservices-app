import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-12-18.acacia',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount }: CreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // Prevent redirect-based methods
      },
    });

    return paymentIntent;
  }
}
