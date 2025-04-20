document.addEventListener("DOMContentLoaded", function () {
	const loadInclude = async (id, url) => {
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const html = await res.text();
			document.getElementById(id).innerHTML = html;

			if (id === "header-placeholder") {
				// ✅ Only initialize header nav logic after header is loaded
				initMobileNavListeners();
			}
		} catch (err) {
			console.error(`Failed to load ${url}:`, err);
		}
	};

	// Load header dynamically
	loadInclude("header-placeholder", "/partials/header.html");
});

// ✅ Move nav script into a function so it can be called after header is loaded
function initMobileNavListeners() {
	const html = document.querySelector("html");
	const navHamburger = document.querySelector("[data-hamburger-menu]");
	const navMobile = document.querySelector("[data-mobile-nav]");
	const navBack = document.querySelector("[data-mobile-nav-back]");
	const navClose = document.querySelector("[data-mobile-nav-close]");
	const navContents = document.querySelectorAll("[data-mobile-nav-content]");
	const navItems = document.querySelectorAll("[data-mobile-nav-item]");

	if (!navHamburger || !navMobile) return;

	navHamburger.addEventListener("click", () => {
		html.classList.add("nav-mobile-open", "js-drawer-open");
		navMobile.style.visibility = "";
		navMobile.classList.add("is-visible");
	});

	navClose.addEventListener("click", () => {
		html.classList.remove("nav-mobile-open", "js-drawer-open");
		navMobile.classList.remove("is-visible");
		setTimeout(() => {
			navMobile.style.visibility = "hidden";
		}, 300);
	});

	navBack.addEventListener("click", () => {
		const prev = document.querySelector(".nav-mobile__content.is-active")
			?.getAttribute("data-mobile-nav-parent");
		if (!prev) return navClose.click();
		navContents.forEach((el) => el.classList.remove("is-active"));
		document.querySelector(`[data-mobile-nav-content="${prev}"]`)?.classList.add("is-active");
	});

	navItems.forEach((btn) => {
		btn.addEventListener("click", function () {
			const target = this.getAttribute("data-mobile-nav-item");
			navContents.forEach((el) => el.classList.remove("is-active"));
			document.querySelector(`[data-mobile-nav-content="${target}"]`)?.classList.add("is-active");
		});
	});
}
