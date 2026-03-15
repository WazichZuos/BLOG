import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const rootDir = process.cwd();
const inboxDir = path.join(rootDir, 'incoming-posts');
const postsDir = path.join(rootDir, 'source', '_posts');
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const helpRequested = args.includes('--help') || args.includes('-h');

if (helpRequested) {
  console.log('Usage: node scripts/import-and-publish.mjs [--dry-run] [file1.md file2.md ...]');
  console.log('No file arguments: import every Markdown file from incoming-posts/ and then publish.');
  console.log('With file arguments: copy those files into source/_posts/ and then publish.');
  process.exit(0);
}

const fileArgs = args.filter((arg) => !arg.startsWith('--'));

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function isMarkdownFile(filePath) {
  return ['.md', '.markdown'].includes(path.extname(filePath).toLowerCase());
}

function run(command, commandArgs) {
  const display = `${command} ${commandArgs.join(' ')}`;

  if (dryRun) {
    console.log(`[dry-run] ${display}`);
    return;
  }

  const result = spawnSync(command, commandArgs, {
    encoding: 'utf8',
    stdio: 'inherit',
    cwd: rootDir,
    shell: process.platform === 'win32'
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function collectInboxFiles() {
  if (!fs.existsSync(inboxDir)) {
    return [];
  }

  return fs
    .readdirSync(inboxDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
    .map((entry) => path.join(inboxDir, entry.name));
}

function copyOrMoveIntoPosts(files) {
  ensureDirectory(postsDir);

  const importedFiles = [];

  for (const sourcePath of files) {
    const absoluteSourcePath = path.isAbsolute(sourcePath)
      ? sourcePath
      : path.resolve(rootDir, sourcePath);

    if (!fs.existsSync(absoluteSourcePath)) {
      console.error(`File not found: ${absoluteSourcePath}`);
      process.exit(1);
    }

    if (!isMarkdownFile(absoluteSourcePath)) {
      console.error(`Only Markdown files are supported: ${absoluteSourcePath}`);
      process.exit(1);
    }

    const fileName = path.basename(absoluteSourcePath);
    const targetPath = path.join(postsDir, fileName);

    if (fs.existsSync(targetPath)) {
      console.error(`Target already exists, skipped to avoid overwrite: ${targetPath}`);
      process.exit(1);
    }

    if (dryRun) {
      console.log(`[dry-run] import ${absoluteSourcePath} -> ${targetPath}`);
      importedFiles.push(fileName);
      continue;
    }

    const sourceInsideInbox = path.dirname(absoluteSourcePath) === inboxDir;

    if (sourceInsideInbox) {
      fs.renameSync(absoluteSourcePath, targetPath);
    } else {
      fs.copyFileSync(absoluteSourcePath, targetPath);
    }

    importedFiles.push(fileName);
  }

  return importedFiles;
}

ensureDirectory(inboxDir);
ensureDirectory(postsDir);

const sourceFiles = fileArgs.length > 0 ? fileArgs : collectInboxFiles();

if (sourceFiles.length === 0) {
  console.log('No new Markdown files found. Add files to incoming-posts/ or drag files onto publish-blog.cmd.');
  process.exit(0);
}

const importedFiles = copyOrMoveIntoPosts(sourceFiles);
const commitMessage = `chore: publish ${importedFiles.length} post${importedFiles.length > 1 ? 's' : ''}`;

console.log(`Imported ${importedFiles.length} file(s): ${importedFiles.join(', ')}`);
run('npm', ['run', 'publish', '--', commitMessage]);