'use strict';

const ACTIVE_TAB_QUERY = {'active': true, 'lastFocusedWindow': true, 'currentWindow': true}
let REMOVED_ITEMS_COUNT = 0;

const run = (tabInfo) => {
    setIcon('OTHER_PAGE');
    getCurrentUrl(tabInfo).then(currentTabInfo => {
        if (currentTabInfo && currentTabInfo.url && currentTabInfo.url.includes('facebook')) {
            setIcon('FB_PAGE');
            console.log('[RecommendationsBlocker] Facebook page detected. Try to remove suggestions')
            chrome.tabs.executeScript({
                file: 'scripts/facebook_suggestions_remover.js'
            });
        } else {
            setIcon('OTHER_PAGE');
        }
    })
}

const getCurrentUrl = tabInfo => {
    return new Promise((resolve, reject) => {
        try {
            let pageUrl;
            chrome.tabs.query(ACTIVE_TAB_QUERY, tabs => {
                if (tabs.length === 0 || tabs[0] === undefined) {
                    resolve('');
                    return;
                }
                resolve({ url: tabs[0].url, id: tabs[0].id });
            });
        } catch (error) {
            reject(error);
        }
    });
}

const setIcon = (status) => {
    switch (status) {
        case 'FB_PAGE':
            chrome.browserAction.setIcon({path: 'images/facebook_filled.png'});
            break;
        case 'OTHER_PAGE':
            chrome.browserAction.setIcon({path: 'images/facebook.png'});
            break;
    }

}

chrome.tabs.onActivated.addListener(run);
chrome.tabs.onUpdated.addListener(run);
