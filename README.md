# impjson - imprecise json
imprecise json - reduce float precision and reduce file size - great for auto-generated json

`npm install -g impjson`

`impjson -i input.json -o output.json -p 4`

`impjson -i input.json -p 1 > output.json`


```
$ impjson

  Usage: impjson [options] <file>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -o, --output [file]  output file, optional will stdout otherwise
    -i, --input [file]   input file
    -p, --precision <n>  float precision • ex. "-p 4" yields 4.0003
```
