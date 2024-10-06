import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFile = async (localFilePath, folderPath, photoType) => {
  try {
    // Use a file extension based on the local file path
    const fileExtension = localFilePath.split('.').pop();

    const fileRef = ref(
      storage,
      `${folderPath}/${Date.now()}_${photoType}.${fileExtension}`
    );

    // Create a blob directly from the local file path
    const response = await fetch(localFilePath);
    const blob = await response.blob();

    await uploadBytes(fileRef, blob);

    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed');
  }
};
