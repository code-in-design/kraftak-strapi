const isProduction = process.env.NODE_ENV === "production";

export default {
  routes: [
    {
      method: "GET",
      path: "/blogs",
      handler: "blog.find",
      config: {
        auth: isProduction ? { scope: ["api::blog.blog.find"] } : false,
      },
    },
    {
      method: "GET",
      path: "/blogs/:documentId",
      handler: "blog.findOne",
      config: {
        auth: isProduction ? { scope: ["api::blog.blog.findOne"] } : false,
      },
    },
  ],
};
