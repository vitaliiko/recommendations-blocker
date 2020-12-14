'use strict';

document.addEventListener('scroll', (e) => {
    const feedItems = document.body.querySelectorAll("div[data-pagelet*='FeedUnit_']");
    let removedItemsCount = 0;
    for (let node of feedItems) { 
        const nodeText = node.innerText.toLowerCase();
        const containsSuggestionText = nodeText.includes("suggested") 
            || nodeText.includes("invite friends") 
            || nodeText.includes("people you may know");
        if (containsSuggestionText) {
            node.remove();
            removedItemsCount++;
            console.log(`[RecommendationsBlocker] ${removedItemsCount} items have been removed`);
        } 
    }
});
