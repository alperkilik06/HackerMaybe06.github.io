// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
	const hamburger = document.querySelector('.hamburger');
	const mobileNav = document.querySelector('.mobile-nav');
	const navLinks = document.querySelectorAll('.mobile-nav a');

	// Hamburger click
	if (hamburger) {
		hamburger.addEventListener('click', function() {
			hamburger.classList.toggle('active');
			mobileNav.classList.toggle('active');
		});
	}

	// Mobile nav links click
	navLinks.forEach(link => {
		link.addEventListener('click', function() {
			const href = this.getAttribute('href');
			
			// Close menu
			if (hamburger) hamburger.classList.remove('active');
			if (mobileNav) mobileNav.classList.remove('active');

			// Page transition
			showPageTransition(href);
		});
	});

	// Desktop nav links click
	const desktopNavLinks = document.querySelectorAll('.nav-link');
	desktopNavLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			const href = this.getAttribute('href');
			if (href && href !== '#') {
				e.preventDefault();
				showPageTransition(href);
			}
		});
	});

	// Page transition animation
	function showPageTransition(href) {
		const transition = document.createElement('div');
		transition.className = 'page-transition';
		document.body.appendChild(transition);

		setTimeout(() => {
			window.location.href = href;
		}, 250);
	}

	// Mobile nav link highlight
	function setActiveLink() {
		const currentPage = window.location.pathname.split('/').pop() || 'index.html';
		navLinks.forEach(link => {
			const href = link.getAttribute('href');
			if (href === currentPage || (currentPage === '' && href === 'index.html')) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}

	setActiveLink();

	// Close mobile menu on outside click
	document.addEventListener('click', function(event) {
		if (mobileNav && hamburger) {
			if (!mobileNav.contains(event.target) && !hamburger.contains(event.target)) {
				hamburger.classList.remove('active');
				mobileNav.classList.remove('active');
			}
		}
	});

	// Keyboard - ESC to close menu
	document.addEventListener('keydown', function(event) {
		if (event.key === 'Escape' && mobileNav) {
			hamburger.classList.remove('active');
			mobileNav.classList.remove('active');
		}
	});
});
