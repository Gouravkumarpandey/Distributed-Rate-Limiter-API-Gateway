import type { ReactNode } from 'react'; import { Navbar } from '../../components/layout/Navbar'; import { Sidebar } from '../../components/layout/Sidebar';
export default function DashboardLayout({ children }: { children: ReactNode }) { return <><Navbar /><div className="dashboard-shell"><Sidebar /><section className="dashboard-content">{children}</section></div></>; }
