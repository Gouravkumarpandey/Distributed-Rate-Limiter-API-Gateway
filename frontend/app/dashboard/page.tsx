import { StatsCard } from '../../components/dashboard/StatsCard';
import { RequestChart } from '../../components/dashboard/RequestChart';
import { RecentRequests } from '../../components/dashboard/RecentRequests';

export default function Dashboard() {
  return <div><p className="kicker">CONTROL PLANE / PROD</p><h1>Traffic command</h1><p className="muted">A live view of your gateway edge.</p><div className="stats-grid"><StatsCard label="Requests today" value="1,284,092" trend="+12.8%" /><StatsCard label="P95 latency" value="18 ms" /><StatsCard label="Rate limited" value="0.34%" /></div><section className="panel"><div className="section-title"><h2>Request volume</h2><span>Last 60 minutes</span></div><RequestChart /></section><section className="panel"><div className="section-title"><h2>Recent requests</h2><span>Live feed</span></div><RecentRequests /></section></div>;
}
