import { prop, Ref, Typegoose } from '@typegoose/typegoose';
import { Languages } from '../enums';
import { User } from '../user/user.model';
import { Translator } from '../translator/translator.model';
import { ObjectID } from 'bson';

export class Dictionary extends Typegoose {

  _id: ObjectID | string;

  @prop({required: true})
  name: string;

  @prop({required: true, ref: User})
  creator: Ref<User>;

  @prop({required: true})
  inLanguage: Languages;

  @prop({required: true})
  outLanguage: Languages;

  @prop({itemsRef: 'Translator'})
  translators?: Ref<Translator>[];
}