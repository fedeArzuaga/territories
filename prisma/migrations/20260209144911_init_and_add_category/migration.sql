/*
  Warnings:
  - You are about to rename the column `profilePictureUrl` to `image` on the `User` table.
  - You are about to rename the column `roles` to `role` on the `User` table.
*/

-- 1. Add the new column to Territory
-- This adds the column and fills existing rows with the default 'Congregación'
ALTER TABLE "Territory" ADD COLUMN "category" TEXT DEFAULT 'Congregación';

-- 2. Preserve User Data by Renaming Columns
-- This keeps your existing image URLs and roles intact.
ALTER TABLE "User" RENAME COLUMN "profilePictureUrl" TO "image";
ALTER TABLE "User" RENAME COLUMN "roles" TO "role";

-- 3. Apply constraints to the renamed 'role' column
-- Sets the default for FUTURE users and ensures the field isn't empty.
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;

-- 4. Create Authentication Tables (NextAuth)
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- 5. Create Indexes
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- 6. Add Foreign Keys
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;