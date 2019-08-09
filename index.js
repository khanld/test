const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const puppeteer = require('puppeteer')


app.get('/', async (req, res) => {

	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		})

		const page = await browser.newPage()
		await page.goto('https://www.uef.edu.vn', {
			waitUntil: ['domcontentloaded', 'networkidle0']
		})

		const titles = await page.evaluate(() => {
			let titles = document.querySelectorAll('.news-title>a')
			titles = [...titles]
			titles = titles.map(title => {
				return title.textContent
			})
			return titles
		})
		
		console.log(titles)
		res.send(titles)
		return await browser.close()

	} catch (e) {
		res.status(500).send(e)
	}	

})

app.listen(port, () => {
	console.log("Sever is now available at " + port)
})






