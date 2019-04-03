CREATE TABLE   IF NOT EXISTS  `User_Info_N` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `detail_info` longtext DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `level` int(11) DEFAULT 5,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `User_Info_N` set name='d3be953436f112b36ef108f4c8669680',nick='CoCo',detail_info='name:admin,password:123456', email='coco@admin.com', level=0, role=0, password='7b35039bdc55847cea2c2cb9f9b8eca3';