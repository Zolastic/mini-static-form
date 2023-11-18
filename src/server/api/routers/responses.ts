import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const responsesRouter = createTRPCRouter({
  getByFormId: protectedProcedure
    .input(z.object({ formId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.response.findMany({
        where: {
          formId: input.formId,
        },
      });
    }),
});
