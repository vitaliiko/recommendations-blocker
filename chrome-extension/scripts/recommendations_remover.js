'use strict';

document.addEventListener('scroll', (e) => {
    const feedItems = document.body.querySelectorAll("div[data-pagelet*='FeedUnit_']");
    let removedItemsCount = 0;
    for (let node of feedItems) { 
        const containsSuggestionText = node.innerText.includes("Suggested") 
            || node.innerText.includes("Invite Friends") 
            || node.innerText.includes("People you may know");
        if (containsSuggestionText) {
            node.remove();
            removedItemsCount++;
            console.log(`[RecommendationsRemover] ${removedItemsCount} items have been removed`);
        } 
    }
});
