import { model, Schema, Document } from 'mongoose';

interface IRequestLog extends Document {
  method: string;
  url: string;
  statusCode: number;
  timestamp: Date;
}

const RequestLogSchema = new Schema<IRequestLog>({
  method: { type: String, required: true },
  url: { type: String, required: true },
  statusCode: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const RequestLog = model<IRequestLog>('RequestLog', RequestLogSchema);

export default RequestLog;
