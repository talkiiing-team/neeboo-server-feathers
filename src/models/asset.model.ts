// shops-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations'
import { Model, Mongoose } from 'mongoose'
import { ModelNames } from '../misc/enums'
import {
  REQUIRED_NUMBER,
  REQUIRED_OBJECT_ID,
  REQUIRED_STRING,
  STRING,
} from '../misc/mongoose-helpers'

export default function (app: Application): Model<any> {
  const modelName = ModelNames.Asset
  const mongooseClient: Mongoose = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const creatorSchema = new Schema({
    name: REQUIRED_STRING,
    id: {
      ...REQUIRED_OBJECT_ID,
      ref: ModelNames.Users,
    },
  })

  const schema = new Schema(
    {
      price: REQUIRED_NUMBER,
      name: REQUIRED_STRING,
      token: REQUIRED_STRING,
      label: STRING,
      subject: REQUIRED_STRING,
      creator: creatorSchema,
    },
    {
      timestamps: true,
    }
  )

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    ;(mongooseClient as any).deleteModel(modelName)
  }
  return mongooseClient.model<any>(modelName, schema)
}
