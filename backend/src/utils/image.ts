import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const convertToWebP = async (filePath: string): Promise<string> => {
  const parsedPath = path.parse(filePath);
  const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

  // Zu WebP konvertieren + komprimieren
  await sharp(filePath)
    .webp({ quality: 80 }) // 80% Qualität
    .resize(1920, 1920, { // Max 1920px, behält Seitenverhältnis
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toFile(webpPath);

  // Original löschen
  fs.unlinkSync(filePath);

  return webpPath;
};

export const deleteImage = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};