import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Định nghĩa __filename và __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // Cấu hình cache cho Webpack
    config.cache = {
      type: 'filesystem', // Sử dụng cache dạng file
      buildDependencies: {
        config: [__filename], // Theo dõi tệp cấu hình để làm mới cache khi cần
      },
      cacheLocation: path.resolve(__dirname, '.next/cache'), // Đặt vị trí cache
    };

    if (dev) {
      // Nếu đang ở môi trường phát triển, có thể vô hiệu hóa cache
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;
