"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  List,
  Heading,
  Link,
  BlockQuote,
  Indent,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

function Editor({ data }: { data: string | null }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: [
          "undo",
          "redo",
          "|",
          "bold",
          "italic",
          "|",
          "numberedList",
          "bulletedList",
          "outdent",
          "indent",
          "|",
          "heading",
          "|",
          "link",
          "blockQuote",
        ],
        plugins: [
          Bold,
          Essentials,
          Italic,
          Mention,
          Paragraph,
          Undo,
          List,
          Heading,
          Link,
          BlockQuote,
          Indent,
        ],
        licenseKey: "<YOUR_LICENSE_KEY>",
        initialData: data ?? "",
      }}
    />
  );
}

export default Editor;
