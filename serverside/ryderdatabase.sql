-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2018 at 06:46 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ryderdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoiceid` int(11) NOT NULL,
  `invoicedate` date NOT NULL,
  `ryder_id` varchar(15) NOT NULL,
  `hourlyfees` decimal(10,0) DEFAULT NULL,
  `dropfees` decimal(10,0) DEFAULT NULL,
  `adjustments` decimal(10,0) DEFAULT NULL,
  `tips` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoiceid`, `invoicedate`, `ryder_id`, `hourlyfees`, `dropfees`, `adjustments`, `tips`, `total`) VALUES
(60, '2018-02-13', '92306', '331', '91', '0', '40', '462'),
(61, '2018-02-13', '92306', '331', '91', '0', '40', '462'),
(62, '2018-03-13', '92306', '232', '71', '0', '34', '337'),
(63, '2017-08-21', '92306', '313', '102', '0', '31', '446'),
(64, '2017-09-04', '92306', '329', '116', '3', '25', '473'),
(65, '2017-09-18', '92306', '336', '106', '10', '47', '499'),
(66, '2017-10-02', '92306', '346', '102', '0', '29', '477'),
(67, '2017-10-16', '92306', '186', '48', '0', '13', '247'),
(68, '2017-10-30', '92306', '262', '75', '13', '25', '374'),
(69, '2017-11-13', '92306', '476', '0', '0', '0', '0'),
(70, '2017-11-27', '92306', '392', '105', '0', '20', '517'),
(71, '2017-12-11', '92306', '357', '117', '18', '39', '531'),
(72, '2017-12-21', '92306', '281', '101', '0', '38', '420'),
(73, '2018-01-02', '92306', '149', '51', '0', '18', '218'),
(74, '2018-01-02', '92306', '149', '51', '0', '18', '218'),
(75, '2018-01-16', '92306', '266', '81', '4', '37', '388'),
(76, '2018-03-27', '92306', '311', '130', '0', '0', '0'),
(77, '2018-04-10', '92306', '297', '99', '0', '23', '419');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_shift`
--

CREATE TABLE `invoice_shift` (
  `invoiceid` int(11) NOT NULL,
  `shiftid` int(11) NOT NULL,
  `ryder_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ryderinfo`
--

CREATE TABLE `ryderinfo` (
  `ryderid` varchar(15) NOT NULL,
  `name` varchar(60) NOT NULL,
  `city` varchar(40) NOT NULL,
  `pass` char(15) NOT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ryderinfo`
--

