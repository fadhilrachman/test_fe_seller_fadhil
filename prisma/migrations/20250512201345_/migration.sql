/*
  Warnings:

  - You are about to drop the `_ArticleToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ArticleToCategory` DROP FOREIGN KEY `_ArticleToCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ArticleToCategory` DROP FOREIGN KEY `_ArticleToCategory_B_fkey`;

-- AlterTable
ALTER TABLE `Article` ADD COLUMN `category_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_ArticleToCategory`;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
