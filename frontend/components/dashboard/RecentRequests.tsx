const requests = [['GET', '/api/user/users/123', '200'], ['POST', '/api/payment/payments', '201'], ['GET', '/api/user/users/456', '429']];
export function RecentRequests() { return <div className="request-list">{requests.map(([method, path, status]) => <div className="request-row" key={`${method}${path}`}><b>{method}</b><code>{path}</code><span>{status}</span></div>)}</div>; }
