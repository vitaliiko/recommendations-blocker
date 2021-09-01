'use strict';

document.addEventListener('scroll', (e) => {
    const FEED_ITEM_SELECTOR="div[data-pagelet*='FeedUnit_']";
    const SIDE_VIDEO_BLOCK_SELECTOR="div[style='right: 80px;']";

    const BLOCKED_TEXT = [
        "suggested",
        "invite friends",
        "people you may know",
        "coronavirus (covid-19) information"
    ];

    const containsBlockedText = (text) => {
        for (let block of BLOCKED_TEXT) {
            if (text.toLowerCase().includes(block)) {
                return true;
            }
        }
        return false;
    }

    const feedItems = document.body.querySelectorAll("div[data-pagelet*='FeedUnit_']");
    let removedItemsCount = 0;
    for (let node of feedItems) { 
        const nodeText = node.innerText.toLowerCase();
        if (containsBlockedText(nodeText)) {
            node.remove();
            removedItemsCount++;
            console.log(`[RecommendationsBlocker] ${removedItemsCount} items have been removed`);
        } 
    }

    const sideVideoBlocks = document.body.querySelectorAll(SIDE_VIDEO_BLOCK_SELECTOR);
    for (let node of sideVideoBlocks) {
        node.remove();
        removedItemsCount++;
        console.log(`[RecommendationsBlocker] ${removedItemsCount} items have been removed`);   
    }
});

const FACEBOOK_BASE_URL = 'https://www.facebook.com/';
const MOST_RECENT_URL_SEARCH = '?sk=h_chr';
if (!document.location.search.startsWith(MOST_RECENT_URL_SEARCH) && document.location.pathname === '/') {
    console.log("[RecommendationsBlocker] Reload the page to show the most recent feed");
    location.replace(FACEBOOK_BASE_URL + MOST_RECENT_URL_SEARCH)
}
