import * as fs from "fs";

async function main() {

    const baseFolder = '../bushidos';

    const href = "https://bushidos-nft.github.io/nfts";

    const baseFolderFiles = await new Promise<string[]>((res, rej) => fs.readdir(baseFolder, (err, files) => {
        if (err) rej(err);
        res(files);
    }))

    for (const folder of baseFolderFiles) {
        const json = JSON.parse(fs.readFileSync(`${baseFolder}/${folder}/meta.json`, 'utf8'));

        json.image = `${href}/bushidos/${folder}/image.png`

        await new Promise<void>(res => fs.writeFile(`${baseFolder}/${folder}/meta.json`, JSON.stringify(json, null, 4), (e) => {
            if (e) console.error(e)
            res();
        }))
    }
}

main()
