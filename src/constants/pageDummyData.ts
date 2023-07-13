export const pageDummyData = {
  meta: {
    career: {
      title: "High class, delivered to you",
      background_url: "",
      job_opportunities_content: "",
      qualification: "",
      work_conditions: "",
      resume_email: "",
    },
  },
};

export var toolbarOptions = [
  ["bold", "italic", "underline", "strike", "image"], // toggled buttons
  ["blockquote", "code-block", "video"],

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
  toolbar: toolbarOptions,
};
