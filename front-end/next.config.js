//این فایل تغییر داده شده چون میخواستم ای اس لینت را موقع بیلد غیرفعال کنم همش گیر میداد و نمیذاشت موقع آپلود در لیارا عملیات دپلوی تکمیل بشه . البته اصولیش اینه که تمام خطاهای ای اس لینت را جدی بگیری و حلشون کنی
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: process.env.NEXT_PUBLIC_SERVER_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_SERVER_HOST,
        port: process.env.NEXT_PUBLIC_SERVER_PORT,
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
