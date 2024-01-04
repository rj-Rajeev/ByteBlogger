import React from "react";
import envconf from "../envConf/envconf";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, defaultValue ="" }) => {


  return (
    <>
      <Controller
       name={name}
       control={control}
       render={({field : {onChange}})=>(
        <Editor
        apiKey={envconf.RTE_API}
        initialValue={defaultValue}
        init={{
          height: 500,
          menubar: true,
          resize: false,
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
        onEditorChange={onChange}
      />
       )}
       />
    </>
  );
};

export default RTE;









