import {providers} from "near-api-js";

function getUrlParams(){
    let uri = window.location.search.substring(1);
    return new URLSearchParams(uri);
}

async function getTransactionState(txHash) {
    const provider = new providers.JsonRpcProvider(
        "https://archival-rpc.testnet.near.org"
    );
    return await provider.txStatus(txHash, window.nearAccount.accountId);
}

export {getUrlParams, getTransactionState}