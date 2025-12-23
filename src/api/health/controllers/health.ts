/**
 * Health check controller
 * 인증 없이 접근 가능한 헬스체크 엔드포인트
 */

export default {
  async check(ctx) {
    ctx.body = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  },
};
