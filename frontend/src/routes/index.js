import config from '../config';

import Home from '~/pages/Home';
import LogIn from '~/pages/LogIn';
import SignUp from '~/pages/SignUp';
import Auction from '~/pages/Auction';
import Room from '~/pages/Room';
import Result from '~/pages/Result';
// Menu
import Profile from '~/pages/Profile';
import WaitingAuction from '~/pages/WaitingAuction';
import AuctionHistory from '~/pages/AuctionHistory';

// Admin
import { AdminLayout } from '~/layouts';
import Dashboard from '~/pages/Admin/Dashboard';
import AuctionManagement from '~/pages/Admin/AuctionManagement';
import DepositManagement from '~/pages/Admin/DepositManagement';
import RoomManagement from '~/pages/Admin/RoomManagement';

// Không cần đăng nhập
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: LogIn },
    { path: config.routes.signup, component: SignUp },
    { path: config.routes.auction, component: Auction },
    { path: config.routes.room, component: Room },
    { path: config.routes.result, component: Result },
    // Menu
    { path: config.routes.profile, component: Profile },
    { path: config.routes.waiting_auction, component: WaitingAuction },
    { path: config.routes.auction_history, component: AuctionHistory },

    // Admin
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout },
    { path: config.routes.auction_management, component: AuctionManagement, layout: AdminLayout },
    { path: config.routes.deposit_management, component: DepositManagement, layout: AdminLayout },
    { path: config.routes.room_management, component: RoomManagement, layout: AdminLayout },
]

// Phải đăng nhập, nếu không đăng nhập -> nhảy sang login
const privateRoutes = [

]

export { publicRoutes, privateRoutes }