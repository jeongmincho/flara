const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const bookListLinks = []
const bookLinks = new Set()
const books = []
let count = 0
/* An array of the links for list of books on the "learning" shelf */
/* Populates an array of 5 pages of books on learning */
const getListLinks = links => {
  for (let i = 1; i < 3; i++) {
    links.push(`https://www.goodreads.com/shelf/show/learning?page=${i}`)
  }
}
getListLinks(bookListLinks)

const getBookLinks = async () => {
  const promises = bookListLinks.map(async link => {
    const {data} = await axios.get(link)
    const $ = cheerio.load(data)
    $('a.leftAlignedImage').each(function(i, elem) {
      console.log(elem.attribs.href)
      bookLinks.add(`https://www.goodreads.com${elem.attribs.href}`)
    })
  })
  await Promise.all(promises)

  console.log(bookLinks)
  const promises2 = [...bookLinks].map(async link => {
    try {
      const {data} = await axios.get(link)
      const $ = cheerio.load(data)
      const book = {}
      book.id = count
      book.title = $('h1#bookTitle')
        .text()
        .trim()
      book.author = []
      $('a.authorName')
        .find('span')
        .each((i, author) => {
          book.author.push(author.children[0].data)
        })
      book.imageUrl = $('img#coverImage')['0'].attribs.src
      book.rating = $("span[itemprop = 'ratingValue']")[
        '0'
      ].children[0].data.trim()
      book.desc = $('div#description')
        .find('span')
        .text()
      books.push(book)
      count++
    } catch (error) {
      console.error(error)
    }
  })

  await Promise.all(promises2)
  writeRecipesArraytoJSONFile(books)
}

const writeRecipesArraytoJSONFile = books => {
  const json = JSON.stringify(books)
  fs.writeFile(`${__dirname}/books.json`, json, 'utf8', err => {
    if (err) throw err
  })
}

getBookLinks()
