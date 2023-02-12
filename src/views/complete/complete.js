import { navTemplate, getCategoriseList, logoutEvent, loginClick } from '/common/nav.js';
const $ = (selector) => document.querySelector(selector);
/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	header.innerHTML = navTemplate(), getCategoriseList();
	logoutEvent();
	loginClick();
}
addNav();

const orderBtn = $('.showOrder');
const shopBtn = $('.keepShopping');

orderBtn.addEventListener('click', () => {
	location.href = '/account/orders';
});
shopBtn.addEventListener('click', () => {
	location.href = '/goods';
});
