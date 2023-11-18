import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const formsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.form.findMany({
      take: 100,
    });
  }),

  getByUserId: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.form.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      take: 100,
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.form.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure.mutation(async ({ ctx }) => {
    const form = await ctx.db.form.create({
      data: {
        userId: ctx.session.user.id,
        name: "Untitled",
        description: "",
      },
    });

    for (let i = 0; i < 7; i++) {
      await ctx.db.response.create({
        data: {
          formId: form.id,
          questionId: i + 1,
          questionType: "text",
          response: "",
        },
      });
    }

    return form;
  }),

  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.form.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  updateDescription: protectedProcedure
    .input(z.object({ id: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.form.update({
        where: {
          id: input.id,
        },
        data: {
          description: input.description,
        },
      });
    }),
});
``;
