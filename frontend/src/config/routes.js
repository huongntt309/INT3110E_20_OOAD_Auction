const routes = {
    home: '/',
    login: '/dang-nhap',
    signup: '/dang-ky',
    auction: '/tat-ca-bien-so',
    room: '/phong-dau-gia',
    result: '/ket-qua-dau-gia',
    // Menu
    profile: '/ho-so',
    waiting_auction: '/bien-cho-dau-gia',
    auction_history: '/lich-su-dau-gia',

    // Admin
    dashboard: '/trang-chu',
    auction_management: '/quan-ly-dau-gia',
    room_management: '/quan-ly-dau-gia/:id',
    deposit_management: '/quan-ly-dat-coc',
};

export default routes;