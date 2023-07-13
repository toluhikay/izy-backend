import React from "react";
import { useFormik } from "formik";

export const result = {
  social_media: [
    {
      title: "facebook",
      link: "https://www.facebook.com/oakinbode",
    },
    {
      title: "twitter",
      link: "https://www.twitter.com/oakinbode",
    },
  ],
  address: [
    {
      address: "14 Sambrereio cresecent off limpopo Abuja",
      address_type: "BRANCH",
    },
  ],
  meta: {
    our_company: {
      key: "our company",
      title: "Our focus remains on you",
      background_img: "http://localhost:3000/static/media/Logo.baa2abaf9d4ed8ceb5d1527b340217cf.svg",
      options: [
        {
          title: "Our Story",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quod saepe, eaque consectetur laudantium a praesentium delectus error adipisci mollitia.",
          bg_img: "http://localhost:3000/static/media/Logo.baa2abaf9d4ed8ceb5d1527b340217cf.svg",
        },
        {
          title: "Our Patnership",
          header_title: "",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quod saepe, eaque consectetur laudantium a praesentium delectus error adipisci mollitia.",
          bg_img: "http://localhost:3000/static/media/Logo.baa2abaf9d4ed8ceb5d1527b340217cf.svg",
          accordion_details: [
            { title: "", content: "" },
            { title: "", content: "" },
          ],
        },
        {
          title: "Our Story",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quod saepe, eaque consectetur laudantium a praesentium delectus error adipisci mollitia.",
          bg_img: "http://localhost:3000/static/media/Logo.baa2abaf9d4ed8ceb5d1527b340217cf.svg",
        },
      ],
    },
    fleet: {
      key: "fleet",
      title: "Our focus remains on you",
    },
    charter: {
      key: "charter",
      title: "Our focus remains on you",
    },
    news_update: {
      key: "news update",
      title: "Our focus remains on you",
    },
    contact: {
      key: "contact",
      title: "Our focus remains on you",
    },
  },
};
const Test = () => {
  return <div>Test</div>;
};

export default Test;
