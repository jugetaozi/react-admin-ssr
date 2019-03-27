CREATE TABLE   IF NOT EXISTS  `Asc_Bussiness_Report_N` (
  `SnapDate` date DEFAULT NULL COMMENT '统计日期',
  `ParentAsin` varchar(15) DEFAULT '' COMMENT '母Asin',
  `ChildAsin` varchar(15) DEFAULT '' COMMENT '子Asin',
  `title` varchar(500) DEFAULT '' COMMENT '产品标题',
  `Sessions` int(6) DEFAULT 0 COMMENT '单个用户访问数',
  `SessionPercentage` float(6,2) DEFAULT 0 COMMENT '访问占比。单个子Asin的用户访问数 / 用户访问数总和',
  `PageViews` int(6) DEFAULT 0 COMMENT '用户浏览数',
  `PageViewsPercentage` float(6,2) DEFAULT 0 COMMENT '浏览占比。单个子Asin的浏览数 / 浏览总数',
  `BuyBoxPercentage` float(6,2) DEFAULT 0 COMMENT '加入购物车的比率。',
  `UnitsOrdered` int(6) DEFAULT 0 COMMENT '用户购买的产品数量。',
  `UnitSessionPercentage` float(6,2) DEFAULT 0 COMMENT '订单转化率。 公式：100% * TotalOrderItems /  Sessions',
  `OrderedProductSales` int(6) DEFAULT 0 COMMENT '销售额，单位$。',
  `TotalOrderItems` int(6) DEFAULT 0 COMMENT '订单数。',
	`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `delFlag`  int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `Asc_Bussiness_Report_N` set title='init Data', delFlag='0';