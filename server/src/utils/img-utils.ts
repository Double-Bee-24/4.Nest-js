import { Response } from 'express';
import * as fs from 'fs/promises';

/**
 * Retrieves the MIME type based on the file extension of the given filename.
 *
 * @param filename - The name of the file whose MIME type is to be determined.
 * @returns The corresponding MIME type as a string. If the file extension is not recognized,
 *          it returns 'application/octet-stream'.
 */
function getMimeType(filename: string): string {
  const ext = filename.split('.').pop();
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
  };

  return ext
    ? mimeTypes[ext.toLowerCase()] || 'application/octet-stream'
    : 'application/octet-stream';
}

/**
 * Sends an image file as a response.
 *
 * @param {string} filePath - The path to the image file.
 * @param {string} filename - The name of the image file.
 * @param {Response} res - The response object to send the image.
 *
 * @returns {Promise<void>} - A promise that resolves when the image is sent.
 *
 * @throws {Error} - If there is an error reading the file.
 */
async function sendImage(filePath: string, filename: string, res: Response) {
  try {
    if (!filePath) {
      console.error('File path is empty');
      return;
    }

    const fileData = await fs.readFile(filePath);
    const mimeType = getMimeType(filename);

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

    res.send(fileData);
  } catch (error) {
    console.error('Error reading file', error);
    res.status(404).send('File not found');
  }
}

export { sendImage };
