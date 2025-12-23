/**
 * blog-category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::blog-category.blog-category",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const categories = await strapi
          .documents("api::blog-category.blog-category")
          .findMany({
            status: "published",
            sort: [{ name: "asc" }],
          });

        return {
          data: categories.map((cat) => ({
            documentId: cat.documentId,
            name: cat.name,
          })),
        };
      } catch (error) {
        console.error("[Error in blog-category.find]", error);
        return ctx.badRequest("Error retrieving categories");
      }
    },

    async findOne(ctx) {
      const { documentId } = ctx.params;

      try {
        const category = await strapi
          .documents("api::blog-category.blog-category")
          .findOne({
            documentId,
            status: "published",
          });

        if (!category) {
          return ctx.notFound("Category not found");
        }

        return {
          data: {
            documentId: category.documentId,
            name: category.name,
          },
        };
      } catch (error) {
        console.error("[Error in blog-category.findOne]", error);
        return ctx.badRequest("Error retrieving category");
      }
    },
  })
);
