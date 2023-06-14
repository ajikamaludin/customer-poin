import {
    HiChartPie,
    HiUser,
    HiUsers,
    HiUserGroup,
    HiUserCircle,
    HiCog,
} from 'react-icons/hi'
import { HiTrophy } from 'react-icons/hi2'

export default [
    {
        name: 'Dashboard',
        show: true,
        icon: HiChartPie,
        route: route('dashboard'),
        active: 'dashboard',
        permission: 'view-dashboard',
    },
    {
        name: 'Customers',
        show: true,
        icon: HiUserCircle,
        route: route('customer.index'),
        active: 'customer.index',
        permission: 'view-customer',
    },
    {
        name: 'Point',
        show: true,
        icon: HiTrophy,
        route: route('customer-point.index'),
        active: 'customer-point.index',
        permission: 'view-customer-point',
    },
    {
        name: 'Admin',
        show: true,
        icon: HiUser,
        items: [
            {
                name: 'Roles',
                show: true,
                icon: HiUserGroup,
                route: route('roles.index'),
                active: 'roles.*',
                permission: 'view-role',
            },
            {
                name: 'Users',
                show: true,
                icon: HiUsers,
                route: route('user.index'),
                active: 'user.index',
                permission: 'view-user',
            },
        ],
    },
    {
        name: 'Setting',
        show: true,
        icon: HiCog,
        route: route('setting.index'),
        active: 'setting.index',
        permission: 'view-setting',
    },
]
