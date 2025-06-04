'use client';

import { CldUploadWidget } from 'next-cloudinary';

interface CloudinaryUploadEvent {
  event: 'success';
  info: {
    public_id: string;
    secure_url: string;
    original_filename?: string;
    format?: string;
    width?: number;
    height?: number;
    [key: string]: any;
  };
}

interface ProfileImageUploaderProps {
  onUpload: (info: CloudinaryUploadEvent['info']) => void;
}

export default function ProfileImageUploader({ onUpload }: ProfileImageUploaderProps) {
  return (
    <CldUploadWidget
      uploadPreset="your_unsigned_preset"
      signatureEndpoint="/api/cloudinary-signature"
      options={{
        folder: 'profile_images',
        cropping: true,
        multiple: false,
      }}
      onUpload={(result: unknown) => {
        // Narrow the result to the expected shape
        const typedResult = result as CloudinaryUploadEvent;

        if (typedResult.event === 'success') {
          onUpload(typedResult.info);
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open?.()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Profile Image
        </button>
      )}
    </CldUploadWidget>
  );
}
