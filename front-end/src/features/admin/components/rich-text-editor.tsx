"use client";
import { useRef } from "react";
import { SERVER_API, SERVER_URL, TMCE_API_KEY } from "../../../../config";
import dynamic from "next/dynamic";
import callManager from "@/hooks/callManager";
import axios from "axios";

//بصورت داینامیک ایمپورتش کردم که اخطار هایدریشن نده
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((m) => m.Editor),
  { ssr: false } // ← خیلی مهم
);
const RichTextEditor = ({ editorRef, formData, setFormData }: any) => {
  const { call } = callManager();
  const imageSrcsRef = useRef<string[]>([]);

  const imageUploadHandler = async (blobInfo: any, progress: any) => {
    const data = new FormData();
    data.append("file", blobInfo.blob(), blobInfo.filename());
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/editor-uploads", data),
      true
    );
    return `${SERVER_URL}${response?.data?.data?.original?.url}`;
  };
  return (
    <Editor
      apiKey={TMCE_API_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      onEditorChange={(content) => {
        setFormData({ ...formData, description: content });
      }}
      value={formData.description}
      init={{
        images_upload_handler: imageUploadHandler,
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
};

export default RichTextEditor;
