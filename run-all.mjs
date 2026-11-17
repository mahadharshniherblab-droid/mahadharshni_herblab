// Starts the Herblab API (port 5000) and website (port 4173) in one window.
// Uses process.execPath and path.join, so spaces or brackets in the folder
// name can never break it the way a .bat launcher can.
import { spawn, execSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const log = createWriteStream(join(root, 'run.log'), { flags: 'w' });

const say = (tag, line) => {
  const text = `[${tag}] ${line}`;
  process.stdout.write(text);
  log.write(text);
};

// A previous run left behind can still hold the ports. Stop only leftover
// node.exe processes on our two ports - never anything else.
function freePort(port) {
  if (process.platform !== 'win32') return;
  let out = '';
  try { out = execSync('netstat -ano -p tcp', { encoding: 'utf8' }); } catch { return; }
  for (const line of out.split('\n')) {
    if (!line.includes('LISTENING')) continue;
    const cols = line.trim().split(/\s+/);
    const local = cols[1] ?? '';
    if (!local.endsWith(':' + port)) continue;
    const pid = cols[cols.length - 1];
    if (!pid || pid === '0' || Number(pid) === process.pid) continue;
    let name = '';
    try {
      name = execSync(`tasklist /FI "PID eq ${pid}" /NH /FO CSV`, { encoding: 'utf8' });
    } catch { continue; }
    if (!/^"node\.exe"/i.test(name.trim())) {
      say('run', `port ${port} is used by ${name.trim().split(',')[0]} - leaving it alone\n`);
      continue;
    }
    try {
      execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      say('run', `cleared port ${port} (stopped leftover node.exe, pid ${pid})\n`);
    } catch {}
  }
}

function start(tag, script, cwd) {
  const child = spawn(process.execPath, [script], { cwd });
  child.stdout.on('data', (d) => say(tag, d.toString()));
  child.stderr.on('data', (d) => say(tag, d.toString()));
  child.on('error', (e) => say(tag, `failed to start: ${e.message}\n`));
  child.on('exit', (code) => say(tag, `stopped (exit code ${code})\n`));
  return child;
}

const url = 'http://localhost:4173';

async function waitForSite() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

console.log('Mahadharshni Herblab - starting local servers...\n');
freePort(4173);
freePort(5000);
await new Promise((r) => setTimeout(r, 800));

const api = start('api', join(root, 'server', 'src', 'index.js'), join(root, 'server'));
const site = start('site', join(root, 'preview', 'preview-server.mjs'), join(root, 'preview'));

waitForSite().then((up) => {
  if (up) {
    say('run', `ready at ${url}\n`);
    console.log(`\n  The website is running at ${url}`);
    console.log('  Leave this window open. Close it to stop the site.\n');
    spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
  } else {
    console.log('\n  The website did not start - see the messages above.\n');
    say('run', 'the website did not come up\n');
  }
});

const stop = () => { api.kill(); site.kill(); process.exit(0); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
