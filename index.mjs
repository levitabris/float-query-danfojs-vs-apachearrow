import * as arrow from 'apache-arrow'
import * as df from 'danfojs-node'

const nrow = 1e6
const largeData = Array.from({ length: nrow }, (_, id) => ({
    id: id
    , prop1: Math.random() * nrow
    , prop2: Math.random() * nrow
    , prop3: Math.random() * nrow + ''
}))

const arrow_data = arrow.Table.new(
    // data
    [
        arrow.Uint32Vector.from(largeData.map(x => x.id)),
        arrow.Float64Vector.from(largeData.map(x => x.prop1)),
        arrow.Float64Vector.from(largeData.map(x => x.prop2)),
        arrow.Utf8Vector.from(largeData.map(x => x.prop3)),
    ],
    // names
    ['id', 'prop1', 'prop2', 'prop3']
)

const df_data = new df.DataFrame(largeData)

// prop2 greater than 123.456
console.log('test1: prop2 greater than 12345.67890')

// Arrow
console.time('arrow')
const arrow_result = arrow_data.filter(arrow.predicate.col('prop2').gt(12345.67890))
console.timeEnd('arrow')

// With Danfo
console.time('danfo')
const danfo_result = df_data.query({ 'column': 'prop2', 'is': '>', 'to': 12345.67890 })
console.timeEnd('danfo')

// Vanilla JS
console.time('plain Array filter')
const plain_result = largeData.filter(x => x.prop2 > 12345.67890)
console.timeEnd('plain Array filter')


// prop3 has string 666
console.log('test2: prop3 has string 666')
// Arrow
console.time('arrow')
const arrow_result_str = arrow_data.filter(x => x.prop3.includes('666'))
console.timeEnd('arrow')

// // With Danfo -> not supported!
// console.time('danfo')
// const danfo_result_str = df_data.query({ 'column': 'prop2', 'is': '>', 'to': 12345.67890 })
// console.timeEnd('danfo')

// Vanilla JS
console.time('plain Array filter')
const plain_result_str = largeData.filter(x => x.prop3.includes('666'))
console.timeEnd('plain Array filter')

//Outputs
// console.log(arrow_result.toArray())
// danfo_result.print()
// console.log(plain_result)
