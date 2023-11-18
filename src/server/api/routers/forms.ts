import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const formsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.form.findMany({
      take: 100,
    });
  }),

  create: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.form.create({
      data: {
        userId: ctx.session.user.id,
        name: "Untitled",
        description: "",
      },
    });
  }),
});
