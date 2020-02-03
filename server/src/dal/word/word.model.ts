import { prop, Ref, Typegoose } from 'typegoose';
import { Languages } from '../enums';
import { Picture } from '../picture/picture.model';
import { Sound } from '../sound/sound.model';
import { ObjectID } from 'bson';

export class Word extends Typegoose {

  _id: ObjectID | string;

  @prop({required: true})
  content: string;

  @prop({required: false})
  trascription: string;

  @prop({required: true})
  language: Languages;

  @prop({required: false})
  pos: string;

  @prop({required: false, ref: Picture})
  picture: Ref<Picture>;

  @prop({required: false, ref: Sound})
  sound: Ref<Sound>;
}