//this function is the response that services should return

function serviceResponse(status, data) {
  return { status, data };
}

module.exports = serviceResponse;
