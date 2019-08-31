const axios = require('axios')
const convert = require('xml-js')

const xmlToJson = async () => {
  try {
    const {data} = await axios.get(
      'https://www.goodreads.com/shelf/list.xml?key=Plfc3fiqTxmZaAvMPXulw&q=learning'
    )
    console.log(data)
    var options = {compact: true, ignoreComment: true, alwaysChildren: true}
    var result = convert.xml2json(data, options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

xmlToJson()
