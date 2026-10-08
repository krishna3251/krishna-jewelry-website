import { renderToString } from 'react-dom/server';
import App from '../src/App';

const html = renderToString(<App />);
const checks: [string, boolean][] = [
  ['hero headline', html.includes('a point of view')],
  ['mandala svg', html.includes('<svg')],
  ['marquee strip', html.includes('in rotation') || html.includes('In rotation')],
  ['collections', html.includes('Choose your')],
  ['craft', html.includes('the luxury')],
  ['footer', html.includes('Krishna Jewelry')],
];
let failed = 0;
for (const [name, pass] of checks) {
  if (!pass) failed += 1;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`);
}
console.log('rendered length', html.length);
process.exit(failed === 0 ? 0 : 1);
