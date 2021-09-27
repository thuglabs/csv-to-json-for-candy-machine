import * as fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const results = [];

type Attribute = {
  trait_type: string;
  value: string;
};


const assetsPath = "../assets";
const dataFilePath = "data.csv";
const creatorAddress = "SOL1234567890ABCDEFGHIGHKLMNOPQSTUVWXYZ";

const getNftName = (name: string) => `ART #${name}`;
const getMetadata = (name: string, attributes: Attribute[]) => ({
  name: getNftName(name),
  symbol: "",
  description: "You hold in your possession an awesome art.",
  seller_fee_basis_points: 500,
  // "image.png" will be replaced with actual URL by metaplex cli
  image: "image.png",
  external_url: "https://solflare.com",
  animation_url: "",
  collection: {
    name: "Solflare X NFT",
    family: "Solflare",
  },
  properties: {
    files: [
      {
        // "image.png" will be replaced with actual URL by metaplex cli
        uri: "image.png",
        type: "image/png",
      },
    ],
    category: "image",
    creators: [
      {
        address: creatorAddress,
        share: 100,
      },
    ],
  },
  attributes,
});

const getAttributes = (props) => {
  // map attributes to the proper key/value objects
  const attrs = Object.keys(props).map((key) => {
    return {
      trait_type: key,
      value: props[key],
    };
  });

  return attrs;
};

const iterateOverItems = async () => {
  for (const row of results) {
    try {
      // get separately name and props
      const { Name: name, ...props } = row;
      //   console.log("name", name);
      const nameByNumber = Number.parseInt(name);
      const attributes = getAttributes(props);

      const metadata = getMetadata(name, attributes);
      const metadataString = JSON.stringify(metadata);

      const fileName = `${nameByNumber}.json`;
      const filePath = path.resolve(__dirname, assetsPath, fileName);
      fs.writeFileSync(filePath, metadataString);

      console.log(`metadata for ${nameByNumber} done!`);
    } catch (e) {
      // Catch anything bad that happens
      console.error("We've thrown! Whoops!", e);
    }
  }
};

const readCsv = async () => {
  fs.createReadStream(path.resolve(__dirname, assetsPath, dataFilePath))
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      //   console.log(results);
      //   {
      //     Name: '0000',
      //     'Background Color': 'palegreen',
      //     'Head Color': 'lightblue',
      //     'Neck Color': 'lightslategray',
      //      ...
      //   },
      iterateOverItems();
    });
};

const main = async () => {
  try {
    await readCsv();
  } catch (error) {
    console.log("Script failed with error: ", error.message);
  }
};

main();
