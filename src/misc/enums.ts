import {NUMBER, OBJECT_ID} from './mongoose-helpers';
import {Schema} from 'mongoose';

export enum UserRoles {
  Admin = 'admin',
  Invest = 'invest',
  Emit = 'emit',
}

export enum UserMembershipType {
  Individual = 'individual',
  Legal = 'legal',
}

export enum NotificationLevels {
  Important = 'important',
  Default = 'default',
}

export enum PayloadStatus {
  Asset = 'asset',
  Money = 'money',
}

export enum TransactionStatus {
  Queued = 'queued',
  Processing = 'processing',
  Accepted = 'accepted',
  Declined = 'declined',
}

export enum TransactionRequestStatus {
  Queued = 'queued', // not used, no queue supported
  Waiting = 'waiting',
  Processing = 'processing',
  Accepted = 'accepted',
  Declined = 'declined',
}

export enum AssetRequestStatus {
  Queued = 'queued',
  Accepted = 'accepted',
  Declined = 'declined',
}

export enum BaseCurrencies {
  RUR = 'RUR',
  USD = 'USD',
  BTC = 'BTC',
}

export enum ModelNames {
  Users = 'users',
  Contract = 'contract',
  Wallet = 'wallet',
  AssetRequest = 'asset-request',
  Asset = 'asset',
  Transaction = 'transaction',
  TransactionRequest = 'transaction-request',
}

export enum VerificationInitiators {
  SignUp = 'signup',
  LogIn = 'login',
}

export const payloadSchema = new Schema({
  type: {
    type: PayloadStatus,
  },
  asset: {
    ...OBJECT_ID,
    ref: ModelNames.Asset,
  },
  amount: NUMBER,
})
