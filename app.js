const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const url = ""

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const left = []
            const right = []
            $('.spec_ttle', html).each(function () {
                const title = $(this).text()
                left.push({
                    title
                })
            })
            $('.spec_des', html).each(function () {
                const field = $(this).text()
                right.push({
                    field
                })
            })

            let results = []
            left.forEach((l, idx) => {
                let obj = {}
                // console.log(left[idx])
                obj[left[idx].title] = right[idx].field.trim()
                results.push(obj)
            })

            let data = Object.assign({}, ...results)
            res.json({ data: data })
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

