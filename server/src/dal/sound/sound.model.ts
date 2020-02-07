import { prop, Typegoose } from '@typegoose/typegoose';
import { ObjectID } from 'bson';

export class Sound extends Typegoose {

    _id: ObjectID | string;

    @prop({ required: true })
    data: number[];
}