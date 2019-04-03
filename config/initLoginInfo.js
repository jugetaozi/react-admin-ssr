module.exports = [
	{
		email: 'coco@admin.com',
		password: '123456',
		name: 'admin',
		nick: 'coco',
		detail_info: 'name:admin,password:123456',
		level: 0, //level对应 :'超级管理员','增删改查','增改查','改查','查'
		role: 0, //['超级管理员', '部门经理', '产品经理', '产品运营', '部门采购']
	},
	{
		email: 'leader@xcentz.com',
		password: 'chenyu123',
		name: 'chenyu',
		nick: 'rain',
		detail_info: '对应增删改查权限',
		level: 1, //level对应 :0:'超级管理员',1:'增删改查',2:'增改查',3:'改查',4:'查'
		role: 1, //0:'超级管理员', 1:'部门经理', 2:'产品经理', 3:'产品运营', 4:'部门采购'
	},
]
