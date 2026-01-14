import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const convertToWebP = async (filePath: string): Promise<string> => {
  const parsedPath = path.parse(filePath);
  const isAlreadyWebP = parsedPath.ext.toLowerCase() === '.webp';

  // Wenn bereits WebP, nur optimieren mit temporärem Namen
  const tempPath = path.join(parsedPath.dir, `${parsedPath.name}_temp.webp`);
  const finalPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

  // Zu WebP konvertieren + komprimieren
  await sharp(filePath)
    .webp({ quality: 80 }) // 80% Qualität
    .resize(1920, 1920, { // Max 1920px, behält Seitenverhältnis
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toFile(tempPath);

  // Original löschen
  fs.unlinkSync(filePath);

  // Temp-Datei umbenennen
  if (isAlreadyWebP) {
    fs.renameSync(tempPath, finalPath);
  } else {
    fs.renameSync(tempPath, finalPath);
  }

  return finalPath;
};

export const deleteImage = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};