export default async function Services() {
  let services = [];
  try {
    const res = await fetch('http://localhost:3000/management/services', { cache: 'no-store' });
    if (res.ok) services = await res.json();
  } catch (e) {
    console.error('Failed to fetch services', e);
  }

  return (
    <div>
      <p className="kicker">UPSTREAMS / REGISTRY</p>
      <h1>Services</h1>
      <div className="table">
        {services.length === 0 && <div className="request-row">No services registered.</div>}
        {services.map((service: any) => (
          <div className="request-row" key={service.id}>
            <div>
              <b>{service.name}</b>
              <span style={{ marginLeft: '1rem', color: '#888' }}>{service.targetUrl}</span>
            </div>
            <span className={service.active ? 'healthy' : 'muted'}>
              {service.active ? 'Operational' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
