/**
 * banner router (Single Type)
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/banner",
      handler: "banner.find",
      config: {
        policies: [],
      },
    },
  ],
};
