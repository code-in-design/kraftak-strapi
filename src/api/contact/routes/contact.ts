const isProduction = process.env.NODE_ENV === "production";

export default {
  routes: [
    {
      method: "POST",
      path: "/contacts",
      handler: "contact.create",
      config: {
        auth: isProduction
          ? { scope: ["api::contact.contact.create"] }
          : false,
      },
    },
  ],
};
