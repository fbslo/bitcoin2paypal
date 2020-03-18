-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: exchange
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `address` text,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES ('15KAsQ9q8LsNqs4SF64uHfc31g2Lt4Hgw5','UNUSED'),('1CnUgpbywRWRuMXopz9vSaSCcHUFNE1EQ7','USED'),('18cCRSfB7w77BfPTdVjTgkc2n2KtNyMvJC','UNUSED'),('1A7nXMGVDaHNXw2tFFt8nTy8LTjxaNp7nf','UNUSED'),('15zH24caJifL7Zp55yqzJLrDyCQUzyrcRH','UNUSED'),('1LnyWfK2D18ASMXQar3s7QXhbrwRHZPZXx','UNUSED'),('1AGk2Cnpekv3RpvnJzXUqfWFJPtMskjKSq','UNUSED'),('1PiQTUXjrnzuUgKH4UAcu8wxaiXQ8jLPef','UNUSED'),('17ENyTz2DwnQdd6JtF7Gk9ZpwqhGVE34g8','UNUSED'),('18A2GL1UrRTHTZ7wgWLmq3wMaQMnM3VjtP','UNUSED'),('1DVDPeHMUKfoZ1jkTkAW9R4EUWoNpzow9V','UNUSED'),('1FsLg2v1qWDTYX3Bpft66VatyChZqnsPuS','UNUSED'),('1LpLvdp7MwBCPaiPSukBSZ6QZiYWU5Yh4m','UNUSED'),('18Q2tQNSqq8mN5dsLiDeJZcAdXsZYa5q8W','UNUSED'),('1Bbf7QGrspn915wfnGxZrucUsge8TDr8qS','UNUSED'),('18c3ecoRgb7kZndPKPKn5uCbpith32H21S','UNUSED'),('1KEYgn8mZfVmqQ6rQ78Xo5Zb2roZgfJ5dB','UNUSED'),('1441Xzjb1JmttM8vRrmMdJfeShuiUyupFU','UNUSED'),('1BnyfCLrz1hvP6Ktf5fRS9gjYGsv3UfvKd','UNUSED'),('1Q88psUTE2PKnJL2caZnkPWzrub7FUnXWQ','UNUSED'),('14nbih9x8uP16d3wGtg2p56fGz653pkZ8y','UNUSED'),('1PChP8RQdPHK2pVQzZT8CBSrANzxchKUVD','UNUSED'),('1GpkyuBind5rTNsG6dHQYBvmXMLRnrUTMg','UNUSED'),('1ETZ3bC161uVyrJB6A63oUkj8zk31tCuLE','UNUSED'),('1Bfwf6A1zotFZFKpFU98F4iwnwDCw77N2f','UNUSED'),('185J2dAM1muR4D8WFxr2MbYTxtpBGtKehT','UNUSED'),('1GrHMRPwQcCrHXSCdPGuu2fSNENfzzx9v9','UNUSED'),('1GDnKZshkc5CmsUHS2SkPb6ZRT9PhKJ1eH','UNUSED'),('163wML27WMmmcmo2i2jMNPQ1pVYMF6fGbQ','UNUSED'),('1GAo2Ksxyoc7DjXTXAky2meUSkYtDrYmfD','UNUSED'),('1DVaEY7kGkT94s5dusPQtBfpz5KrRgYUv3','UNUSED'),('183e6zXvez9LQ94K7DhM1dJUaMtVcAJxEw','UNUSED'),('1GxDcter6JxYwpGNcH7c6htm2DHuATQijC','UNUSED'),('17EAiYRt4adAjFy3o3C8M4c6nJzbcEXGo2','UNUSED'),('13bSGB3vfWL3dbacZwTrC5dFoydBGXW7MN','UNUSED'),('1NmVbRpYgHskQoBMcCz3WMR8GXShHYsdfg','UNUSED'),('1B7qAE3tXxrFYUPhcbhnBbJKwTMVVhw8Km','UNUSED'),('1Nxi7WJ9Fwkh1jBUWnJ8wovdxzhE32spsg','UNUSED'),('121Sz1zq74ACWVySJJHfWTQKnNdeMg6Nvs','UNUSED'),('1GsZtnYrhegCApsrYtob7p9ube34raimrk','UNUSED'),('1GKnVqZ87539CmyvdTpMJgrJRMbr7zoQsL','UNUSED'),('14HZiX3zwdiKcmrRDBeQiWk5xr2USugB1B','UNUSED'),('13aAHmPHA278oSeiX427SH7gMCoqydhQ61','UNUSED'),('1HBgUGfmWkEgJ61LDe55rK7bKfM1rKcjNq','UNUSED'),('1DNg55kab45H8ZkwyS5JwV9SGHNvfAfiSw','UNUSED'),('184gcbsqqV2NiEiGkZg3h7etHkGDg7ZQbx','UNUSED'),('1DPj9fmauHVeyz7iCiZaKCeXEPAtYDan6Z','UNUSED'),('1LTBiJGxxrichaPDHQ4GwG4cQM1tLbSWNc','UNUSED'),('1F1sbZW3ox6tdL7zTooMpuyzX5HebLTexx','UNUSED'),('14fLrAfJxRKBmWcv3gMX2JaT41Kb7b4dcB','UNUSED'),('1NqUQn6BMZnqVBrAvdRiymNKnEvB9qU778','UNUSED'),('1CDLJbdmfPpyMzeUGWVFWR3zW1FbBNVbsc','UNUSED'),('1KdDviyuP5tJms5s8h8494eHGupDzDdggH','UNUSED'),('12GaGisXNHLXvj4fNuQVLMn5Dy9fJ78ivN','UNUSED'),('18fsmQVFWThv5TcmvRBqFpU87o2tBNqsKx','UNUSED'),('1NyqnsKPZWUqXXfzidLr3gW1UrW4EMjyKD','UNUSED'),('1J1iCAG7V5c1eptMB9HayJ86Wfwnsypmgg','UNUSED'),('13aAbYZiA8x16JTiqsfMC5PPHEPiCEWDfh','UNUSED'),('1MxdTPw7rLd8DsGFFvSCfLKuhy8hGvYAtq','UNUSED'),('17wGRFwE5qcs8WqGydSup2G89JKiKQo1u6','UNUSED'),('13skgF2K9bEKJBZ1NHzvjR7osn4se7Vcjz','UNUSED'),('15dXYCiSefEFiwCiEaRrwQJ6p718oHAB7u','UNUSED'),('1NVSfveyQu2WHCJuxCd7PRdvGkM4TBYPnn','UNUSED'),('1DmMPwbx8RRZorgf449FqXweLmfJX2Pd69','UNUSED'),('12bQsnFj6JTmCS5z8BrQe4RZuFq5VaVkuN','UNUSED'),('1NFWASkhe69ZPNXmJ9stb95F3s16zWywDb','UNUSED'),('1HppZADo34S81woSPcQuBkjFQHmrV8HRKi','UNUSED'),('1Heavvai9NcJZCw1327NsdP4EPhZM5HDZr','UNUSED'),('14dY4rTMdFWW85m7aZTKpTCUcyS2GeYzoY','UNUSED'),('17LYZRJupbG6JH3aw4kM1PuH37HrtfzvaZ','UNUSED'),('1GeZKZdZpiySwFnfChXuxFtSNv6C45LLJn','UNUSED'),('1EX29Wp5RAWkhrkZGscaBNynFAL7iaAAtV','UNUSED'),('148EvgzDHcvHWi7bfvbBm9ZEsYwB85ab9W','UNUSED'),('1EfjMdSr4H9pkGWktnm34BopBMzAwqGSGq','UNUSED'),('1ERWoT4gnzLEusCq1RY62hpLExk6kKvdci','UNUSED'),('1PNaZi1SaShEibWtE66YGGYp9kyJS8a6Ez','UNUSED'),('1MS8FjnrfnZ5E5xhxjdV9ChMNubPQuZq81','UNUSED'),('1MxnpBPB5UPD4SyH3LGSfQ9oRNxgE4vMxP','UNUSED'),('165Gk1AM68WKs7xuSGKFjzwDcn9XvzjG1M','UNUSED'),('1NWevctv9EwnGpAiJqz8KrnsptDcnRegp6','UNUSED'),('1G9BbYASqP47zir8Rc7zuV8ZbpozGhSFZ2','UNUSED'),('15VaoHWKEhfjhLzD2xE2BA4YWe8bZFz27M','UNUSED'),('1KcSxziRHQvca3ift2Z7r5epcTaYg8ms8B','UNUSED'),('14xTgchpb2Mgx6EU6UQzPTgxjcgiFj4ctQ','UNUSED'),('14PWVxyf37EcXbGyNXnj1btzDuiLWt5csY','UNUSED'),('1JtYnJFAyKETPKyV5JNiytHFcc1rJY5qHF','UNUSED'),('1Gjst1aczm572pC7TwESEd54GcAhDNxjJ6','UNUSED'),('1MCW8TwWQyVur5boq4djitb33Q9W1sB9QB','UNUSED'),('1No93rWjz8fAThT1B5zMBQcKsb19KWzxv2','UNUSED'),('17ubDD1CStHNNn4oeUEdmw22xiTC8GtLLU','UNUSED'),('1N4X4jo1HGBLHtxpm4oDFKD5AEUjpPeHNP','UNUSED'),('1LAGowaTVc9DWdbfJYTy5MiMrYtniqNEgH','UNUSED'),('1CjNHmtjjaKyhcfMb3CLPFu3k1CRJuhLrd','UNUSED'),('1DizeLA3f3vEg9NPohHoq6VWoLnVLHia7t','UNUSED'),('1BmkGLJwmCpvmewkVtKBkFyZCKiX4pdLsJ','UNUSED'),('13CM7qgFmR6sTMKrNf52DX5PxmZ2MPTSpu','UNUSED'),('1637MVn7jxDv3pe3wYUkUhWGEdoYEgacec','UNUSED'),('14CMZf9xfZZMdBRmpcjyYkXbqdNbNf9Xxc','UNUSED'),('152mz5NNPGXt1uvjf4mpspBSAwhgx4MWmq','UNUSED'),('1ED2bxn3od9btFktjEZaJ3FhYYH44Y1GKS','UNUSED');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `affiliate`
--

