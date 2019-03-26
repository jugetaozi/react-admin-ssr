CREATE TABLE   IF NOT EXISTS  `Pub_Ylnum_N` (
  -- `id` int(11) NOT NULL AUTO_INCREMENT,
  `YlNum` varchar(255) DEFAULT NULL,
  -- `pn` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `asin` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `subcategory` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `WireLength` varchar(255) DEFAULT NULL,
  `TerminalMaterial` varchar(255) DEFAULT NULL,
  `ExternalMaterial` varchar(255) DEFAULT NULL,
  `mouths` varchar(255) DEFAULT NULL,
  `Technology` varchar(255) DEFAULT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `AdapterType` varchar(255) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `delFlag`  int(11) NOT NULL DEFAULT 0
  -- PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `Pub_Ylnum_N` set YlNum='000', name='init data', delFlag='0';