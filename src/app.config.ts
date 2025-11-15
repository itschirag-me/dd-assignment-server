import * as Joi from 'joi';

export enum Env {
  PORT = 'PORT',
  MONGODB_URI = 'MONGODB_URI',
  MONGODB_NAME = 'MONGODB_NAME',
}

export const envValidationSchema = Joi.object({
  [Env.PORT]: Joi.number().default(3000),
  [Env.MONGODB_URI]: Joi.string().required(),
  [Env.MONGODB_NAME]: Joi.string().required(),
});
