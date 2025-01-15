-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: hooper_db
-- Generation Time: Jan 06, 2025 at 05:20 AM
-- Server version: 9.1.0
-- PHP Version: 8.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hooper_gate`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int NOT NULL,
  `product_size_id` int NOT NULL,
  `user_id` int NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `product_size_id`, `user_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(15, 11, 2, 2, 'Sat Jan 04 2025 21:40:36 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:40:36 GMT+0700 (Indochina Time)');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `createAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `star` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `product_id`, `user_id`, `createAt`, `updatedAt`, `content`, `star`) VALUES
(1, 3, 1, 'Wed Dec 11 2024 11:02:35 GMT+0700 (Indochina Time)', 'Wed Dec 11 2024 11:02:35 GMT+0700 (Indochina Time)', 'qwe', 2),
(2, 3, 1, 'Fri Dec 20 2024 10:47:58 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 10:47:58 GMT+0700 (Indochina Time)', 'san pham rat tot', 5),
(3, 83, 2, 'Sat Jan 04 2025 21:37:03 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:37:03 GMT+0700 (Indochina Time)', 'San pham rat tot ', 5);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `product_id`, `user_id`) VALUES
(5, 1, 1),
(6, 83, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `is_payment_online` int NOT NULL,
  `total_price` float NOT NULL,
  `createdAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `is_payment_online`, `total_price`, `createdAt`, `updatedAt`, `status`) VALUES
