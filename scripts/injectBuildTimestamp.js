#!/usr/bin/env node

/**
 * Build Post-Processor
 * Injects build timestamp into index.html for cache busting
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const indexPath = join(distPath, 'index.html');

try {
  console.log('📝 Injecting build timestamp...');
  
  // Read the built index.html
  let html = readFileSync(indexPath, 'utf-8');
  
  // Generate build timestamp
  const buildTimestamp = Date.now().toString();
  
  // Replace placeholder with actual timestamp
  html = html.replace('{{BUILD_TIMESTAMP}}', buildTimestamp);
  
  // Write back
  writeFileSync(indexPath, html, 'utf-8');
  
  console.log(`✅ Build timestamp injected: ${buildTimestamp}`);
  console.log(`   Date: ${new Date(parseInt(buildTimestamp)).toISOString()}`);
} catch (error) {
  console.error('❌ Failed to inject build timestamp:', error.message);
  process.exit(1);
}
