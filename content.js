// Function to remove LinkedIn junk posts
function removeLinkedInJunk() {
	const posts = document.querySelectorAll('[data-view-name="feed-full-update"]');

	posts.forEach((post) => {
		const header = post.querySelector(".update-components-header");

		if (header) {
			post.remove();
			console.log("Removed a post containing 'update-components-header'.");
		}
	});
}

// Set up a MutationObserver, but only start it when enabled
let observer;

// Function to start observing for dynamically loaded posts
function startObserving() {
	if (!observer) {
		observer = new MutationObserver(removeLinkedInJunk);
		observer.observe(document.body, { childList: true, subtree: true });
		console.log("Observer started.");
	}
}

// Function to stop observing
function stopObserving() {
	if (observer) {
		observer.disconnect();
		observer = null;
		console.log("Observer stopped.");
	}
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request) => {
	if (request.action === "toggleCleanup") {
		if (request.enabled) {
			// Enable cleanup
			removeLinkedInJunk();
			startObserving();
		} else {
			// Disable cleanup
			stopObserving();
		}
	}
});
