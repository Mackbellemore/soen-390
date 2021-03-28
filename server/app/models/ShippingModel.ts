import { Document, Schema } from 'mongoose';

/* eslint-disable */
enum orderStatus {
  Ordered = 'Ordered',
  Package = 'Packaged',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Delayed = 'Delayed',
}

/* eslint-enable */
export interface IShipping extends Document {
  status: orderStatus;
  company: string;
  location: string;
  shippingDate: Date;
  deliveryDate: Date;
}

export const ShippingSchema: Schema = new Schema(
  {
    status: {
      type: Schema.Types.String,
      enum: Object.values(orderStatus),
      default: 'Ordered',
      required: true,
    },
    company: {
      type: Schema.Types.String,
      required: true,
    },
    location: {
      type: Schema.Types.String,
      required: true,
    },
    shippingDate: { type: Schema.Types.Date, required: true },
    deliveryDate: { type: Schema.Types.Date, required: true },
  },
  { versionKey: false }
);
