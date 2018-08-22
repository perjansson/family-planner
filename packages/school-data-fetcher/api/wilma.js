import fetch from 'node-fetch'
import cheerio from 'cheerio'

import { Elliot, Owen, Lennon } from 'api/kids'

const KIDS = [Elliot, Owen, Lennon]
const WEB_PATH = 'https://wilma.turku.fi'
const API_PATH = id => `https://wilma.turku.fi/!${id}/overview`

const login = async () => {
  const res = await fetch(WEB_PATH)
  const html = await res.text()
  const $ = cheerio.load(html)
  const loginFormExists = $('.login-form').length > 0
  if (loginFormExists) {
    console.log('do login')
  }
}

const fetchForKids = async () => {
  await login()

  return KIDS.reduce(async (previousPromise, { id, name }) => {
    const acc = await previousPromise
    const res = await fetch(API_PATH(id))
    const json = await res.json()
    return { ...acc, [name]: json }
  }, {})
}

export default { fetchForKids }
