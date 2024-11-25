-- CreateTable
CREATE TABLE `carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_size_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` VARCHAR(255) NOT NULL,
    `updatedAt` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(32) NULL,
    `role` INTEGER NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createAt` VARCHAR(255) NOT NULL,
    `updatedAt` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `star` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `product_size_id` INTEGER NOT NULL,
    `createAt` VARCHAR(255) NOT NULL,
    `updatedAt` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL,
    `address_id` INTEGER NOT NULL,
    `is_payment_online` INTEGER NOT NULL,
    `total_price` FLOAT NOT NULL,
    `createdAt` VARCHAR(255) NOT NULL,
    `updatedAt` VARCHAR(255) NOT NULL,
    `status` INTEGER NULL DEFAULT 0
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `main_url` TEXT NOT NULL,
    `createAt` VARCHAR(255) NOT NULL,
    `updatedAt` VARCHAR(255) NOT NULL,
    `urls` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` VARCHAR(255) NOT NULL,
    `updatedAt` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` FLOAT NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `createAt` VARCHAR(255) NOT NULL,
    `updatedAt` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ship_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(64) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `createdAt` VARCHAR(255) NOT NULL,
    `updatedAt` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_size` ADD CONSTRAINT `product_size_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
