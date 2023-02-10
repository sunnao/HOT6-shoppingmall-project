import { navTemplate, getCategoriseList } from '/common/nav.js';
const $ = (selector) => document.querySelector(selector);
import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

/* nav Template */
function addNav() {
	const header = document.querySelector('.headerNav');
	(header.innerHTML = navTemplate()), getCategoriseList();
}
addNav();

/**fetch로 받아온 데이터를 반복문을 통해 list로 생성해주는 함수 */
const createGoods = (productDatas, productList) => {
	productDatas.forEach((product) => {
		const src = `/images/products/${product.productImgName}`;
		console.log(product);

		//이미지마다 상품 고유의 id를 부여하고 각각 상품 고유 페이지로 이동할 수 있도록 href 처리
		productList.insertAdjacentHTML(
			'beforeend',
			`
		  <div class="productItem hover:-translate-y-0.5 transition [&:nth-child(2)]:col-span-1  flex-col justify-between items-center w-full">
		    <div class="rounded-md w-full h-4/6 overflow-hidden">
					<a href="/goods-detail/${product._id}">
						<img class="w-full h-full object-cover" id="${product._id}" src="${
				src ? src : '/images/no-image.png'
			}" alt="상품이미지">		
					</a>
		    </div>
				<div class="">
					<div class="p-2">
						<p class="font-bold text-lg">${product.name}</p>
					</div>
					<div>
						${addCommas(product.price)}원
					</div>
				</div>
	    </div>
  `,
		);
	});
};

const getProductsByCategory = async () => {
	const category = decodeURI(window.location.pathname.split('/')[2]);
	let productDatas;
	if (category === '전체') {
		productDatas = await Api.get('/api/products');
	} else {
		productDatas = await Api.get(`/api/products/category/${category}`);
	}

	createGoods(productDatas, $('.product-list'));

	//각각의 상품 이미지마다 클릭이벤트를 달아서
	//클릭한 상품 이미지과 동일한 id를 가진 제품의 정보만 로컬스토리지에 저장
	document.querySelectorAll('.productItem').forEach((productItem) => {
		productItem.addEventListener('click', (e) => {
			let productData = productDatas.filter(
				(product) => product._id == e.target.id,
			);
			productData = JSON.stringify(productData);
			window.localStorage.setItem('detail', productData);
		});
	});
};

getProductsByCategory();
