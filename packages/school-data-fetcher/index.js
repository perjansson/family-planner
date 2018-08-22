import dataFetcher from 'api/wilma'

;

(async () => {
  const schoolData = await dataFetcher.fetchForKids()
  console.log(schoolData)
})()
