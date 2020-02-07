import { Module } from '@nestjs/common';
import { TypegooseModule, TypegooseOptionsFactory,  TypegooseModuleOptions } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './guards/auth.module';
import * as consts from './common/consts';
import { Dictionary } from './dal/dictionary/dictionary.model';
import { Translator } from './dal/translator/translator.model';
import { Sound } from './dal/sound/sound.model';
import { Word } from './dal/word/word.model';
import { UsersModule } from './dal/user/users.module';
import { Picture } from './dal/picture/picture.model';
import { TransportModule } from './transport/transport.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

class TypegooseConfigService implements TypegooseOptionsFactory {
  createTypegooseOptions(): 
    | Promise<TypegooseModuleOptions>
    | TypegooseModuleOptions {
    return {
      uri: consts.MYENV.DATABASE_CONNECTION,
      useNewUrlParser: true, 
      useUnifiedTopology: true
    };
  }
}

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useClass: TypegooseConfigService
    }),
    //TypegooseModule.forRoot(consts.MYENV.DATABASE_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}),
    //TypegooseModule.forFeature([User, Word, Picture, Sound, Dictionary, Translator]),
    UsersModule,
    AuthModule,
    TransportModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
        new (winston.transports.File)({
          filename: 'filelog-info.log',
          level: 'info'
        }),
        new (winston.transports.File)({
          filename: 'filelog-error.log',
          level: 'error'
        }),
        new (winston.transports.File)({
          filename: 'filelog-warn.log',
          level: 'warn'
        })
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
