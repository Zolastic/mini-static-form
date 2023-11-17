import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";

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
        const user: User | null = await ctx.db.user.findUnique({
          where: { name: input.username },
        });
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
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
    .mutation(async ({ ctx, input }) => {
      const user: User | null = await ctx.db.user.findUnique({
        where: { name: input.username },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect username or password",
        });
      }
      if (user.password !== input.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect username or password",
        });
      }
      return user;
    }),

  // Create
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user: User | null = await ctx.db.user.create({
        data: {
          name: input.username,
          password: input.password,
          createdAt: new Date(),
        },
      });

      return user;
    }),
});
