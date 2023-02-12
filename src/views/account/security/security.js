import { navTemplate, getCategoriseList, logoutEvent, loginClick  } from '/common/nav.js';

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate(), getCategoriseList();
	logoutEvent(); 
	loginClick();
}
addNav();
