document.addEventListener("DOMContentLoaded", function () {
	const loadInclude = async (id, url) => {
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const html = await res.text();
			document.getElementById(id).innerHTML = html;
		} catch (err) {
			console.error(`Failed to load ${url}:`, err);
		}
	};

	// Only load header dynamically
	loadInclude("header-placeholder", "/partials/header.html");
});
