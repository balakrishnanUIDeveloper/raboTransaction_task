#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COVERAGE_THRESHOLDS = {
  statements: 80,
  branches: 75,
  functions: 80,
  lines: 80
};

function padRight(str, length) {
  return str + ' '.repeat(Math.max(0, length - str.length));
}

function checkCoverage() {
  const coveragePath = path.join(__dirname, '../coverage/transaction-cart-app/coverage-summary.json');
  
  if (!fs.existsSync(coveragePath)) {
    console.error('❌ Coverage summary file not found. Run npm run test:coverage first.');
    process.exit(1);
  }

  const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
  const total = coverage.total;

  console.log('\n📊 Coverage Analysis Report');
  console.log('============================');
  
  const checks = [
    { name: 'Statements', actual: total.statements.pct, threshold: COVERAGE_THRESHOLDS.statements },
    { name: 'Branches', actual: total.branches.pct, threshold: COVERAGE_THRESHOLDS.branches },
    { name: 'Functions', actual: total.functions.pct, threshold: COVERAGE_THRESHOLDS.functions },
    { name: 'Lines', actual: total.lines.pct, threshold: COVERAGE_THRESHOLDS.lines }
  ];

  let allPassed = true;

  checks.forEach(check => {
    const status = check.actual >= check.threshold ? '✅' : '❌';
    const color = check.actual >= check.threshold ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    
    console.log(`${status} ${padRight(check.name, 12)}: ${color}${check.actual}%${reset} (threshold: ${check.threshold}%)`);
    
    if (check.actual < check.threshold) {
      allPassed = false;
    }
  });

  console.log('\n📈 Detailed Coverage:');
  console.log(`   Statements: ${total.statements.covered}/${total.statements.total}`);
  console.log(`   Branches:   ${total.branches.covered}/${total.branches.total}`);
  console.log(`   Functions:  ${total.functions.covered}/${total.functions.total}`);
  console.log(`   Lines:      ${total.lines.covered}/${total.lines.total}`);

  if (allPassed) {
    console.log('\n🎉 All coverage thresholds met!');
    console.log('📁 HTML report available at: coverage/transaction-cart-app/index.html');
  } else {
    console.log('\n⚠️  Some coverage thresholds not met.');
    console.log('💡 Consider adding more tests to improve coverage.');
    process.exit(1);
  }
}

checkCoverage();
