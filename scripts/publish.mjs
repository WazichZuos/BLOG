import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const helpRequested = args.includes('--help') || args.includes('-h');
const messageParts = args.filter((arg) => !arg.startsWith('--'));

if (helpRequested) {
  console.log('Usage: npm run publish -- [--dry-run] [commit message]');
  console.log('Example: npm run publish -- "publish: update blog post"');
  process.exit(0);
}

function runGit(commandArgs, options = {}) {
  const display = `git ${commandArgs.join(' ')}`;

  if (dryRun) {
    console.log(`[dry-run] ${display}`);
    return {
      status: 0,
      stdout: '',
      stderr: ''
    };
  }

  const result = spawnSync('git', commandArgs, {
    encoding: 'utf8',
    stdio: options.captureOutput ? 'pipe' : 'inherit'
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    if (options.captureOutput) {
      if (result.stdout) {
        process.stdout.write(result.stdout);
      }
      if (result.stderr) {
        process.stderr.write(result.stderr);
      }
    }
    process.exit(result.status ?? 1);
  }

  return {
    status: result.status ?? 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? ''
  };
}

function captureGit(commandArgs) {
  const result = spawnSync('git', commandArgs, {
    encoding: 'utf8',
    stdio: 'pipe'
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    if (result.stdout) {
      process.stdout.write(result.stdout);
    }
    if (result.stderr) {
      process.stderr.write(result.stderr);
    }
    process.exit(result.status ?? 1);
  }

  return result.stdout.trim();
}

function ensureGitRepository() {
  const result = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
    encoding: 'utf8',
    stdio: 'pipe'
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    console.error('This folder is not a Git repository. Clone the GitHub repository or run git init and add a remote before using npm run publish.');
    process.exit(result.status ?? 1);
  }
}

function hasStagedChanges() {
  if (dryRun) {
    return true;
  }

  const result = spawnSync('git', ['diff', '--cached', '--quiet'], {
    encoding: 'utf8',
    stdio: 'pipe'
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status === 0) {
    return false;
  }

  if (result.status === 1) {
    return true;
  }

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  process.exit(result.status ?? 1);
}

const now = new Date();
const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
const commitMessage = messageParts.length > 0 ? messageParts.join(' ') : `chore: publish blog ${timestamp}`;

ensureGitRepository();

const branchName = captureGit(['branch', '--show-current']) || 'main';

console.log(`Target branch: ${branchName}`);
console.log(`Commit message: ${commitMessage}`);

runGit(['add', '-A']);

if (hasStagedChanges()) {
  runGit(['commit', '-m', commitMessage]);
} else {
  console.log('No local changes to commit. Skipping commit step.');
}

runGit(['push', 'origin', branchName]);

console.log('Publish flow completed. GitHub Actions will deploy the site after the push finishes.');