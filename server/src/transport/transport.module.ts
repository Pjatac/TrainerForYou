import { Module } from '@nestjs/common';
import { TransportGateway } from './transport.gateway';
import { UsersModule } from '../dal/user/users.module';
import { AuthModule } from '../guards/auth.module';

@Module({
    imports: [UsersModule, AuthModule],
    providers: [TransportGateway]
})
export class TransportModule {}
