import { Response } from 'express';

interface ControllerResponse {
  res: Response;
  message: string;
  code?: number;
  data?: any;
}
export default function response({ res, message, code = 200, data = {} }: ControllerResponse) {
  res.status(code).json({ message, data });
}
