import * as fs from "fs";

async function main() {
    const folders = [
        "Cyborg",
        "Ghost",
        "Ronin",
        "Samurai",
        "Undead",
        "Zombie",
    ]

    const baseFolder = '../bushidos';

    for (const folder of folders) {
        const baseFolderFiles = await new Promise<string[]>((res, rej) => fs.readdir(baseFolder, (err, files) => {
            if (err) rej(err);
            res(files);
        }))

        console.log("Current files:", baseFolderFiles.length)

        const assetsPath = `../nfts/${folder}/assets`;
        const metadataPath = `../nfts/${folder}/metadata`;

        const assetsFiles = await new Promise<string[]>((res, rej) => fs.readdir(assetsPath, (err, files) => {
          if (err) rej(err);
          res(files);
        }))
        const metadataFiles = await new Promise<string[]>((res, rej) => fs.readdir(metadataPath, (err, files) => {
            if (err) rej(err);
            res(files);
        }))

        if (assetsFiles.length !== metadataFiles.length - 1)
            throw Error(`Files length are different! ${folder} assetsFiles :${assetsFiles.length} metadataFiles :${metadataFiles.length}`)

        console.log(folder, assetsFiles.length)

        for (let i = 0; i < assetsFiles.length; i++) {
            const filesDir = `${baseFolder}/${i + baseFolderFiles.length}`

            if (!fs.existsSync(filesDir)) {
                fs.mkdirSync(filesDir);
            }

            const imgPath = assetsFiles[i];
            const img = fs.readFileSync(`${assetsPath}/${imgPath}`);
            await new Promise<void>(res => fs.writeFile(`${filesDir}/image.png`, img, 'binary', function(err){
                if (err) throw err
                res();
            }))

            const jsonPath = metadataFiles[i];
            const json = JSON.parse(fs.readFileSync(`${metadataPath}/${jsonPath}`, 'utf8'));
            json.name = `BUSHIDOS #${i + baseFolderFiles.length + 1}`
            await new Promise<void>(res => fs.writeFile(`${filesDir}/meta.json`, JSON.stringify(json, null, 4), (e) => {
                if (e) console.error(e)
                res();
            }))
        }
    }
}

main()
