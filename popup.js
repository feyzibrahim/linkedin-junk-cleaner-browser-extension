document.getElementById("cleanupToggle").addEventListener("change", (event) => {
	const isCleanupEnabled = event.target.checked;

	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, {
			action: "toggleCleanup",
			enabled: isCleanupEnabled,
		});
	});
});

// Function to handle cleanup activation/deactivation
function toggleCleanup(isEnabled) {
	if (isEnabled) {
		// Run the cleanup function
		if (typeof removeLinkedInJunk === "function") {
			removeLinkedInJunk();
		} else {
			console.log("Cleanup function not found.");
		}
	} else {
		console.log("Cleanup disabled.");
	}
}
