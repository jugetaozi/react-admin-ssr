CREATE TABLE   IF NOT EXISTS  `Asc_Sponsored_Products_Advertised_N` (
  `SnapDate` date DEFAULT NULL COMMENT '广告日期',
  `PortfolioName` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Currency` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '货币单位',
  `CampaignName` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `AdGroupName` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `AdvertisedSku` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `AdvertisedAsin` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Impressions` int(11) DEFAULT 0,
  `Clicks` int(11) DEFAULT 0,
  `CTR` float(8,6) DEFAULT 0,
  `CPC` float(6,2) DEFAULT 0,
  `spend` float(6,2) DEFAULT 0,
  `7DayTotalSales` float(6,2) DEFAULT 0,
  `ACoS` float(6,2) DEFAULT 0,
  `RoAS` float(6,2) DEFAULT 0,
  `7DayTotalOrders` int(11) DEFAULT 0,
  `7DayTotalUnits` int(11) DEFAULT 0,
  `7DayConversionRate` float(8,6) DEFAULT 0,
  `7DayAdvertisedSkuUnits` int(11) DEFAULT 0,
  `7DayOtherSkuUnits` int(11) DEFAULT 0,
  `7DayAdvertisedSkuSales` float(6,2) DEFAULT 0,
  `7DayOtherSkuSales` float(6,2) DEFAULT 0,
	`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `delFlag`  int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- INSERT INTO `Asc_Sponsored_Products_Advertised_N` set PortfolioName='init Data', delFlag='0';