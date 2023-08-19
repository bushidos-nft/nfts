import * as fs from "fs";

const toEvolutionData: number[][] = [

];

const toDir = "../bushidos-test";
const fromDir = "../nfts/evolution";


async function main() {

    const allDefaultMeta: any[] = JSON.parse(fs.readFileSync(`${toDir}/full-meta.json`, 'utf8'));

    for(const it of toEvolutionData) {
        const  [currentMetaNameNumber, newMetaIndex] = it;
        const currentMetaIndex = allDefaultMeta.findIndex(it => it.name.includes(`#${currentMetaNameNumber}`))
        const currentMeta = allDefaultMeta[currentMetaIndex];

        await saveOldMeta(currentMetaIndex, currentMeta);
        await saveNewMeta(newMetaIndex, currentMetaIndex, currentMeta);
    }
}

async function saveOldMeta(currentMetaIndex: number, currentMeta: any) {
    await new Promise<void>(res => fs.writeFile(`${toDir}/${currentMetaIndex}/old-meta.json`, JSON.stringify(currentMeta, null, 4), (e) => {
        if (e) throw Error(e.message)
        res();
    }))

    const img = fs.readFileSync(`${toDir}/${currentMetaIndex}/image.png`);
    await new Promise<void>(res => fs.writeFile(`${toDir}/${currentMetaIndex}/old-image.png`, img, 'binary', (e) => {
        if (e) throw Error(e.message)
        res();
    }))
}

async function saveNewMeta(newMetaIndex: number, currentMetaIndex: number, currentMeta: any) {
    const newMeta = JSON.parse(fs.readFileSync(`${fromDir}/${newMetaIndex}/meta.json`, 'utf8'));
    const newImg = fs.readFileSync(`${fromDir}/${newMetaIndex}/image.png`);

    newMeta.name = currentMeta.name;
    newMeta.image = currentMeta.image;

    await new Promise<void>(res => fs.writeFile(`${toDir}/${currentMetaIndex}/meta.json`, JSON.stringify(newMeta, null, 4), (e) => {
        if (e) throw Error(e.message)
        res();
    }))
    await new Promise<void>(res => fs.writeFile(`${toDir}/${currentMetaIndex}/image.png`, newImg, 'binary', (e) => {
        if (e) throw Error(e.message)
        res();
    }))
}

main();
