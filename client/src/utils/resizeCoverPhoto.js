function resizePhoto(imageFile, maxWidth, setPreviewImageUrl, callback) {
  if (!imageFile) return;
  const fileReader = new FileReader();
  fileReader.readAsDataURL(imageFile);
  fileReader.onload = (fileReaderEv) => {
    const img = document.createElement("img");
    setPreviewImageUrl(fileReaderEv.target.result);
    img.src = fileReaderEv.target.result;
    img.onload = (imgEvent) => {
      const canvas = document.createElement("canvas");
      const ASPECT_RATIO = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * ASPECT_RATIO;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imgEvent.target, 0, 0, canvas.width, canvas.height);
      ctx.canvas.toBlob(async (resizedImage) => {
        resizedImage.name = imageFile.name;
        resizedImage.lastModified = imageFile.lastModified;
        resizedImage.lastModifiedDate = imageFile.lastModifiedDate;
        resizedImage.webkitRelativePath = imageFile.webkitRelativePath;
        await callback(resizedImage);
      }, "image/png");
    };
  };
}

export function resizeCoverPhoto(imageFile, setPreviewImageUrl, callback) {
  resizePhoto(imageFile, 1000, setPreviewImageUrl, callback);
}
export function resizeProfilePhoto(imageFile, setPreviewImageUrl, callback) {
  resizePhoto(imageFile, 200, setPreviewImageUrl, callback);
}
