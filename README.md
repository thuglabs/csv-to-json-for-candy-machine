# Convert CSV to JSON metadata files

This script generates JSON metadata files for use with [Metaplex Candy Machine](https://github.com/metaplex-foundation/metaplex/tree/master/js/packages/cli) cli.

## How to use

Edit file `src/generate-json.ts` line 18-50 inserting detailes specific for your collection, like art name, descrioption, collection url, creator address.

Replace `assets/data.csv` with your specific CSV file with structure similar to this with first column art index and the rest art attributes (traits)

| Art Index | Attribute A | Attribute B | Attribute C |
| --------- | ----------- | ----------- | ----------- |
| 0         | Black       | Yes         | C00         |
| 1         | White       | Yes         | C01         |
| 2         | Red         | No          | C02         |

Run the script

```
yarn
yarn start
```

JSON metadata file will be genrated for each row with name `[index].json` within `assets` folder.
