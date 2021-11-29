# Setup

```
npm install
```

# Usage

Open [the spreadsheet](https://docs.google.com/spreadsheets/d/1fQo0N2bCV0rLpplm-uaX8mW9_IARQSAdq0C-A_dz7yM/edit?usp=sharing) and do `File > Download > Comma-separated values`. Save the downloaded CSV file to the input folder as `input/apis.csv`. Then run:

```
node csv-to-json.js input/apis.csv
```

Copy the resulting JSON files in the output folder to the api-listing-data folder in the api3.org website repository.

These commands assume you have the web3-api-search repo and the api3.org repo cloned side by side each other in the same parent folder. If not, modify the commands as needed.

```
cp output/* ../api3.org/api-listing-data/
```

Add and commit the new JSON files to the api3.org website repository.

```
cd ../api3.org/
git pull
git add api-listing-data
git commit -m "Update Web3 API Search data"
git push
```
