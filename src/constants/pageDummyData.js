import Quill from "quill";
window.Quill = Quill;

const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export const pageDummyData = {
  meta: {
    privacy_policy: {
      title: "Turnkey management service",
      content: "",
    },
  },
};

export var toolbarOptions = [
  ["bold", "italic", "underline", "strike", "image"], // toggled buttons
  ["blockquote", "code-block", "video", "link"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  // ["link", "image"]["clean"], // remove formatting button
];

export const modules = {
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
  toolbar: toolbarOptions,
};
