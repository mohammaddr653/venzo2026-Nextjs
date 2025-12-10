//this function is the response that services should return

export interface ServiceResponse {
  status: number;
  data: any;
}

export default function serviceResponse(status: number, data: any): ServiceResponse {
  return { status, data };
}