(6, 1, 1, 70998000, 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)', 3),
(8, 1, 1, 0, 'Mon Dec 09 2024 20:57:26 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 20:57:26 GMT+0700 (Indochina Time)', 3),
(9, 1, 1, 0, 'Tue Dec 10 2024 19:14:02 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 19:14:02 GMT+0700 (Indochina Time)', 0),
(10, 1, 1, 0, 'Tue Dec 10 2024 20:57:35 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 20:57:35 GMT+0700 (Indochina Time)', 0),
(11, 1, 1, 7500000, 'Fri Dec 20 2024 01:58:44 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 01:58:44 GMT+0700 (Indochina Time)', 3),
(12, 2, 1, 3000000, 'Fri Dec 20 2024 02:02:44 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 02:02:44 GMT+0700 (Indochina Time)', 1),
(13, 1, 1, 3950000, 'Thu Jan 02 2025 14:57:34 GMT+0700 (Indochina Time)', 'Thu Jan 02 2025 14:57:34 GMT+0700 (Indochina Time)', 0),
(14, 1, 1, 3950000, 'Thu Jan 02 2025 14:59:43 GMT+0700 (Indochina Time)', 'Thu Jan 02 2025 14:59:43 GMT+0700 (Indochina Time)', 0),
(15, 1, 1, 3950000, 'Thu Jan 02 2025 15:04:56 GMT+0700 (Indochina Time)', 'Thu Jan 02 2025 15:04:56 GMT+0700 (Indochina Time)', 0),
(16, 1, 1, 3950000, 'Sat Jan 04 2025 20:55:28 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 20:55:28 GMT+0700 (Indochina Time)', 0),
(17, 2, 1, 4500000, 'Sat Jan 04 2025 21:35:05 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:35:05 GMT+0700 (Indochina Time)', 3);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `quantity` int NOT NULL,
  `product_size_id` int NOT NULL,
  `price` float NOT NULL,
  `createAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `quantity`, `product_size_id`, `price`, `createAt`, `updatedAt`) VALUES
(13, 6, 2, 5, 9398000, 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)'),
(14, 6, 11, 1, 33000000, 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)'),
(15, 6, 1, 3, 3000000, 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)'),
(16, 6, 8, 2, 25600000, 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 17:15:33 GMT+0700 (Indochina Time)'),
(17, 11, 1, 8, 1500000, 'Fri Dec 20 2024 01:58:44 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 01:58:44 GMT+0700 (Indochina Time)'),
(18, 11, 2, 1, 6000000, 'Fri Dec 20 2024 01:58:44 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 01:58:44 GMT+0700 (Indochina Time)'),
(19, 12, 1, 3, 3000000, 'Fri Dec 20 2024 02:02:45 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 02:02:45 GMT+0700 (Indochina Time)'),
(20, 14, 1, 9, 3950000, 'Thu Jan 02 2025 14:59:44 GMT+0700 (Indochina Time)', 'Thu Jan 02 2025 14:59:44 GMT+0700 (Indochina Time)'),
(21, 15, 1, 9, 3950000, 'Thu Jan 02 2025 15:04:56 GMT+0700 (Indochina Time)', 'Thu Jan 02 2025 15:04:56 GMT+0700 (Indochina Time)'),
(22, 16, 1, 9, 3950000, 'Sat Jan 04 2025 20:55:29 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 20:55:29 GMT+0700 (Indochina Time)'),
(23, 17, 3, 11, 1500000, 'Sat Jan 04 2025 21:35:06 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:35:06 GMT+0700 (Indochina Time)');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `type`, `brand`, `createAt`, `updatedAt`) VALUES
(1, 'Ja 1 \"Induction\"', '', 3000000, 'shoes', 'Nike', 'Fri Dec 06 2024 10:03:09 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 16:29:06 GMT+0700 (Indochina Time)'),
(2, 'Air Jordan 1 Low Method of Make', '', 3950000, 'shoes', 'Jordan', 'Fri Dec 06 2024 10:24:35 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:24:35 GMT+0700 (Indochina Time)'),
(3, 'Air Max Plus', '', 4699000, 'shoes', 'Nike', 'Fri Dec 06 2024 10:28:36 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:28:36 GMT+0700 (Indochina Time)'),
(4, 'Air Max 97', '', 4200000, 'shoes', 'Nike ', 'Fri Dec 06 2024 10:47:10 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:47:10 GMT+0700 (Indochina Time)'),
(5, 'Luka 2 PF', '', 3200000, 'shoes', 'Jordan', 'Fri Dec 06 2024 10:48:19 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:48:19 GMT+0700 (Indochina Time)'),
(6, 'Air Jordan 11 Retro \"Legend Blue\"', '', 5000000, 'shoes', 'Jordan', 'Mon Dec 09 2024 23:31:48 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 23:31:48 GMT+0700 (Indochina Time)'),
(7, 'Ja 2 \"In The Woods\"', '', 3200000, 'shoes', 'Nike', 'Mon Dec 09 2024 23:32:54 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 23:32:54 GMT+0700 (Indochina Time)'),
(8, 'Nike P-6000', '', 4200000, 'shoes', 'Nike', 'Mon Dec 09 2024 23:34:05 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 23:34:05 GMT+0700 (Indochina Time)'),
(9, 'Nike Air Vapormax Plus', '', 5100000, 'shoes', 'Nike', 'Mon Dec 09 2024 23:35:16 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 23:35:16 GMT+0700 (Indochina Time)'),
(10, 'Jumpman MVP', '', 2500000, 'shoes', 'Jordan', 'Tue Dec 10 2024 10:05:46 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:06:01 GMT+0700 (Indochina Time)'),
(11, 'Nike Hyperdunk 2017 Low', '', 2350000, 'shoes', 'Nike', 'Tue Dec 10 2024 10:08:23 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:08:23 GMT+0700 (Indochina Time)'),
(12, 'Sabrina 2 \"Retroed\"', '', 2750000, 'shoes', 'Nike', 'Tue Dec 10 2024 10:09:34 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:09:34 GMT+0700 (Indochina Time)'),
(13, 'Book 1 \"Sunset\"', '', 3150000, 'shoes', 'Nike', 'Tue Dec 10 2024 10:11:01 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:11:01 GMT+0700 (Indochina Time)'),
(14, 'G.T. Cut 3', '', 3950000, 'shoes', 'Nike', 'Tue Dec 10 2024 10:12:41 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:12:41 GMT+0700 (Indochina Time)'),
(15, 'KD 17 \"Aunt Pearl\"', '', 4100000, 'shoes', 'Nike', 'Tue Dec 10 2024 10:13:55 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:13:55 GMT+0700 (Indochina Time)'),
(16, 'Luka 3', '', 3500000, 'shoes', 'Jordan', 'Thu Dec 12 2024 10:21:08 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:21:08 GMT+0700 (Indochina Time)'),
(17, 'Giannis Immortality \"Christmas\"', '', 2650000, 'shoes', 'Nike', 'Thu Dec 12 2024 10:22:07 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:22:07 GMT+0700 (Indochina Time)'),
(18, 'Kobe VIII \"Protro\"', '', 4500000, 'shoes', 'Nike', 'Thu Dec 12 2024 10:23:07 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:23:07 GMT+0700 (Indochina Time)'),
(19, 'Giannis Freak 6', '', 2950000, 'shoes', 'Nike', 'Thu Dec 12 2024 10:23:49 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:23:49 GMT+0700 (Indochina Time)'),
(20, 'KD15', '', 2990000, 'shoes', 'Nike', 'Thu Dec 12 2024 10:24:37 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 16:19:22 GMT+0700 (Indochina Time)'),
(21, 'Zion 3 \"Z-3D\"', '', 3150000, 'shoes', 'Jordan', 'Thu Dec 12 2024 10:25:17 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:37:12 GMT+0700 (Indochina Time)'),
(22, 'Lebron Witness 8 \"I Promise School\"', '', 2750000, 'shoes', 'Nike', 'Fri Dec 13 2024 10:03:30 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:03:30 GMT+0700 (Indochina Time)'),
(23, 'Nike G.T.Cut Academy', '', 3250000, 'shoes', 'Nike', 'Fri Dec 13 2024 10:09:43 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:09:43 GMT+0700 (Indochina Time)'),
(24, 'KD 16 \"Wanda\"', '', 3350000, 'shoes', 'Nike', 'Fri Dec 13 2024 10:10:27 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:10:27 GMT+0700 (Indochina Time)'),
(25, 'Nike Cosmic Unity', '', 3000000, 'shoes', 'Nike', 'Fri Dec 13 2024 10:11:06 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:11:06 GMT+0700 (Indochina Time)'),
(26, 'Ja 2 \"Tree Top\"', '', 3500000, 'shoes', 'Nike', 'Fri Dec 13 2024 10:11:45 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:11:45 GMT+0700 (Indochina Time)'),
(27, 'Jordan Sport Jam', '', 2700000, 'clothes', 'Jordan', 'Fri Dec 13 2024 15:53:42 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 15:53:42 GMT+0700 (Indochina Time)'),
(28, 'Nike Brasilia', '', 950000, 'accessories', 'Nike', 'Sat Dec 14 2024 14:43:31 GMT+0700 (Indochina Time)', 'Sat Dec 14 2024 14:43:48 GMT+0700 (Indochina Time)'),
(29, 'Nike Tech', '', 1500000, 'clothes', 'Nike', 'Mon Dec 16 2024 01:39:28 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:39:28 GMT+0700 (Indochina Time)'),
(30, 'Nike Primary Fleece', '', 1600000, 'clothes', 'Nike ', 'Mon Dec 16 2024 01:40:31 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:40:31 GMT+0700 (Indochina Time)'),
(31, 'Nike Logo Swoosh', '', 1200000, 'clothes', 'Nike', 'Mon Dec 16 2024 01:41:06 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:41:06 GMT+0700 (Indochina Time)'),
(32, 'Nike Tech Windrunner', '', 1250000, 'clothes', 'Nike', 'Mon Dec 16 2024 01:41:49 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:41:49 GMT+0700 (Indochina Time)'),
(33, 'Air Jordan Wordmark', '', 900000, 'clothes', 'Jordan', 'Mon Dec 16 2024 01:42:29 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:42:29 GMT+0700 (Indochina Time)'),
(34, 'Nike Alphafly 3 Electric', '', 8200000, 'shoes', 'Nike', 'Thu Dec 19 2024 12:46:19 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 12:46:19 GMT+0700 (Indochina Time)'),
(83, 'Nike Revolution', '', 1500000, 'shoes', 'Nike', 'Sat Jan 04 2025 21:31:03 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:31:03 GMT+0700 (Indochina Time)');

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `main_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `urls` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `main_url`, `createAt`, `updatedAt`, `urls`) VALUES
(1, 1, '/uploads/products/1/main/1.jpg', 'Fri Dec 06 2024 10:03:09 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:03:09 GMT+0700 (Indochina Time)', '[\"/uploads/products/1/detail/2.png\",\"/uploads/products/1/detail/3.png\",\"/uploads/products/1/detail/4.jpg\",\"/uploads/products/1/detail/5.jpg\",\"/uploads/products/1/detail/6.png\",\"/uploads/products/1/detail/7.jpg\",\"/uploads/products/1/detail/8.jpg\",\"/uploads/products/1/detail/9.png\"]'),
(2, 2, '/uploads/products/2/main/1.jpg', 'Fri Dec 06 2024 10:24:35 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:24:35 GMT+0700 (Indochina Time)', '[\"/uploads/products/2/detail/2.png\",\"/uploads/products/2/detail/3.png\",\"/uploads/products/2/detail/4.png\",\"/uploads/products/2/detail/5.jpg\",\"/uploads/products/2/detail/6.png\",\"/uploads/products/2/detail/7.jpg\",\"/uploads/products/2/detail/8.png\",\"/uploads/products/2/detail/9.png\"]'),
(3, 3, '/uploads/products/3/main/1.png', 'Fri Dec 06 2024 10:28:36 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:28:36 GMT+0700 (Indochina Time)', '[\"/uploads/products/3/detail/2.png\",\"/uploads/products/3/detail/3.png\",\"/uploads/products/3/detail/4.jpg\",\"/uploads/products/3/detail/5.png\",\"/uploads/products/3/detail/6.png\",\"/uploads/products/3/detail/7.jpg\",\"/uploads/products/3/detail/8.jpg\"]'),
(4, 4, '/uploads/products/4/main/1.jpg', 'Fri Dec 06 2024 10:47:10 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:47:10 GMT+0700 (Indochina Time)', '[\"/uploads/products/4/detail/2.jpg\",\"/uploads/products/4/detail/3.png\",\"/uploads/products/4/detail/4.png\",\"/uploads/products/4/detail/5.jpg\"]'),
(5, 5, '/uploads/products/5/main/1.png', 'Fri Dec 06 2024 10:48:19 GMT+0700 (Indochina Time)', 'Fri Dec 06 2024 10:48:19 GMT+0700 (Indochina Time)', '[\"/uploads/products/5/detail/2.png\",\"/uploads/products/5/detail/3.png\",\"/uploads/products/5/detail/4.jpg\",\"/uploads/products/5/detail/5.png\",\"/uploads/products/5/detail/6.png\",\"/uploads/products/5/detail/7.png\",\"/uploads/products/5/detail/8.png\"]'),
(6, 6, '/uploads/products/6/main/1.png', 'Mon Dec 09 2024 23:31:48 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 23:31:48 GMT+0700 (Indochina Time)', '[\"/uploads/products/6/detail/2.png\",\"/uploads/products/6/detail/3.png\",\"/uploads/products/6/detail/4.png\",\"/uploads/products/6/detail/5.png\",\"/uploads/products/6/detail/6.png\",\"/uploads/products/6/detail/7.png\",\"/uploads/products/6/detail/8.png\"]'),
(7, 7, '/uploads/products/7/main/1.png', 'Mon Dec 09 2024 23:32:54 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 23:32:54 GMT+0700 (Indochina Time)', '[\"/uploads/products/7/detail/2.png\",\"/uploads/products/7/detail/3.png\",\"/uploads/products/7/detail/4.png\",\"/uploads/products/7/detail/5.png\",\"/uploads/products/7/detail/6.png\",\"/uploads/products/7/detail/7.png\",\"/uploads/products/7/detail/8.png\"]'),
(8, 8, '/uploads/products/8/main/1.png', 'Mon Dec 09 2024 23:34:05 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 23:34:05 GMT+0700 (Indochina Time)', '[\"/uploads/products/8/detail/2.png\",\"/uploads/products/8/detail/3.png\",\"/uploads/products/8/detail/4.jpg\",\"/uploads/products/8/detail/5.png\",\"/uploads/products/8/detail/6.png\",\"/uploads/products/8/detail/7.jpg\",\"/uploads/products/8/detail/8.png\"]'),
(9, 9, '/uploads/products/9/main/1.png', 'Mon Dec 09 2024 23:35:16 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 23:35:16 GMT+0700 (Indochina Time)', '[\"/uploads/products/9/detail/2.png\",\"/uploads/products/9/detail/3.png\",\"/uploads/products/9/detail/4.png\",\"/uploads/products/9/detail/5.png\",\"/uploads/products/9/detail/6.png\",\"/uploads/products/9/detail/7.jpg\",\"/uploads/products/9/detail/8.png\"]'),
(10, 10, '/uploads/products/10/main/1.png', 'Tue Dec 10 2024 10:06:01 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:06:01 GMT+0700 (Indochina Time)', '[\"\"]'),
(11, 11, '/uploads/products/11/main/1.jpg', 'Tue Dec 10 2024 10:08:23 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:08:23 GMT+0700 (Indochina Time)', '[\"/uploads/products/11/detail/2.png\",\"/uploads/products/11/detail/3.jpg\",\"/uploads/products/11/detail/4.jpg\",\"/uploads/products/11/detail/5.jpg\",\"/uploads/products/11/detail/6.png\",\"/uploads/products/11/detail/7.jpg\",\"/uploads/products/11/detail/8.jpg\"]'),
(12, 12, '/uploads/products/12/main/1.jpg', 'Tue Dec 10 2024 10:09:34 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:09:34 GMT+0700 (Indochina Time)', '[\"/uploads/products/12/detail/2.png\",\"/uploads/products/12/detail/3.jpg\",\"/uploads/products/12/detail/4.jpg\",\"/uploads/products/12/detail/5.jpg\",\"/uploads/products/12/detail/6.png\",\"/uploads/products/12/detail/7.jpg\",\"/uploads/products/12/detail/8.png\"]'),
(13, 13, '/uploads/products/13/main/1.png', 'Tue Dec 10 2024 10:11:01 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:11:01 GMT+0700 (Indochina Time)', '[\"/uploads/products/13/detail/2.png\",\"/uploads/products/13/detail/3.png\",\"/uploads/products/13/detail/4.png\",\"/uploads/products/13/detail/5.png\",\"/uploads/products/13/detail/6.png\",\"/uploads/products/13/detail/7.png\",\"/uploads/products/13/detail/8.png\"]'),
(14, 14, '/uploads/products/14/main/1.png', 'Tue Dec 10 2024 10:12:41 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:12:41 GMT+0700 (Indochina Time)', '[\"/uploads/products/14/detail/2.png\",\"/uploads/products/14/detail/3.png\",\"/uploads/products/14/detail/4.png\",\"/uploads/products/14/detail/5.png\",\"/uploads/products/14/detail/6.png\",\"/uploads/products/14/detail/7.png\",\"/uploads/products/14/detail/8.png\"]'),
(15, 15, '/uploads/products/15/main/1.png', 'Tue Dec 10 2024 10:13:55 GMT+0700 (Indochina Time)', 'Tue Dec 10 2024 10:13:55 GMT+0700 (Indochina Time)', '[\"/uploads/products/15/detail/2.png\",\"/uploads/products/15/detail/3.png\",\"/uploads/products/15/detail/4.png\",\"/uploads/products/15/detail/5.png\",\"/uploads/products/15/detail/6.png\",\"/uploads/products/15/detail/7.png\",\"/uploads/products/15/detail/8.png\"]'),
(16, 16, '/uploads/products/16/main/1.png', 'Thu Dec 12 2024 10:21:08 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:21:08 GMT+0700 (Indochina Time)', '[\"/uploads/products/16/detail/2.png\",\"/uploads/products/16/detail/3.png\",\"/uploads/products/16/detail/4.png\",\"/uploads/products/16/detail/5.png\",\"/uploads/products/16/detail/6.png\",\"/uploads/products/16/detail/7.png\",\"/uploads/products/16/detail/8.png\"]'),
(17, 17, '/uploads/products/17/main/1.png', 'Thu Dec 12 2024 10:22:07 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:22:07 GMT+0700 (Indochina Time)', '[\"/uploads/products/17/detail/2.png\",\"/uploads/products/17/detail/3.png\",\"/uploads/products/17/detail/4.jpg\",\"/uploads/products/17/detail/5.png\",\"/uploads/products/17/detail/6.png\",\"/uploads/products/17/detail/7.jpg\",\"/uploads/products/17/detail/8.png\"]'),
(18, 18, '/uploads/products/18/main/1.jpg', 'Thu Dec 12 2024 10:23:07 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:23:07 GMT+0700 (Indochina Time)', '[\"/uploads/products/18/detail/2.png\",\"/uploads/products/18/detail/3.jpg\",\"/uploads/products/18/detail/4.jpg\",\"/uploads/products/18/detail/5.png\",\"/uploads/products/18/detail/6.png\",\"/uploads/products/18/detail/7.jpg\",\"/uploads/products/18/detail/8.png\"]'),
(19, 19, '/uploads/products/19/main/1.png', 'Thu Dec 12 2024 10:23:49 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:23:49 GMT+0700 (Indochina Time)', '[\"/uploads/products/19/detail/2.png\",\"/uploads/products/19/detail/3.png\",\"/uploads/products/19/detail/4.png\",\"/uploads/products/19/detail/5.png\",\"/uploads/products/19/detail/6.png\",\"/uploads/products/19/detail/7.jpg\",\"/uploads/products/19/detail/8.png\"]'),
(20, 20, '/uploads/products/20/main/1.png', 'Thu Dec 12 2024 10:24:37 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:24:37 GMT+0700 (Indochina Time)', '[\"/uploads/products/20/detail/2.png\",\"/uploads/products/20/detail/3.png\",\"/uploads/products/20/detail/4.jpg\",\"/uploads/products/20/detail/5.jpg\",\"/uploads/products/20/detail/6.png\",\"/uploads/products/20/detail/7.jpg\",\"/uploads/products/20/detail/8.jpg\"]'),
(21, 21, '/uploads/products/21/main/1.png', 'Thu Dec 12 2024 10:25:17 GMT+0700 (Indochina Time)', 'Thu Dec 12 2024 10:37:12 GMT+0700 (Indochina Time)', '[\"/uploads/products/21/detail/2.png\",\"/uploads/products/21/detail/3.png\",\"/uploads/products/21/detail/4.png\",\"/uploads/products/21/detail/5.png\",\"/uploads/products/21/detail/6.png\",\"/uploads/products/21/detail/7.png\",\"/uploads/products/21/detail/8.png\"]'),
(23, 22, '/uploads/products/22/main/1.jpg', 'Fri Dec 13 2024 10:03:30 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:03:30 GMT+0700 (Indochina Time)', '[\"/uploads/products/22/detail/2.png\",\"/uploads/products/22/detail/3.png\",\"/uploads/products/22/detail/4.png\",\"/uploads/products/22/detail/5.jpg\",\"/uploads/products/22/detail/6.jpg\",\"/uploads/products/22/detail/7.png\",\"/uploads/products/22/detail/8.png\"]'),
(24, 23, '/uploads/products/23/main/1.jpg', 'Fri Dec 13 2024 10:09:43 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:09:43 GMT+0700 (Indochina Time)', '[\"/uploads/products/23/detail/2.png\",\"/uploads/products/23/detail/3.jpg\",\"/uploads/products/23/detail/4.jpg\",\"/uploads/products/23/detail/5.jpg\",\"/uploads/products/23/detail/6.png\",\"/uploads/products/23/detail/7.jpg\",\"/uploads/products/23/detail/8.jpg\"]'),
(25, 24, '/uploads/products/24/main/1.png', 'Fri Dec 13 2024 10:10:28 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:10:28 GMT+0700 (Indochina Time)', '[\"/uploads/products/24/detail/2.png\",\"/uploads/products/24/detail/3.png\",\"/uploads/products/24/detail/4.jpg\",\"/uploads/products/24/detail/5.png\",\"/uploads/products/24/detail/6.png\",\"/uploads/products/24/detail/7.jpg\",\"/uploads/products/24/detail/8.jpg\"]'),
(26, 25, '/uploads/products/25/main/1.png', 'Fri Dec 13 2024 10:11:06 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:11:06 GMT+0700 (Indochina Time)', '[\"/uploads/products/25/detail/2.png\",\"/uploads/products/25/detail/3.png\",\"/uploads/products/25/detail/4.jpg\",\"/uploads/products/25/detail/5.jpg\",\"/uploads/products/25/detail/6.png\",\"/uploads/products/25/detail/7.jpg\",\"/uploads/products/25/detail/8.png\"]'),
(27, 26, '/uploads/products/26/main/1.jpg', 'Fri Dec 13 2024 10:11:45 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 10:11:45 GMT+0700 (Indochina Time)', '[\"/uploads/products/26/detail/2.jpg\",\"/uploads/products/26/detail/3.jpg\",\"/uploads/products/26/detail/4.jpg\",\"/uploads/products/26/detail/6.jpg\",\"/uploads/products/26/detail/5.jpg\"]'),
(28, 27, '/uploads/products/27/main/1.png', 'Fri Dec 13 2024 15:53:42 GMT+0700 (Indochina Time)', 'Fri Dec 13 2024 15:53:42 GMT+0700 (Indochina Time)', '[\"/uploads/products/27/detail/2.jpg\",\"/uploads/products/27/detail/3.jpg\",\"/uploads/products/27/detail/4.jpg\",\"/uploads/products/27/detail/5.jpg\",\"/uploads/products/27/detail/6.png\"]'),
(29, 28, '/uploads/products/28/main/1.png', 'Sat Dec 14 2024 14:43:31 GMT+0700 (Indochina Time)', 'Sat Dec 14 2024 14:43:31 GMT+0700 (Indochina Time)', '[\"/uploads/products/28/detail/2.jpg\",\"/uploads/products/28/detail/3.jpg\",\"/uploads/products/28/detail/4.jpg\",\"/uploads/products/28/detail/5.jpg\",\"/uploads/products/28/detail/6.jpg\",\"/uploads/products/28/detail/7.jpg\",\"/uploads/products/28/detail/8.jpg\"]'),
(30, 29, '/uploads/products/29/main/1.png', 'Mon Dec 16 2024 01:39:28 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:39:28 GMT+0700 (Indochina Time)', '[\"/uploads/products/29/detail/2.png\",\"/uploads/products/29/detail/3.png\",\"/uploads/products/29/detail/4.jpg\",\"/uploads/products/29/detail/5.jpg\",\"/uploads/products/29/detail/6.jpg\",\"/uploads/products/29/detail/7.jpg\",\"/uploads/products/29/detail/8.png\"]'),
(31, 30, '/uploads/products/30/main/1.jpg', 'Mon Dec 16 2024 01:40:31 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:40:31 GMT+0700 (Indochina Time)', '[\"/uploads/products/30/detail/2.jpg\",\"/uploads/products/30/detail/3.png\",\"/uploads/products/30/detail/4.jpg\",\"/uploads/products/30/detail/5.png\",\"/uploads/products/30/detail/6.png\",\"/uploads/products/30/detail/7.jpg\",\"/uploads/products/30/detail/8.png\"]'),
(32, 31, '/uploads/products/31/main/1.jpg', 'Mon Dec 16 2024 01:41:06 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:41:06 GMT+0700 (Indochina Time)', '[\"/uploads/products/31/detail/2.jpg\",\"/uploads/products/31/detail/3.jpg\",\"/uploads/products/31/detail/4.jpg\",\"/uploads/products/31/detail/5.jpg\",\"/uploads/products/31/detail/6.jpg\"]'),
(33, 32, '/uploads/products/32/main/1.png', 'Mon Dec 16 2024 01:41:49 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:41:49 GMT+0700 (Indochina Time)', '[\"/uploads/products/32/detail/2.png\",\"/uploads/products/32/detail/3.png\",\"/uploads/products/32/detail/4.png\",\"/uploads/products/32/detail/5.png\",\"/uploads/products/32/detail/6.png\"]'),
(34, 33, '/uploads/products/33/main/1.png', 'Mon Dec 16 2024 01:42:29 GMT+0700 (Indochina Time)', 'Mon Dec 16 2024 01:42:29 GMT+0700 (Indochina Time)', '[\"/uploads/products/33/detail/2.png\",\"/uploads/products/33/detail/3.png\",\"/uploads/products/33/detail/4.png\",\"/uploads/products/33/detail/5.png\",\"/uploads/products/33/detail/6.png\"]'),
(35, 34, '/uploads/products/34/main/1.png', 'Thu Dec 19 2024 12:46:19 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 12:46:19 GMT+0700 (Indochina Time)', '[\"/uploads/products/34/detail/2.png\",\"/uploads/products/34/detail/3.png\",\"/uploads/products/34/detail/4.png\",\"/uploads/products/34/detail/5.png\",\"/uploads/products/34/detail/6.png\",\"/uploads/products/34/detail/7.jpg\",\"/uploads/products/34/detail/8.png\"]'),
(36, 38, '/uploads/products/38/main/1.png', 'Thu Dec 19 2024 12:53:28 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 12:53:28 GMT+0700 (Indochina Time)', '[\"/uploads/products/38/detail/2.png\"]'),
(37, 39, '/uploads/products/39/main/2.png', 'Thu Dec 19 2024 12:53:47 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 12:53:47 GMT+0700 (Indochina Time)', '[\"/uploads/products/39/detail/3.png\"]'),
(38, 40, '/uploads/products/40/main/7.jpg', 'Thu Dec 19 2024 13:22:02 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:22:02 GMT+0700 (Indochina Time)', '[\"/uploads/products/40/detail/2.png\"]'),
(39, 41, '/uploads/products/41/main/6.png', 'Thu Dec 19 2024 13:22:42 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:22:42 GMT+0700 (Indochina Time)', '[\"/uploads/products/41/detail/3.png\"]'),
(40, 42, '/uploads/products/42/main/6.png', 'Thu Dec 19 2024 13:24:58 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:24:58 GMT+0700 (Indochina Time)', '[\"/uploads/products/42/detail/2.png\"]'),
(41, 43, '/uploads/products/43/main/3.png', 'Thu Dec 19 2024 13:31:00 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:31:00 GMT+0700 (Indochina Time)', '[\"/uploads/products/43/detail/5.png\"]'),
(42, 44, '/uploads/products/44/main/5.png', 'Thu Dec 19 2024 13:35:57 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:35:57 GMT+0700 (Indochina Time)', '[\"/uploads/products/44/detail/4.png\"]'),
(43, 45, '/uploads/products/45/main/3.png', 'Thu Dec 19 2024 13:36:37 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:36:37 GMT+0700 (Indochina Time)', '[\"/uploads/products/45/detail/3.png\"]'),
(44, 46, '/uploads/products/46/main/4.png', 'Thu Dec 19 2024 13:39:10 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:39:10 GMT+0700 (Indochina Time)', '[\"/uploads/products/46/detail/2.png\"]'),
(45, 47, '/uploads/products/47/main/4.png', 'Thu Dec 19 2024 13:41:47 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:41:47 GMT+0700 (Indochina Time)', '[\"/uploads/products/47/detail/2.png\"]'),
(46, 48, '/uploads/products/48/main/5.png', 'Thu Dec 19 2024 13:42:16 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:42:16 GMT+0700 (Indochina Time)', '[\"/uploads/products/48/detail/3.png\"]'),
(47, 49, '/uploads/products/49/main/4.png', 'Thu Dec 19 2024 13:42:42 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:42:42 GMT+0700 (Indochina Time)', '[\"/uploads/products/49/detail/1.png\"]'),
(48, 50, '/uploads/products/50/main/4.png', 'Thu Dec 19 2024 13:43:10 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 13:43:10 GMT+0700 (Indochina Time)', '[\"/uploads/products/50/detail/3.png\"]'),
(49, 51, '/uploads/products/51/main/5.png', 'Thu Dec 19 2024 14:43:42 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 14:43:42 GMT+0700 (Indochina Time)', '[\"/uploads/products/51/detail/3.png\"]'),
(50, 52, '/uploads/products/52/main/4.png', 'Thu Dec 19 2024 14:48:12 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 14:48:12 GMT+0700 (Indochina Time)', '[\"/uploads/products/52/detail/7.jpg\"]'),
(51, 53, '/uploads/products/53/main/5.png', 'Thu Dec 19 2024 15:15:47 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 15:15:47 GMT+0700 (Indochina Time)', '[\"/uploads/products/53/detail/2.png\"]'),
(52, 54, '/uploads/products/54/main/3.png', 'Thu Dec 19 2024 15:16:44 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 15:16:44 GMT+0700 (Indochina Time)', '[\"/uploads/products/54/detail/1.png\"]'),
(53, 55, '/uploads/products/55/main/3.png', 'Thu Dec 19 2024 15:17:14 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 15:17:14 GMT+0700 (Indochina Time)', '[\"/uploads/products/55/detail/2.png\"]'),
(54, 56, '/uploads/products/56/main/3.png', 'Thu Dec 19 2024 15:20:52 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 15:20:52 GMT+0700 (Indochina Time)', '[\"/uploads/products/56/detail/2.png\"]'),
(55, 57, '/uploads/products/57/main/6.png', 'Thu Dec 19 2024 15:57:33 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 15:57:33 GMT+0700 (Indochina Time)', '[\"/uploads/products/57/detail/4.png\"]'),
(56, 58, '/uploads/products/58/main/5.png', 'Thu Dec 19 2024 16:08:47 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:08:47 GMT+0700 (Indochina Time)', '[\"/uploads/products/58/detail/2.png\"]'),
(57, 59, '/uploads/products/59/main/4.png', 'Thu Dec 19 2024 16:09:34 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:09:34 GMT+0700 (Indochina Time)', '[\"/uploads/products/59/detail/2.png\"]'),
(58, 60, '/uploads/products/60/main/4.png', 'Thu Dec 19 2024 16:11:26 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:11:26 GMT+0700 (Indochina Time)', '[\"/uploads/products/60/detail/2.png\"]'),
(59, 61, '/uploads/products/61/main/5.png', 'Thu Dec 19 2024 16:12:55 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:12:55 GMT+0700 (Indochina Time)', '[\"/uploads/products/61/detail/3.png\"]'),
(60, 62, '/uploads/products/62/main/7.jpg', 'Thu Dec 19 2024 16:13:41 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:13:41 GMT+0700 (Indochina Time)', '[\"/uploads/products/62/detail/2.png\"]'),
(61, 63, '/uploads/products/63/main/5.png', 'Thu Dec 19 2024 16:14:31 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:14:31 GMT+0700 (Indochina Time)', '[\"/uploads/products/63/detail/6.png\"]'),
(62, 64, '/uploads/products/64/main/6.png', 'Thu Dec 19 2024 16:31:52 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:31:52 GMT+0700 (Indochina Time)', '[\"/uploads/products/64/detail/2.png\"]'),
(63, 65, '/uploads/products/65/main/5.png', 'Thu Dec 19 2024 16:38:26 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:38:26 GMT+0700 (Indochina Time)', '[\"/uploads/products/65/detail/3.png\"]'),
(64, 66, '/uploads/products/66/main/6.png', 'Thu Dec 19 2024 16:39:55 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:39:55 GMT+0700 (Indochina Time)', '[\"/uploads/products/66/detail/2.png\"]'),
(65, 67, '/uploads/products/67/main/6.png', 'Thu Dec 19 2024 16:42:16 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:42:16 GMT+0700 (Indochina Time)', '[\"/uploads/products/67/detail/8.png\"]'),
(66, 68, '/uploads/products/68/main/5.png', 'Thu Dec 19 2024 16:42:57 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:42:57 GMT+0700 (Indochina Time)', '[\"/uploads/products/68/detail/6.png\"]'),
(67, 69, '/uploads/products/69/main/5.png', 'Thu Dec 19 2024 16:44:15 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:44:15 GMT+0700 (Indochina Time)', '[\"/uploads/products/69/detail/5.png\"]'),
(68, 70, '/uploads/products/70/main/4.png', 'Thu Dec 19 2024 16:47:37 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:47:37 GMT+0700 (Indochina Time)', '[\"/uploads/products/70/detail/2.png\"]'),
(69, 71, '/uploads/products/71/main/5.png', 'Thu Dec 19 2024 16:48:38 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:48:38 GMT+0700 (Indochina Time)', '[\"/uploads/products/71/detail/5.png\"]'),
(70, 72, '/uploads/products/72/main/6.png', 'Thu Dec 19 2024 16:49:33 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:49:33 GMT+0700 (Indochina Time)', '[\"/uploads/products/72/detail/3.png\"]'),
(71, 73, '/uploads/products/73/main/6.png', 'Thu Dec 19 2024 16:49:56 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:49:56 GMT+0700 (Indochina Time)', '[\"/uploads/products/73/detail/6.png\"]'),
(72, 74, '/uploads/products/74/main/4.png', 'Thu Dec 19 2024 16:52:13 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:52:13 GMT+0700 (Indochina Time)', '[\"/uploads/products/74/detail/6.png\"]'),
(73, 75, '/uploads/products/75/main/7.jpg', 'Thu Dec 19 2024 16:53:12 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:53:12 GMT+0700 (Indochina Time)', '[\"/uploads/products/75/detail/2.png\"]'),
(74, 76, '/uploads/products/76/main/5.png', 'Thu Dec 19 2024 16:53:51 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:53:51 GMT+0700 (Indochina Time)', '[\"/uploads/products/76/detail/2.png\"]'),
(75, 77, '/uploads/products/77/main/6.png', 'Thu Dec 19 2024 16:54:12 GMT+0700 (Indochina Time)', 'Thu Dec 19 2024 16:54:12 GMT+0700 (Indochina Time)', '[\"/uploads/products/77/detail/7.jpg\"]'),
(76, 78, '/uploads/products/78/main/1.png', 'Sat Jan 04 2025 21:18:29 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:18:29 GMT+0700 (Indochina Time)', '[\"/uploads/products/78/detail/2.png\",\"/uploads/products/78/detail/3.png\",\"/uploads/products/78/detail/4.jpg\",\"/uploads/products/78/detail/5.png\",\"/uploads/products/78/detail/6.png\",\"/uploads/products/78/detail/7.jpg\",\"/uploads/products/78/detail/8.jpg\"]'),
(77, 79, '/uploads/products/79/main/1.png', 'Sat Jan 04 2025 21:19:33 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:19:33 GMT+0700 (Indochina Time)', '[\"/uploads/products/79/detail/5.png\"]'),
(78, 80, '/uploads/products/80/main/1.png', 'Sat Jan 04 2025 21:20:52 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:20:52 GMT+0700 (Indochina Time)', '[\"/uploads/products/80/detail/2.png\"]'),
(79, 81, '/uploads/products/81/main/1.png', 'Sat Jan 04 2025 21:21:30 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:21:30 GMT+0700 (Indochina Time)', '[\"/uploads/products/81/detail/3.png\"]'),
(80, 82, '/uploads/products/82/main/2.png', 'Sat Jan 04 2025 21:23:33 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:23:33 GMT+0700 (Indochina Time)', '[\"/uploads/products/82/detail/3.png\"]'),
(81, 83, '/uploads/products/83/main/1.png', 'Sat Jan 04 2025 21:31:03 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:31:03 GMT+0700 (Indochina Time)', '[\"/uploads/products/83/detail/2.png\",\"/uploads/products/83/detail/3.png\",\"/uploads/products/83/detail/4.jpg\",\"/uploads/products/83/detail/5.png\",\"/uploads/products/83/detail/6.png\",\"/uploads/products/83/detail/7.jpg\",\"/uploads/products/83/detail/8.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `product_size`
--

CREATE TABLE `product_size` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `size` int NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_size`
--

INSERT INTO `product_size` (`id`, `product_id`, `size`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 8, 8, 'Sat Dec 07 2024 20:39:45 GMT+0700 (Indochina Time)', 'Sat Dec 07 2024 20:39:45 GMT+0700 (Indochina Time)'),
(2, 5, 9, 5, 'Sun Dec 08 2024 13:21:49 GMT+0700 (Indochina Time)', 'Sun Dec 08 2024 13:21:49 GMT+0700 (Indochina Time)'),
(3, 1, 7, 7, 'Mon Dec 09 2024 10:33:21 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 10:33:21 GMT+0700 (Indochina Time)'),
(4, 1, 5, 5, 'Mon Dec 09 2024 10:34:00 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 10:34:00 GMT+0700 (Indochina Time)'),
(5, 3, 6, 6, 'Mon Dec 09 2024 10:34:08 GMT+0700 (Indochina Time)', 'Mon Dec 09 2024 10:34:08 GMT+0700 (Indochina Time)'),
(6, 29, 1, 10, 'Fri Dec 20 2024 01:19:52 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 01:19:52 GMT+0700 (Indochina Time)'),
(7, 29, 2, 10, 'Fri Dec 20 2024 01:19:59 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 01:19:59 GMT+0700 (Indochina Time)'),
(8, 29, 3, 9, 'Fri Dec 20 2024 01:20:03 GMT+0700 (Indochina Time)', 'Fri Dec 20 2024 01:20:03 GMT+0700 (Indochina Time)'),
(9, 2, 9, 9, 'Sun Dec 22 2024 17:00:26 GMT+0700 (Indochina Time)', 'Sun Dec 22 2024 17:00:26 GMT+0700 (Indochina Time)'),
(10, 1, 9, 10, 'Sun Dec 22 2024 20:36:32 GMT+0700 (Indochina Time)', 'Sun Dec 22 2024 20:36:32 GMT+0700 (Indochina Time)'),
(11, 83, 8, 7, 'Sat Jan 04 2025 21:31:44 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:31:44 GMT+0700 (Indochina Time)'),
(12, 83, 9, 10, 'Sat Jan 04 2025 21:31:50 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:31:50 GMT+0700 (Indochina Time)');

-- --------------------------------------------------------

--
-- Table structure for table `ship_detail`
--

CREATE TABLE `ship_detail` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ship_detail`
--

INSERT INTO `ship_detail` (`id`, `user_id`, `name`, `phone`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'a', '0123456789', 'Thanh Xuan, Ha Noi', 'Thu Dec 26 2024 11:42:27 GMT+0700 (Indochina Time)', 'Thu Dec 26 2024 11:42:27 GMT+0700 (Indochina Time)'),
(2, 1, 'a', '0123456789', 'Thanh Xuan, Ha Noi', 'Thu Dec 26 2024 11:42:55 GMT+0700 (Indochina Time)', 'Thu Dec 26 2024 11:42:55 GMT+0700 (Indochina Time)'),
(3, 2, 'Vũ Quang Anh', '0961886948', 'Thanh Xuan, Ha Noi', 'Sat Jan 04 2025 21:40:10 GMT+0700 (Indochina Time)', 'Sat Jan 04 2025 21:40:10 GMT+0700 (Indochina Time)');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `phone_number`, `role`) VALUES
(1, 'admin', '$2b$10$SCu/ui3KfkasGONG8KUKiOINADWSPtilRll4uGy1NLT6i6ZtfgjJy', NULL, 'admin@gmail.com', '0123456789', 1),
(2, 'user', '$2b$10$x7wxp2TpdvvMVwMJIGITSu607IhiL6GZQ/RFIdhcCVnlNoyy0gx4O', NULL, 'b@gmail.com', '0123456789', 0);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('765f21ec-3a98-49cf-9ca0-8f89b70afe3e', '154c024b9d1c64957a6fa43e54de13b36256022ca96d1edbf81b2d59ebf30acd', '2024-12-05 15:38:17.512', '20241205153817_make_username_unique', NULL, NULL, '2024-12-05 15:38:17.394', 1),
('810da26d-e909-4a09-a2b8-6eb4a8716aa0', '77d0e7e514c99ae26b7193270ef4007acd8ac73311803386e2557d7cc8364e94', '2024-12-05 15:37:58.277', '20241124150603_add_product_size_relation1', NULL, NULL, '2024-12-05 15:37:58.260', 1),
('a1225a78-4152-4472-9033-95a737f54b80', '71c22db5aad47f36817f843c6babe66881eb67615c372f8f7ab6b1bfc3362657', '2024-12-05 15:37:58.255', '20241124145413_add_product_size_relation', NULL, NULL, '2024-12-05 15:37:58.016', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_image_product_id_key` (`product_id`);

--
-- Indexes for table `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ship_detail`
--
ALTER TABLE `ship_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD UNIQUE KEY `users_username_key` (`username`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `product_size`
--
ALTER TABLE `product_size`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ship_detail`
--
ALTER TABLE `ship_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
