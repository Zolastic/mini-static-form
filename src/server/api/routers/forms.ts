import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const formsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.form.findMany({
      take: 100,
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
});
``;
