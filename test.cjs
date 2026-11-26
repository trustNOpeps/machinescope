const assert=require('node:assert/strict');const C=require('./dist/core.js');let n=0;function test(name,fn){fn();console.log('PASS '+name);n++;}
test('Quoted CSV, BOM, CRLF and embedded comma',()=>assert.deepEqual(C.parseCSV('\ufefftime,"sensor, a"\r\n0,"2.5"').rows,[['0','2.5']]));
test('Reject inconsistent rows',()=>assert.throws(()=>C.parseCSV('a,b\n1,2,3')));
test('Reject duplicate header',()=>assert.throws(()=>C.parseCSV('a,a\n1,2')));
test('Reject unclosed quotes',()=>assert.throws(()=>C.parseCSV('a\n"1')));
test('Missing numbers are not zero',()=>{let r=C.analyze(['',1,2,3,4,5,'NaN']);assert.equal(r.missing,2);assert.equal(r.mean,3)});
test('Known outlier isolated',()=>assert.deepEqual(C.analyze([1,2,3,4,5,6,100]).flags.map(p=>p.i),[6]));
test('Constant baseline deviations',()=>{assert.equal(C.analyze([2,2,2,2,2]).flags.length,0);assert.equal(C.analyze([2,2,2,2,20]).flags.length,1)});
test('RMS known values',()=>assert.equal(C.analyze([3,3,3,3,3]).rms,3));
test('Baseline requires sufficient valid samples',()=>assert.throws(()=>C.analyze([1,2,3,4,5,6],3.5,3)));
test('Demo detects injected anomalies',()=>assert.deepEqual(C.analyze(C.demo().rows.map(r=>r[1])).flags.map(p=>p.i),[73,74,151,198,199,200]));
test('Numeric validation',()=>{assert.equal(C.numeric(' '),false);assert.equal(C.numeric('Infinity'),false);assert.equal(C.numeric('-2.3e2'),true)});
console.log(`${n} tests passed`);
