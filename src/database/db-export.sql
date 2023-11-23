-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2023 at 02:21 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recruitment_fastprint`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(10) NOT NULL,
  `nama_kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`) VALUES
(5, 'CI MTH TINTA LAIN (IM)'),
(2, 'L MTH AKSESORIS (IM)'),
(6, 'L MTH AKSESORIS (LK)'),
(3, 'L MTH TABUNG (LK)'),
(1, 'L QUEENLY'),
(7, 'S MTH STEMPEL (IM)'),
(4, 'SP MTH SPAREPART (LK)');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int(50) NOT NULL,
  `id_produk` int(10) NOT NULL,
  `nama_produk` varchar(100) NOT NULL,
  `harga` bigint(50) NOT NULL,
  `kategori_id` int(10) NOT NULL,
  `status_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `id_produk`, `nama_produk`, `harga`, `kategori_id`, `status_id`) VALUES
(1, 6, 'ALCOHOL GEL POLISH CLEANSER GP-CLN01', 12500, 1, 1),
(2, 9, 'ALUMUNIUM FOIL ALL IN ONE BULAT 23mm IM', 1000, 2, 1),
(3, 11, 'ALUMUNIUM FOIL ALL IN ONE BULAT 30mm IM', 1000, 2, 1),
(4, 12, 'ALUMUNIUM FOIL ALL IN ONE SHEET 250mm IM', 12500, 2, 2),
(5, 15, 'eval(alert(1))', 12500, 2, 1),
(6, 17, 'ALUMUNIUM FOIL HDPE/PE BULAT 30mm IM', 1000, 2, 1),
(7, 18, 'ALUMUNIUM FOIL HDPE/PE SHEET 250mm IM', 13000, 2, 2),
(8, 19, 'ALUMUNIUM FOIL PET SHEET 250mm IM', 1000, 2, 2),
(9, 22, 'ARM PENDEK MODEL U', 13000, 2, 1),
(10, 23, 'ARM SUPPORT KECIL', 13000, 3, 2),
(11, 24, 'ARM SUPPORT KOTAK PUTIH', 13000, 2, 2),
(12, 26, 'ARM SUPPORT PENDEK POLOS', 13000, 3, 1),
(13, 27, 'ARM SUPPORT S IM', 1000, 2, 2),
(14, 28, 'ARM SUPPORT T (IMPORT)', 13000, 2, 1),
(15, 29, 'ARM SUPPORT T - MODEL 1 ( LOKAL )', 10000, 3, 1),
(16, 50, 'BLACK LASER TONER FP-T3 (100gr)', 13000, 2, 2),
(17, 56, 'BODY PRINTER CANON IP2770', 500, 4, 1),
(18, 58, 'BODY PRINTER T13X', 15000, 4, 1),
(19, 59, 'BOTOL 1000ML BLUE KHUSUS UNTUK EPSON R1800/R800 - 4180 IM (T054920)', 10000, 5, 1),
(20, 60, 'BOTOL 1000ML CYAN KHUSUS UNTUK EPSON R1800/R800/R1900/R2000 - 4120 IM (T054220)', 10000, 5, 2),
(21, 61, 'BOTOL 1000ML GLOSS OPTIMIZER KHUSUS UNTUK EPSON R1800/R800/R1900/R2000/IX7000/MG6170 - 4100 IM (T054', 1500, 5, 1),
(22, 62, 'BOTOL 1000ML L.LIGHT BLACK KHUSUS UNTUK EPSON 2400 - 0599 IM', 1500, 5, 2),
(23, 63, 'BOTOL 1000ML LIGHT BLACK KHUSUS UNTUK EPSON 2400 - 0597 IM', 1500, 5, 2),
(24, 64, 'BOTOL 1000ML MAGENTA KHUSUS UNTUK EPSON R1800/R800/R1900/R2000 - 4140 IM (T054320)', 1000, 5, 1),
(25, 65, 'BOTOL 1000ML MATTE BLACK KHUSUS UNTUK EPSON R1800/R800/R1900/R2000 - 3503 IM (T054820)', 1500, 5, 2),
(26, 66, 'BOTOL 1000ML ORANGE KHUSUS UNTUK EPSON R1900/R2000 IM - 4190 (T087920)', 1500, 5, 1),
(27, 67, 'BOTOL 1000ML RED KHUSUS UNTUK EPSON R1800/R800/R1900/R2000 - 4170 IM (T054720)', 1000, 5, 2),
(28, 68, 'BOTOL 1000ML YELLOW KHUSUS UNTUK EPSON R1800/R800/R1900/R2000 - 4160 IM (T054420)', 1500, 5, 2),
(29, 70, 'BOTOL KOTAK 100ML LK', 1000, 6, 1),
(30, 72, 'BOTOL 10ML IM', 1000, 7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id_status` int(10) NOT NULL,
  `nama_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id_status`, `nama_status`) VALUES
(1, 'bisa dijual'),
(2, 'tidak bisa dijual');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`),
  ADD UNIQUE KEY `nama_kategori` (`nama_kategori`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_produk` (`id_produk`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id_status`),
  ADD UNIQUE KEY `nama_status` (`nama_status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id_status` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
