/**
 * Health check routes
 * 인증 없이 접근 가능 (isPublic: true)
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/health",
      handler: "health.check",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
