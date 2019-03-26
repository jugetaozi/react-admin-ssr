let _sql = `REPLACE INTO pub_YLnum (${Object.keys(datas[0]).join(',')}) VALUES ${values};`
let _sql = `INSERT INTO pub_YLnum (${Object.keys(datas[0]).join(',')}) VALUES ${values} ON DUPLICATE KEY UPDATE ${ON_DUPLICATE_KEY_UPDATE};`
let _sql_logic_delete = `UPDATE Pub_Ylnum_N SET Pub_Ylnum_N.delFlag=Pub_Ylnum_N.delFlag-1` //每次把标志位减一
let _sql_logic_delete = `UPDATE Pub_Ylnum_N SET Pub_Ylnum_N.delFlag=Pub_Ylnum_N.delFlag-1 WHERE x=1` //每次把标志位减一 当x=1时候

实现了同一功能

MySQL ON DUPLICATE KEY UPDATE 语法
mysql "ON DUPLICATE KEY UPDATE" 语法
如果在INSERT语句末尾指定了ON DUPLICATE KEY UPDATE，并且插入行后会导致在一个UNIQUE索引或PRIMARY KEY中出现重复值，则在出现重复值的行执行UPDATE；如果不会导致唯一值列重复的问题，则插入新行。 
例如，如果列 a 为 主键 或 拥有UNIQUE索引，并且包含值1，则以下两个语句具有相同的效果：

复制代码代码如下:

INSERT INTO TABLE (a,c) VALUES (1,3) ON DUPLICATE KEY UPDATE c=c+1;
UPDATE TABLE SET c=c+1 WHERE a=1;

如果行作为新记录被插入，则受影响行的值显示1；如果原有的记录被更新，则受影响行的值显示2。 
这个语法还可以这样用: 
如果INSERT多行记录(假设 a 为主键或 a 是一个 UNIQUE索引列):

复制代码代码如下:

INSERT INTO TABLE (a,c) VALUES (1,3),(1,7) ON DUPLICATE KEY UPDATE c=c+1;

执行后, c 的值会变为 4 (第二条与第一条重复, c 在原值上+1).

复制代码代码如下:

INSERT INTO TABLE (a,c) VALUES (1,3),(1,7) ON DUPLICATE KEY UPDATE c=VALUES(c);

执行后, c 的值会变为 7 (第二条与第一条重复, c 在直接取重复的值7). 
注意：ON DUPLICATE KEY UPDATE只是MySQL的特有语法，并不是SQL标准语法！ 
这个语法和适合用在需要 判断记录是否存在,不存在则插入存在则更新的场景.

INSERT INTO .. ON DUPLICATE KEY更新多行记录
如果在INSERT语句末尾指定了ON DUPLICATE KEY UPDATE，并且插入行后会导致在一个UNIQUE索引或PRIMARY KEY中出现重复值，则执行旧行UPDATE；如果不会导致唯一值列重复的问题，则插入新行。例如，如果列a被定义为UNIQUE，并且包含值1，则以下两个语句具有相同的效果：

复制代码代码如下:

INSERT INTO TABLE (a,b,c) 
VALUES (1,2,3) ON DUPLICATE KEY UPDATE c=c+1;
UPDATE TABLE SET c=c+1 WHERE a=1;

如果行作为新记录被插入，则受影响行的值为1；如果原有的记录被更新，则受影响行的值为2。
如果你想了解更多关于INSERT INTO .. ON DUPLICATE KEY的功能说明，详见MySQL参考文档：13.2.4. INSERT语法

现在问题来了，如果INSERT多行记录， ON DUPLICATE KEY UPDATE后面字段的值怎么指定？要知道一条INSERT语句中只能有一个ON DUPLICATE KEY UPDATE，到底他会更新一行记录，还是更新所有需要更新的行。这个问题困扰了我很久了，其实使用VALUES()函数一切问题都解决了。

举个例子，字段a被定义为UNIQUE，并且原数据库表table中已存在记录(2,2,9)和(3,2,1)，如果插入记录的a值与原有记录重复，则更新原有记录，否则插入新行：

复制代码代码如下:

INSERT INTO TABLE (a,b,c) VALUES 
(1,2,3),
(2,5,7),
(3,3,6),
(4,8,2)
ON DUPLICATE KEY UPDATE b=VALUES(b);

以上SQL语句的执行，发现(2,5,7)中的a与原有记录(2,2,9)发生唯一值冲突，则执行ON DUPLICATE KEY UPDATE，将原有记录(2,2,9)更新成(2,5,9)，将(3,2,1)更新成(3,3,1)，插入新记录(1,2,3)和(4,8,2)
注意：ON DUPLICATE KEY UPDATE只是MySQL的特有语法，并不是SQL标准语法！