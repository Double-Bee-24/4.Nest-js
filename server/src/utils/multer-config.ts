import { MulterModuleOptions } from '@nestjs/platform-express';

export function getMulterConfig(): MulterModuleOptions {
  return {
    dest: './images',
    fileFilter: (req, file, callback) => {
      const allowedMimetypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (allowedMimetypes.includes(file.mimetype)) {
        callback(null, true); // File is allowed
      } else {
        callback(new Error('Invalid file type'), false); // File is not allowed
      }
    },
  };
}
