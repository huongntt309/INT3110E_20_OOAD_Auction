import config from '../config';

import Home from '~/pages/Home';
import LogIn from '~/pages/LogIn';
import SignUp from '~/pages/SignUp';
import Products from '~/pages/Products';
import Result from '~/pages/Result';
import Profile from '~/pages/Profile';

// Không cần đăng nhập
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: LogIn },
    { path: config.routes.signup, component: SignUp },
    { path: config.routes.products, component: Products },
    { path: config.routes.result, component: Result },
    { path: config.routes.profile, component: Profile },
]

// Phải đăng nhập, nếu không đăng nhập -> nhảy sang login
const privateRoutes = [

]

export { publicRoutes, privateRoutes }