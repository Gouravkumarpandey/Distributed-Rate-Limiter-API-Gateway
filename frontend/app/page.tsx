const services = [
  { name: 'Gateway', status: 'Operational', detail: '12.4k requests / min', accent: 'cyan' },
  { name: 'User service', status: 'Operational', detail: '18 ms p95 latency', accent: 'lime' },
  { name: 'Payment service', status: 'Operational', detail: '99.98% success rate', accent: 'amber' }
];

export default function Dashboard() { return <main><header><div><p className="kicker">CONTROL PLANE / PROD</p><h1>Traffic command</h1></div><span className="live"><i /> Live</span></header><section className="hero"><div><p className="kicker">DISTRIBUTED API GATEWAY</p><h2>One clear view of every request.</h2><p className="muted">Rate limits, upstream health, and edge activity in one quiet place.</p></div><div className="metric"><span>Requests today</span><strong>1,284,092</strong><em>+12.8%</em></div></section><section className="grid">{services.map((service) => <article className="service" key={service.name}><div className={`signal ${service.accent}`} /><div><h3>{service.name}</h3><p>{service.detail}</p></div><span className="status">{service.status}</span></article>)}</section><section className="activity"><div className="section-title"><h2>Edge activity</h2><span>Last 60 minutes</span></div><div className="bars">{Array.from({ length: 48 }, (_, index) => <i key={index} style={{ height: `${20 + ((index * 37) % 70)}%` }} />)}</div></section></main>; }
