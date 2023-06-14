import {
    HiChartPie,
    HiUser,
    HiCollection,
    HiAdjustments,
    HiPlusCircle,
    HiCurrencyDollar,
    HiCash,
    HiClipboardList,
    HiHashtag,
    HiUsers,
    HiUserGroup,
    HiUserCircle,
    HiOutlineTruck,
    HiDatabase,
    HiShoppingBag,
    HiReceiptTax,
    HiHome,
    HiInboxIn,
    HiOutlineCash,
    HiOutlineTable
} from "react-icons/hi";

export default [
    {
        name: "Dashboard",
        show: true,
        icon: HiChartPie,
        route: route("dashboard"),
        active: "dashboard",
        permission: "view-dashboard",
    },
    {
        name: "User",
        show: true,
        icon: HiUser,
        items: [
            {
                name: "Roles",
                show: true,
                icon: HiUserGroup,
                route: route("roles.index"),
                active: "roles.*",
                permission: "view-role",
            },
            {
                name: "Users",
                show: true,
                icon: HiUsers,
                route: route("user.index"),
                active: "user.index",
                permission: "view-user",
            },
        ],
    },
];