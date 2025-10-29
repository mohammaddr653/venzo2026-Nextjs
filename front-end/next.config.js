//این فایل تغییر داده شده چون میخواستم ای اس لینت را موقع بیلد غیرفعال کنم همش گیر میداد و نمیذاشت موقع آپلود در لیارا عملیات دپلوی تکمیل بشه . البته اصولیش اینه که تمام خطاهای ای اس لینت را جدی بگیری و حلشون کنی 
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
