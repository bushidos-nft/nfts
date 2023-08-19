import * as fs from "fs";

const animated = [
    4
];

async function main() {

    const allMeta =


    for(const it of animated) {
        const file = JSON.parse(fs.readFileSync(`nfts/metadata/${it - 1}.json`, 'utf8'));

        if (!file.image.includes(".gif")) {
            file.image = file.image.replace(`${it - 1}.png`, `${it - 1}.gif`);
        }

        fs.writeFile(`nfts/metadata/${it - 1}.json`, JSON.stringify(file, null, 4),(e) => {
            if(e) throw Error(e.message)
        })
        await new Promise(res => setTimeout(res, 200))
    }
}

main();
