//this function is the response that services should return

export default function serviceResponse(status: number, data: any) {
  return { status, data };
}
