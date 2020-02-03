import { Module } from '@nestjs/common';
import { TransportGateway } from './transport.gateway';

@Module({
    providers: [TransportGateway]
})
export class TransportModule {}
