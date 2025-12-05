//note: این فایل رو برای مدیریت تصاویر تاینی درست کرده بودم الان بلااستفاده اس احتمال زیاد
export function dataURLtoBlob(dataUrl: string) {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error("Invalid data URL");
  const mime = mimeMatch[1]; // مثلا "image/png" یا "image/jpeg"

  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  // استخراج پسوند از MIME type
  const ext = mime.split("/")[1] || "png";
  const filename = `upload_${Date.now()}.${ext}`;

  return { blob: new Blob([u8arr], { type: mime }), filename };
}

export const extractImages = (content: any) => {
  //پیدا کردن تمام src های متن
  const regex = /<img[^>]+src="([^"]+)"/g;
  const matches = content.matchAll(regex);
  return Array.from(matches, (m: RegExpMatchArray) => m[1]);
};

