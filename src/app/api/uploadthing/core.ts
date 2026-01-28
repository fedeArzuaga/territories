import { prisma } from "@/lib/prisma";
import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profilePicture: f({
        image: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
        maxFileSize: "4MB",
        maxFileCount: 1,
    },
  })
    // Check if the user is authenticated
    .middleware(async ({ req }) => {
    
        const user = await getUserByActiveSession();

        // If you throw, the user will not be able to upload
        if (!user) throw new UploadThingError("Unauthorized");
        return { ...user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        const updatedUsersProfilePicture = await prisma.user.update({
            where: { id: metadata.id },
            data: {
                ...metadata,
                image: metadata.image
            }
        })
        revalidatePath('/dashboard/user-profile')
        // Returned user data as metadata
        return { email: metadata.email, id: metadata.id, image: file.ufsUrl };

    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;