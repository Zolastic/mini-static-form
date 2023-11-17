import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  // Read
  getByUsername: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(
      async ({ ctx, input }: { ctx: any; input: { username: string } }) => {
        const user = await ctx.db.user.findUnique({
          where: { name: input.username },
        });
        if (!user) {
          throw ctx.httpError.notFound();
        }
        return user;
      },
    ),

  loginAuthentication: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx,
        input,
      }: {
        ctx: any;
        input: { username: string; password: string };
      }) => {
        const user = await ctx.db.user.findUnique({
          where: { name: input.username },
        });
        if (!user) {
          throw ctx.httpError.notFound();
        }
        if (user.password !== input.password) {
          throw ctx.httpError.notFound();
        }
        return user;
      },
    ),

  // Create
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx,
        input,
      }: {
        ctx: any;
        input: { username: string; password: string };
      }) => {
        const user = await ctx.db.user.create({
          data: {
            name: input.username,
            password: input.password,
            createdAt: new Date(),
          },
        });

        return user;
      },
    ),
});
