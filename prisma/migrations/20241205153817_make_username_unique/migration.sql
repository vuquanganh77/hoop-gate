/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `product_image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `product_size_product_id_fkey` ON `product_size`;

-- AlterTable
ALTER TABLE `orders` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `product_image_product_id_key` ON `product_image`(`product_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
