import { TonService } from "./ton.service";
import axios from "axios";

async function main() {
    const currentNfts = await TonService.getNftsForTargetCollections("EQBR2-NQuf_FgEsnDFUN7_FE11FjusSvOWw2-rw8YL-a0Jv5");

    const nfts = (await axios.get("https://bushidos-nft.github.io/nfts/bushidos/full-meta.json")).data as Array<any>;

    console.log("currentNfts: ", currentNfts.length)
    console.log("nfts: ", nfts.length)

    const failed = nfts.map((it, i) => ({
        nft: it,
        index: i
    })).filter((it) => (
        !currentNfts.some(nft => nft.metadata.name === it.nft.name)
    )).map((it) => ({
        index: it.index,
        ...it.nft,
    }));

    console.log(failed)
}

main()
