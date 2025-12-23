/**
 * blog controller (Strapi v5 - Document Service)
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    // 블로그 목록 조회 - 커스텀 쿼리 파라미터
    async find(ctx) {
      const query = ctx.query as {
        page?: string;
        pageSize?: string;
        sort?: string; // "latest" | "oldest"
        category?: string; // category documentId
      };

      const page = parseInt(query.page || "1", 10);
      const pageSize = Math.min(parseInt(query.pageSize || "10", 10), 100);
      const start = (page - 1) * pageSize;

      // 정렬 옵션: latest(최신순), oldest(오래된순)
      const sortOption =
        query.sort === "oldest"
          ? [{ createdAt: "asc" as const }]
          : [{ createdAt: "desc" as const }];

      // 필터 구성
      const filters: any = {};
      if (query.category) {
        filters.blog_categories = { documentId: { $eq: query.category } };
      }

      try {
        const [blogs, total] = await Promise.all([
          strapi.documents("api::blog.blog").findMany({
            filters,
            status: "published",
            limit: pageSize,
            start,
            sort: sortOption,
            populate: {
              blog_categories: true,
              thumbnailImage: true,
            },
          }),
          strapi.documents("api::blog.blog").count({
            filters,
            status: "published",
          }),
        ]);

        return {
          data: blogs.map((blog: any) => ({
            documentId: blog.documentId,
            title: blog.title,
            createdAt: blog.createdAt,
            thumbnailImage: blog.thumbnailImage,
            categories: blog.blog_categories?.map((cat: any) => ({
              documentId: cat.documentId,
              name: cat.name,
            })),
          })),
          pagination: {
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
          },
        };
      } catch (error) {
        console.error("[Error in blog.find]", error);
        return ctx.badRequest("Error retrieving blogs");
      }
    },

    // 블로그 상세 조회
    async findOne(ctx) {
      const { documentId } = ctx.params;

      try {
        const blog = (await strapi.documents("api::blog.blog").findOne({
          documentId,
          status: "published",
          populate: {
            blog_categories: true,
            thumbnailImage: true,
            featuredImage: true,
          },
        })) as any;

        if (!blog) {
          return ctx.notFound("Blog not found");
        }

        // 최신 블로그 2개 가져오기 (현재 블로그 제외)
        const moreStories = await strapi.documents("api::blog.blog").findMany({
          filters: {
            documentId: { $ne: documentId },
          },
          status: "published",
          limit: 2,
          sort: [{ createdAt: "desc" }],
          populate: {
            blog_categories: true,
            thumbnailImage: true,
          },
        });

        return {
          data: {
            documentId: blog.documentId,
            title: blog.title,
            content: blog.content,
            createdAt: blog.createdAt,
            thumbnailImage: blog.thumbnailImage,
            featuredImage: blog.featuredImage,
            categories: blog.blog_categories?.map((cat: any) => ({
              documentId: cat.documentId,
              name: cat.name,
            })),
            moreStories: moreStories.map((story: any) => ({
              documentId: story.documentId,
              title: story.title,
              createdAt: story.createdAt,
              thumbnailImage: story.thumbnailImage,
              categories: story.blog_categories?.map((cat: any) => ({
                documentId: cat.documentId,
                name: cat.name,
              })),
            })),
          },
        };
      } catch (error) {
        console.error("[Error in blog.findOne]", error);
        return ctx.badRequest("Error retrieving blog");
      }
    },
  }),
);
