import { prop, Ref, Typegoose } from 'typegoose';
import { Languages } from '../enums';
import { ObjectID } from 'bson';
import { Dictionary } from '../dictionary/dictionary.model';

export class User extends Typegoose {

    _id: ObjectID | string;

    @prop({required: true})
    role: number = 3;
  
    @prop({required: true})
    name: string;
  
    @prop({required: true})
    email: string;
  
    @prop({required: true})
    password: string;
  
    @prop({required: true})
    language: Languages;
    
    @prop({required: false, ref: Dictionary})
    dictionaries: Ref<Dictionary[]>
  }