/*
  Warnings:

  - You are about to alter the column `Firstname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `Lastname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `Email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `Password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "ProductName" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Firstname" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "Lastname" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "Email" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "Password" SET DATA TYPE VARCHAR(200);

-- CreateIndex
CREATE INDEX "Product_ProductName_idx" ON "Product"("ProductName");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
