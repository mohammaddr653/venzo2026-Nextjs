const serverResponse = (message, data = {}) => {
  return {
    message: message, //عنوان پاسخ
    data: data, //جزئیات پاسخ
  };
};

module.exports = serverResponse;
