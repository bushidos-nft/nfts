import * as fs from "fs";

function getRandom(min: number, max: number, exclude: number): number {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    if (exclude == num) return getRandom(min, max, exclude);
    return num;
}

async function main() {
    await new Promise<void>(res => setTimeout(res, 10))

    const baseFolder = 'bushidos';

    const baseFolderFiles = await new Promise<string[]>((res, rej) => fs.readdir(baseFolder, (err, files) => {
        if (err) rej(err);
        res(files);
    }))

    for (let i = baseFolderFiles.length - 1; i >= 0; i--) {
        const aFile = baseFolderFiles[i];
        const j = getRandom(0, baseFolderFiles.length - 1, +aFile);
        const bFile = baseFolderFiles[j];
        console.log(`${aFile} -> ${bFile}`)

        fs.rename(`${baseFolder}/${aFile}`, `${baseFolder}/tmp`, function(err) {
            if (err) throw Error(err.message);
        })
        // await new Promise<void>(res => setTimeout(res, 100))

        fs.rename(`${baseFolder}/${bFile}`, `${baseFolder}/${aFile}`, function(err) {
            if (err) throw Error(err.message);
        })
        // await new Promise<void>(res => setTimeout(res, 100))

        fs.rename(`${baseFolder}/tmp`, `${baseFolder}/${bFile}`, function(err) {
            if (err) throw Error(err.message);
        })
        // await new Promise<void>(res => setTimeout(res, 100))
    }
}


async function check() {

    const baseFolder = 'bushidos';

    const baseFolderFiles = await new Promise<string[]>((res, rej) => fs.readdir(baseFolder, (err, files) => {
        if (err) rej(err);
        res(files);
    }))

    for (let i = 0; i < baseFolderFiles.length; i++) {
        if (
            !Number.isNaN(+baseFolderFiles[i])
            && +baseFolderFiles[i] !== baseFolderFiles.length - 1
            && !baseFolderFiles.some(it => (
                +it == +baseFolderFiles[i] + 1
            ))
        ) {
            console.log(+baseFolderFiles[i] + 1)
            fs.rename(`${baseFolder}/tmp`, `${baseFolder}/${+baseFolderFiles[i] + 1}`, function(err) {
                if (err) throw Error('ERROR: ' + err);
            })
        }
    }
}

check()
main()