INSERT INTO `ryderinfo` (`ryderid`, `name`, `city`, `pass`, `email`) VALUES
('92306', 'John', 'Cork', 'Number2233..', 'johnmulcahy346@gmail.com'),
('92307', 'demo', 'city', 'password', 'demo@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `shiftlog`
--

CREATE TABLE `shiftlog` (
  `shiftid` int(11) NOT NULL,
  `workdate` date NOT NULL,
  `day` varchar(14) NOT NULL,
  `starttime` time NOT NULL,
  `finishtime` time NOT NULL,
  `hours` float NOT NULL,
  `orders` int(11) NOT NULL,
  `pay` float NOT NULL,
  `ryder_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shiftlog`
--

INSERT INTO `shiftlog` (`shiftid`, `workdate`, `day`, `starttime`, `finishtime`, `hours`, `orders`, `pay`, `ryder_id`) VALUES
(2715, '2017-08-07', 'Monday', '17:00:00', '21:00:00', 4, 11, 43, '92306'),
(2716, '2017-08-10', 'Thursday', '16:58:00', '21:04:00', 4.1, 13, 45.79, '92306'),
(2717, '2017-08-11', 'Friday', '17:00:00', '21:15:00', 4.3, 12, 46.4, '92306'),
(2718, '2017-08-12', 'Saturday', '18:00:00', '22:00:00', 4, 12, 44, '92306'),
(2719, '2017-08-13', 'Sunday', '17:59:00', '21:15:00', 3.3, 11, 37.4, '92306'),
(2720, '2017-08-15', 'Tuesday', '17:00:00', '21:01:00', 4, 8, 40.79, '92306'),
(2721, '2017-08-16', 'Wednesday', '18:58:00', '21:57:00', 3, 8, 32, '92306'),
(2722, '2017-08-17', 'Thursday', '17:00:00', '21:00:00', 4, 8, 40, '92306'),
(2723, '2017-08-18', 'Friday', '17:00:00', '21:00:00', 4, 10, 42, '92306'),
(2724, '2017-08-19', 'Saturday', '18:00:00', '22:15:00', 4.3, 9, 43.4, '92306'),
(2725, '2017-08-20', 'Sunday', '17:57:00', '21:32:00', 3.6, 9, 37.8, '902306'),
(2726, '2017-08-22', 'Tuesday', '17:00:00', '22:13:00', 5.2, 10, 52.4, '902306'),
(2727, '2017-08-23', 'Wednesday', '16:59:00', '21:03:00', 4.1, 15, 47.79, '902306'),
(2728, '2017-08-24', 'Thursday', '16:58:00', '20:59:00', 4, 12, 44, '902306'),
(2729, '2017-08-25', 'Friday', '16:59:00', '20:32:00', 3.6, 11, 39.8, '902306'),
(2730, '2017-08-26', 'Saturday', '18:00:00', '21:53:00', 3.9, 13, 44.2, '902306'),
(2731, '2017-08-27', 'Sunday', '18:01:00', '21:30:00', 3.5, 11, 39, '902306'),
(2732, '2017-08-30', 'Wednesday', '17:00:00', '22:00:00', 5, 11, 51, '902306'),
(2733, '2017-08-31', 'Thursday', '17:00:00', '21:05:00', 4.1, 12, 44.79, '902306'),
(2734, '2017-09-01', 'Friday', '17:00:00', '21:00:00', 4, 12, 44, '902306'),
(2735, '2017-08-20', 'Sunday', '17:57:00', '21:32:00', 3.6, 9, 37.8, '92306'),
(2736, '2017-08-22', 'Tuesday', '17:00:00', '22:13:00', 5.2, 10, 52.4, '92306'),
(2737, '2017-08-23', 'Wednesday', '16:59:00', '21:03:00', 4.1, 15, 47.79, '92306'),
(2738, '2017-08-24', 'Thursday', '16:58:00', '20:59:00', 4, 12, 44, '92306'),
(2739, '2017-08-25', 'Friday', '16:59:00', '20:32:00', 3.6, 11, 39.8, '92306'),
(2740, '2017-08-26', 'Saturday', '18:00:00', '21:53:00', 3.9, 13, 44.2, '92306'),
(2741, '2017-08-27', 'Sunday', '18:01:00', '21:30:00', 3.5, 11, 39, '92306'),
(2742, '2017-08-30', 'Wednesday', '17:00:00', '22:00:00', 5, 11, 51, '92306'),
(2743, '2017-08-31', 'Thursday', '17:00:00', '21:05:00', 4.1, 12, 44.79, '92306'),
(2744, '2017-09-01', 'Friday', '17:00:00', '21:00:00', 4, 12, 44, '92306');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoiceid`) USING BTREE,
  ADD KEY `ryder_id` (`ryder_id`);

--
-- Indexes for table `invoice_shift`
--
ALTER TABLE `invoice_shift`
  ADD PRIMARY KEY (`invoiceid`,`shiftid`,`ryder_id`),
  ADD KEY `invoiceid` (`invoiceid`),
  ADD KEY `shiftid` (`shiftid`),
  ADD KEY `ryder_id` (`ryder_id`),
  ADD KEY `shiftid_2` (`shiftid`,`ryder_id`);

--
-- Indexes for table `ryderinfo`
--
ALTER TABLE `ryderinfo`
  ADD PRIMARY KEY (`ryderid`);

--
-- Indexes for table `shiftlog`
--
ALTER TABLE `shiftlog`
  ADD PRIMARY KEY (`shiftid`,`ryder_id`),
  ADD KEY `ryder_id` (`ryder_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoiceid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
--
-- AUTO_INCREMENT for table `shiftlog`
--
ALTER TABLE `shiftlog`
  MODIFY `shiftid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2745;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`ryder_id`) REFERENCES `ryderinfo` (`ryderid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_shift`
--
ALTER TABLE `invoice_shift`
  ADD CONSTRAINT `invoice_shift_ibfk_1` FOREIGN KEY (`invoiceid`) REFERENCES `invoice` (`invoiceid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_shift_ibfk_2` FOREIGN KEY (`shiftid`,`ryder_id`) REFERENCES `shiftlog` (`shiftid`, `ryder_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
