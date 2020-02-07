import { prop, Ref, pre } from '@typegoose/typegoose';
import { Languages } from '../enums';
import { ObjectID } from 'bson';
import { Dictionary } from '../dictionary/dictionary.model';
import * as bcrypt from 'bcryptjs';

@pre<User>('save', function (next) {

  let user = this;

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) return next();

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {

    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {

      if (err) return next(err);
      user.password = hash;
      next();

    });

  });

})

export class User {

  _id: ObjectID | string;

  @prop({ required: true })
  role: number;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  language: Languages;

  @prop({ ref: "Dictionary" })
  dictionaries?: Ref<Dictionary[]>;

  checkPassword(attempt, callback) {

    let user = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
    });

  };
}
