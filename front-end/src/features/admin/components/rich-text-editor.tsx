"use client"
import { TMCE_API_KEY } from "../../../../config";
import dynamic from "next/dynamic";

//بصورت داینامیک ایمپورتش کردم که اخطار هایدریشن نده
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((m) => m.Editor),
  { ssr: false } // ← خیلی مهم
);
const RichTextEditor = ({ editorRef, formData, setFormData }: any) => {
  return (
    <Editor
      apiKey={TMCE_API_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      onEditorChange={(content) =>
        setFormData({ ...formData, description: content })
      }
      value={formData.description}
      init={{
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
