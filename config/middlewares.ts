export default [
  "strapi::logger",
  "strapi::errors",
  // CKEditor 업로드 인증 문제 해결
  "global::ckeditor-upload-fix",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", , "blob:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "*.s3.ap-northeast-2.amazonaws.com",
            "manprotek-triforce.s3.ap-northeast-2.amazonaws.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "*.s3.ap-northeast-2.amazonaws.com",
            "manprotek-triforce.s3.ap-northeast-2.amazonaws.com",
          ],
          "frame-src": [
            "'self'",
            "youtube.com",
            "www.youtube.com",
            "vimeo.com",
            "*.vimeo.com",
            "player.vimeo.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  {
    /**
     * 웹훅 수신을 위한 설정
     * Strapi의 body 미들웨어는 요청 본문을 파싱하여 JavaScript 객체로 변환합니다.
     * Strpie Webhook 요청에서는 원본 데이터가 필요하기 때문에, 기본 파싱 동작이 문제가 될 수 있습니다.
     * includeUnparsed 옵션을 사용하여 특정 경로에서 원본 데이터를 유지함으로써, Stripe Webhook 요청에서 서명 검증이 가능하게 합니다.
     * 따라서, strapi::body 미들웨어에서 includeUnparsed 옵션을 사용하여 특정 경로에 대한 원본 데이터를 유지하는 것은 Webhook과 같은 중요한 요청에서 정확하고 신뢰할 수 있는 처리를 보장하기 위한 필수적인 설정입니다.
     * */
    name: "strapi::body",
    config: {
      includeUnparsed: true,
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