DROP TABLE IF EXISTS `affiliate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `affiliate` (
  `affiliate_id` text,
  `clicks` text,
  `other` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affiliate`
--

LOCK TABLES `affiliate` WRITE;
/*!40000 ALTER TABLE `affiliate` DISABLE KEYS */;
INSERT INTO `affiliate` VALUES ('not_affiliate','308','Auto-created'),('admin','8','Auto-created'),('l9xgt8rppd0k','2','nohfuture'),('x5u1pi62mp7v','1','idkjunior'),('w6dzxvuth756','1','barbodelli'),('a7dzxvs7du872','0','self_help_hub'),('jpbuk7dn7q66','1','ClaimMcClaim'),('20sk9dkz5w92','0','cios12'),('43fuajz1yycw','1','starkbit'),('h6dv127cvg0o','0','indlorddza'),('a7tjzedv4prw','3','mbkm'),('81cwhio98f7d','0','ifeh4'),('a0p0icyoe5wm','0','siegfried1998'),('bfkvc007gvqg','0','Zach-Huffman'),('yc76z4o7mqvf','1','SexyBulgarian'),('t8uio72ukhx3','0','JMaddy1776'),('fjy0jb8uhkz6','0','AriPollackWriter'),('vnpmh37ksi2h','0','Wolflaws'),('6akfnqbf7021','0','taqwalawaal'),('kjaceh8mtxg1','0','DeepWebConspiracies'),('yy0ws8ee8f4x','0','qwertyquacky123'),('l5qmr93xps4u','1','thykneegrow_7van'),('ob9zdjaeuw5n','3','darkkong'),('97np1arw3s5j','0','ashrose32'),('eeoilc5xdmkb','0','Primary-Tea'),('mttbs50w1ack','0','znasmeznamte'),('8o7nppwz61f67gtx','7','reddit_promotion'),('8o7nppwz61f67gtx)','1','Auto-created');
/*!40000 ALTER TABLE `affiliate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchange`
--

DROP TABLE IF EXISTS `exchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchange` (
  `date` text,
  `email` text,
  `amount` decimal(12,8) DEFAULT NULL,
  `address` text,
  `id` text,
  `refferal` text,
  `ip` text,
  `receive` text,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange`
--

LOCK TABLES `exchange` WRITE;
/*!40000 ALTER TABLE `exchange` DISABLE KEYS */;
INSERT INTO `exchange` VALUES ('2020-03-06 20:07:05.035','darkkong2000@gmail.com',0.00001000,'1CnUgpbywRWRuMXopz9vSaSCcHUFNE1EQ7','d5f67e3c1dc9b04',NULL,NULL,'0.01','COMPLETED');
/*!40000 ALTER TABLE `exchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `email` text,
  `name` text,
  `phone` text,
  `message` text,
  `date` text,
  `ip` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES ('dmitriyhvcmka@mail.ru','AllencamUH AllencamUH','82677413818','Are you 18? Come in and don\'t be shy! \r\nhttps://loveawake.ru - More info!..','2020-03-09 17:09:14.709',NULL);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `views` (
  `post` text,
  `views` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES ('how_to_buy_bitcoin','473'),('paypal','630'),('yemen','413');
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitors`
--

DROP TABLE IF EXISTS `visitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitors` (
  `ip` text,
  `time` text,
  `affiliate` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitors`
--

LOCK TABLES `visitors` WRITE;
/*!40000 ALTER TABLE `visitors` DISABLE KEYS */;
INSERT INTO `visitors` VALUES ('146.212.211.28','2020-03-12 19:54:29.221','not_affiliate'),('146.212.211.28','2020-03-12 19:55:31.017','admin'),('45.152.182.138','2020-03-12 20:00:50.262','not_affiliate'),('107.77.216.139','2020-03-12 20:01:12.238','not_affiliate'),('146.212.211.28','2020-03-12 20:01:35.886','not_affiliate'),('146.212.211.28','2020-03-12 20:02:36.386','not_affiliate'),('45.152.182.138','2020-03-12 20:31:45.379','not_affiliate'),('45.152.182.138','2020-03-12 20:31:47.032','not_affiliate'),('45.152.182.138','2020-03-12 20:31:48.461','not_affiliate'),('66.249.64.125','2020-03-12 20:37:43.678','not_affiliate'),('98.254.83.103','2020-03-12 23:12:03.675','not_affiliate'),('98.254.83.103','2020-03-12 23:12:04.420','not_affiliate'),('198.108.66.240','2020-03-13 00:31:15.390','not_affiliate'),('198.108.66.240','2020-03-13 00:31:17.522','not_affiliate'),('45.152.182.138','2020-03-13 00:54:48.454','not_affiliate'),('184.105.139.67','2020-03-13 01:44:56.901','not_affiliate'),('84.17.46.203','2020-03-13 03:38:11.729','not_affiliate'),('167.99.102.248','2020-03-13 03:40:09.269','not_affiliate'),('5.101.0.209','2020-03-13 06:26:07.280','not_affiliate'),('5.196.87.107','2020-03-13 06:52:07.878','not_affiliate'),('35.243.193.198','2020-03-13 08:02:54.761','not_affiliate'),('35.243.193.198','2020-03-13 08:02:55.128','not_affiliate'),('92.37.35.182','2020-03-13 08:58:57.810','not_affiliate'),('84.17.46.178','2020-03-13 09:07:24.631','not_affiliate'),('107.77.216.139','2020-03-13 10:08:47.671','not_affiliate'),('107.77.216.139','2020-03-13 10:08:48.561','not_affiliate'),('198.108.66.176','2020-03-13 10:17:33.508','not_affiliate'),('198.108.66.112','2020-03-13 10:39:13.675','not_affiliate'),('172.105.11.111','2020-03-13 11:39:19.656','not_affiliate'),('213.81.220.240','2020-03-13 12:03:06.335','not_affiliate'),('213.81.220.240','2020-03-13 12:10:54.929','not_affiliate'),('198.108.66.144','2020-03-13 13:40:28.216','not_affiliate'),('128.14.133.58','2020-03-13 13:52:31.398','not_affiliate'),('146.212.211.143','2020-03-13 14:24:33.001','not_affiliate'),('146.212.211.143','2020-03-13 14:34:24.477','not_affiliate'),('146.212.211.143','2020-03-13 14:59:32.119','not_affiliate'),('51.159.23.43','2020-03-13 15:01:12.905','not_affiliate'),('146.212.211.143','2020-03-13 15:03:24.014','not_affiliate'),('146.212.211.143','2020-03-13 15:55:19.102','not_affiliate'),('146.212.211.143','2020-03-13 15:56:05.999','not_affiliate');
/*!40000 ALTER TABLE `visitors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-13 17:00:18
