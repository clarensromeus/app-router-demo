/*
  Warnings:

  - You are about to alter the column `ProductName` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(300)`.

*/
-- DropIndex
DROP INDEX "User_Email_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "ProductName" SET DATA TYPE VARCHAR(300);
