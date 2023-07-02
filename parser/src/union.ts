import * as fs from "fs";

async function main() {

    const baseFolder = 'bushidos';

    fs.writeFile(`../${baseFolder}/full-meta.json`, "", (e) => {
        if (e) console.error(e)
    })

    const baseFolderFiles = await new Promise<string[]>((res, rej) => fs.readdir(`../${baseFolder}`, (err, files) => {
        if (err) rej(err);
        res(files);
    }))

    const metadata = [...baseFolderFiles].sort((a, b) => (
        +a - +b
    )).filter(it => !Number.isNaN(+it)).map(folder => (
        JSON.parse(fs.readFileSync(`../${baseFolder}/${folder}/meta.json`, 'utf8'))
    ))

    fs.writeFile(`../${baseFolder}/full-meta.json`, JSON.stringify(metadata, null, 4), (e) => {
        if (e) console.error(e)
    })
}

main()
