import { Module } from '@nestjs/common';
import { TypegooseModule, TypegooseOptionsFactory,  TypegooseModuleOptions } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as consts from './common/consts';
import { Dictionary } from './dal/dictionary/dictionary.model';
import { Translator } from './dal/translator/translator.model';
import { Sound } from './dal/sound/sound.model';
import { Word } from './dal/word/word.model';
import { User } from './dal/user/user.model';
import { Picture } from './dal/picture/picture.model';
import { TransportModule } from './transport/transport.module';

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
    TypegooseModule.forFeature([Sound, Picture, Word, Dictionary, Translator, User]),
    TransportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
