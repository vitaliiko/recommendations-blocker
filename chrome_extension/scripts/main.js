'use strict';

const ACTIVE_TAB_QUERY = {'active': true, 'lastFocusedWindow': true, 'currentWindow': true}
let REMOVED_ITEMS_COUNT = 0;

const run = (tabInfo) => {
    getCurrentUrl(tabInfo).then(currentTabInfo => {
        if (currentTabInfo.url && currentTabInfo.url.includes('facebook')) {
            console.log('Facebook page detected. Try to remove suggestions')
            chrome.tabs.executeScript({
                file: 'scripts/recommendations_remover.js'
            });
        }
    })
}

const getCurrentUrl = tabInfo => {
    return new Promise((resolve, reject) => {
        try {
            let pageUrl;
            chrome.tabs.query(ACTIVE_TAB_QUERY, tabs => {
                if (tabs.length == 0) {
                    resolve('');
                }
                resolve({ url: tabs[0].url, id: tabs[0].id });
            });
        } catch (error) {
            reject(error);
        }
    });
}

chrome.tabs.onUpdated.addListener(run);
