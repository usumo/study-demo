const result = require('../models/return');
const Index = require('../models/index');
const sql = require('../models/sql');

let IndexController = {
    async Login(ctx, next) {
        const {
            password,
            username
        } = ctx.request.body;
        if (password === '123456' && username === 'admin') {
            ctx.body = {
                status: 'ok',
                currentAuthority: 'admin'
            };
            return;
        }
        if (password === '123456' && username === 'user') {
            ctx.body = {
                status: 'ok',
                currentAuthority: 'user',
            };
            return;
        }
        ctx.body = {
            status: 'error',
            message: '账号或密码不正确'
        };
    },
    logout(ctx, body) {
        ctx.body = {
            status: 'ok',
            message: '退出成功'
        };
    },
    currentUser(ctx, body) {
        ctx.body = {
            name: 'Serati Ma',
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            signature: '海纳百川，有容乃大',
            title: '交互专家',
            group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
            tags: [{
                    key: '0',
                    label: '很有想法的',
                },
                {
                    key: '1',
                    label: '专注设计',
                },
                {
                    key: '2',
                    label: '辣~',
                },
                {
                    key: '3',
                    label: '大长腿',
                },
                {
                    key: '4',
                    label: '川妹子',
                },
                {
                    key: '5',
                    label: '海纳百川',
                },
            ],
            notifyCount: 12,
            unreadCount: 11,
            country: 'China',
            geographic: {
                province: {
                    label: '浙江省',
                    key: '330000',
                },
                city: {
                    label: '杭州市',
                    key: '330100',
                },
            },
            address: '西湖区工专路 77 号',
            phone: '0752-268888888',
        }
    },
    MenuList(ctx, body) {
        ctx.body = [{
                path: '/home',
                name: 'home',
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                children: [{
                        path: '/dashboard/analysis',
                        name: 'analysis',
                    },
                    {
                        path: '/dashboard/monitor',
                        name: 'monitor',
                    },
                ],
            },
        ];
    }
};

module.exports = IndexController;