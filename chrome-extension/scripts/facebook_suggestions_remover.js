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
