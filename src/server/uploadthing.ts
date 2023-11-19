import type { NextApiRequest, NextApiResponse } from "next";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

const auth = async (_req: NextApiRequest, _res: NextApiResponse) => ({
  id: "fakeId",
}); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req, res }) => {
      const user = await Promise.resolve(auth(req, res));

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return Promise.resolve({ uploadedBy: metadata.userId });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
