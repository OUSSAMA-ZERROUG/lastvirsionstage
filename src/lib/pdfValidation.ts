import { z } from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB

function checkFileType(file: File | undefined): boolean {
  if (file?.name) {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType === 'pdf') return true;
  }
  return false;
}

const pdfValidation = z.object({
  file: z
    .instanceof(File)
    .refine((file) => !!file, { message: 'File is required' })
    .refine((file) => file && file.size < MAX_FILE_SIZE, { message: 'Max size is 5MB.' })
    .refine((file) => file && checkFileType(file), {
      message: 'Only .pdf formats are supported.',
    }),
});

export default pdfValidation;
