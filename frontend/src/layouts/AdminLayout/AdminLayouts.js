import Header from './components/Header';
import Sidebar from './components/Sidebar';

function AdminLayout({ children }) {
    return (
        <div>
            <div>
                <Header />
                <div className='mt-[var(--admin-layout-header-height)]'>
                    <Sidebar />
                    <main className='ml-[var(--admin-layout-sidebar-width)] bg-[var(--background-color)]'>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;