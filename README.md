# float-query-danfojs-vs-apachearrow
A simple performance comparison for (in-browser) JS data analysis libraries:

Check their repositories:

Danfo.js
https://github.com/javascriptdata/danfojs

Apache Arrow (in JS)
https://github.com/apache/arrow/tree/master/js

### My spec

MacBook Pro (Retina, 15-inch, Mid 2015)

2.8 GHz Quad-Core Intel Core i7

16 GB 1600 MHz DDR3

Intel Iris Pro 1536 MB

### Resutls:
```
test1: prop2 greater than 12345.67890
arrow: 0.774ms 👏
danfo: 5.019s
plain Array filter: 49.217ms
test2: prop3 has string 666
arrow: 0.932ms 👏
plain Array filter: 108.209ms
```

Run `npm dev` to see results from console.

# TODO
[] add *arquero* (https://github.com/uwdata/arquero) for the same test
