const isProduction = process.env.NODE_ENV === "production";

export default {
  routes: [
    {
      method: "GET",
      path: "/blog-categories",
      handler: "blog-category.find",
      config: {
        auth: isProduction
          ? { scope: ["api::blog-category.blog-category.find"] }
          : false,
      },
    },
    {
      method: "GET",
      path: "/blog-categories/:documentId",
      handler: "blog-category.findOne",
      config: {
        auth: isProduction
          ? { scope: ["api::blog-category.blog-category.findOne"] }
          : false,
      },
    },
  ],
};
