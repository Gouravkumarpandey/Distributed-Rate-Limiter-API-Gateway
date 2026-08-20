const total = Number(process.argv[2] ?? 100);
const target = process.argv[3] ?? 'http://localhost:3000/health';
const results = await Promise.all(Array.from({ length: total }, () => fetch(target)));
const counts = results.reduce((summary, response) => { summary[response.status] = (summary[response.status] ?? 0) + 1; return summary; }, {});
console.log({ target, total, counts });
