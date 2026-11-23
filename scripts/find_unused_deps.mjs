import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

function walk(dir, filelist = []) {
  const files = readdirSync(dir);
  files.forEach((file) => {
    const fullPath = join(dir, file);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, filelist);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      filelist.push(fullPath);
    }
  });
  return filelist;
}

function extractImports(fileContent) {
  const importRegex = /import\s+(?:[^'";]+\s+from\s+)?["']([^"']+)["']/g;
  const requireRegex = /require\(\s*["']([^"']+)["']\s*\)/g;
  const used = new Set();
  let match;
  while ((match = importRegex.exec(fileContent)) !== null) {
    used.add(match[1]);
  }
  while ((match = requireRegex.exec(fileContent)) !== null) {
    used.add(match[1]);
  }
  return used;
}

function isExternal(pkg) {
  return !pkg.startsWith('.') && !pkg.startsWith('/') && !pkg.startsWith('..');
}

function main() {
  const projectRoot = resolve('.');
  const pkg = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
  const allDeps = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ]);

  const files = walk(join(projectRoot, 'src'));
  const usedExternal = new Set();
  files.forEach((file) => {
    const content = readFileSync(file, 'utf8');
    const imports = extractImports(content);
    imports.forEach((i) => {
      if (isExternal(i)) {
        const pkgName = i.startsWith('@') ? i.split('/').slice(0, 2).join('/') : i.split('/')[0];
        usedExternal.add(pkgName);
      }
    });
  });

  const unused = [...allDeps].filter((d) => !usedExternal.has(d));
  console.log('Unused dependencies:');
  console.log(JSON.stringify(unused, null, 2));
}

main();
