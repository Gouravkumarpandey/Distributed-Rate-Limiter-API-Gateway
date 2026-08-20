import Link from 'next/link';
const links = [['/dashboard', 'Overview'], ['/dashboard/api-keys', 'API keys'], ['/dashboard/services', 'Services'], ['/dashboard/rate-limits', 'Rate limits'], ['/dashboard/analytics', 'Analytics'], ['/dashboard/logs', 'Logs']];
export function Sidebar() { return <nav className="sidebar">{links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}</nav>; }
