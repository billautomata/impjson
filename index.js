#!/usr/bin/env node

var program = require('commander')
program
  .version('1.0.0')
  .usage('[options] <file>')
  .option('-o, --output [file]', 'output file, optional will stdout otherwise')
  .option('-i, --input [file]', 'input file')
  .option('-p, --precision <n>', 'float precision • ex. "-p 4" yields floats that look like 4.0003', parseInt)
  .parse(process.argv);

if(program.args.length === 0 && !program.input){
  program.outputHelp()
  return;
}

var fs = require('fs')

var filename = program.args[0] || program.input
var output_filename = program.output || filename + '.reduced.json'
var precision = program.precision || 4

var json_string = fs.readFileSync(filename)

console.log('original length: ' + json_string.length)

var obj = JSON.parse(json_string)

var n_found = 0

iterate(obj)

function iterate(o) {

  for (var key in o) {
    if (typeof o[key] === 'object') {
      iterate(o[key])
    } else {
      if (typeof o[key] === 'number') {
        n_found += 1
        o[key] = +o[key].toFixed(precision)
      }
    }
  }

}

// console.log('numbers found: ', n_found)
// console.log('reduced length: ' + JSON.stringify(obj, null, 0).length)

var pct = 1.0 - (JSON.stringify(obj, null, 0).length / json_string.length)

if(program.output){
  fs.writeFileSync(program.output, JSON.stringify(obj, null, 0))
} else {
  process.stdout.write(JSON.stringify(obj,null,0))
}

// console.log((pct * 100.0).toFixed(2) + '% reduction')
