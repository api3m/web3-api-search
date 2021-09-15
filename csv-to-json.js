#!/usr/bin/env node

const fs = require('fs')
const parse = require('csv-parse/lib/sync')

csv = fs.readFileSync(process.argv[2], 'utf8')
// console.log(csv)

const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true
})
// console.log(rows)

const apis = []
const categories = []
const providers = {}

for (const row of rows) {

    const api = row['API Name']
    const category = row['Category/Industry']
    const provider = row['Provider Name']

    apis.push({
        name: api,
        url_name: '',
        provider: provider,
        contact_provider_url: row['Contact'],
        api_logo_url: row['Logo'],
        documentation_url: row['Web2 Docs'],
        airnode_url: row['Airnode Docs'],
        free_access_url: '',
        short_description: row['Description'].substr(0, 10),
        description: row['Description'],
        categories: [category],
        tags: row['Tags'].split(",").map(x => x.trim())
    })

    if (!categories.includes(category)) {
        categories.push(category)
    }

    if (provider in providers) {
        providers[provider]['apis'].push(api)
    } else {
        providers[provider] = {
            name: provider,
            url_name: '',
            provider_logo_url: '',
            description: '',
            apis: [api]
        }
    }

}
// console.log(apis)
// console.log(categories)

function writeJSON(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data), {
        encoding: "utf8",
        flag: "w"
    })
}

const output = 'output'
if (!fs.existsSync(output)) {
    fs.mkdirSync(output)
}
writeJSON(output + '/apis.json', apis)
writeJSON(output + '/categories.json', categories)
writeJSON(output + '/providers.json', Object.values(providers))
