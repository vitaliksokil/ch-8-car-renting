import getConfig from './config.js';
import * as nearAPI from 'near-api-js';

window.nearConfig = getConfig(process.env.VUE_APP_NEAR_ENV || 'testnet');
window.roketoWrapContractName = 'wrap.testnet'
window.roketoContractName = 'streaming-r-v2.dcversus.testnet'
async function init() {

    // create a keyStore for signing transactions using the user's key
// which is located in the browser local storage after user logs in
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

// Initializing connection to the NEAR testnet
    const near = await nearAPI.connect({keyStore, ...window.nearConfig});

// Initialize wallet connection
    window.walletConnection = new nearAPI.WalletConnection(near);

    await updateNearAcc();

}

async function updateNearAcc() {
    window.nearAccount = {
        'isSignedIn': await isSignedIn(),
        'accountId': window.walletConnection.getAccountId()
    }
}

async function signIn() {
    window.walletConnection.requestSignIn(
        window.nearConfig.contractName,
        // '', // title. Optional, by the way
        // '', // successUrl. Optional, by the way
        // '', // failureUrl. Optional, by the way
    );
}

async function signOut() {
    await window.walletConnection.signOut();
    await updateNearAcc();
}

async function isSignedIn() {
    return window.walletConnection.isSignedIn();
}



export {
    init,
    signIn,
    signOut,
    isSignedIn,
}