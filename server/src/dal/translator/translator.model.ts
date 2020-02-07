import { prop, Ref, Typegoose } from '@typegoose/typegoose';
import { Word } from '../word/word.model';

import { ObjectID } from 'bson';

export class Translator extends Typegoose {

    _id: ObjectID | string;

    @prop({required: true, ref: Word})
    in: Ref<Word>;

    @prop({required: true, ref: Word})
    out: Ref<Word>;
}