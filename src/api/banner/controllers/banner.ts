/**
 * banner controller (Strapi v5 - Single Type)
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::banner.banner",
  ({ strapi }) => ({
    // 배너 조회
    async find(ctx) {
      try {
        const banner = await strapi.documents("api::banner.banner").findFirst({
          status: "published",
          populate: {
            backgroundImage: true,
          },
        });

        if (!banner) {
          return {
            data: null,
          };
        }

        return {
          data: {
            documentId: banner.documentId,
            title: banner.title,
            subtitle: banner.subtitle,
            backgroundImage: banner.backgroundImage,
          },
        };
      } catch (error) {
        console.error("[Error in banner.find]", error);
        return ctx.badRequest("Error retrieving banner");
      }
    },
  }),
);
