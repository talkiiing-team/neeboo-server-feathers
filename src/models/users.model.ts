// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations'
import { Model, Mongoose } from 'mongoose'
import {
  BOOLEAN,
  DATE,
  OBJECT_ID,
  REQUIRED_OBJECT_ID,
  REQUIRED_STRING,
  STRING,
} from '../misc/mongoose-helpers'
import { ModelNames, UserMembershipType, UserRoles } from '../misc/enums'

export default function (app: Application): Model<any> {
  const modelName = ModelNames.Users
  const mongooseClient: Mongoose = app.get('mongooseClient')
  const schema = new mongooseClient.Schema(
    {
      email: {
        ...REQUIRED_STRING,
        unique: true,
        lowercase: true,
      },
      password: {
        ...REQUIRED_STRING,
      },
      displayName: {
        ...REQUIRED_STRING,
      },
      /*phoneNumber: {
        ...REQUIRED_STRING,
      },*/
      form: {
        ...REQUIRED_STRING,
        enum: Object.values(UserMembershipType),
      },
      role: {
        ...REQUIRED_STRING,
        enum: Object.values(UserRoles),
        default: UserRoles.Invest,
      },
      contractId: {
        ...OBJECT_ID,
        ref: ModelNames.Contract,
      },
      photo: STRING,
      personalData: {
        type: Object,
      },
      canEmit: BOOLEAN,
      verified: BOOLEAN,
      lastLogin: DATE,
      lastPassChange: DATE,
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
