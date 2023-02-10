import * as Api from '/api.js';
/* 참조함수 */
const $ = (selector) => document.querySelector(selector);
const isLogin = () =>{
	return !!sessionStorage.token;
};

const notLoginNav =`
<nav class="w-full py-2">
<ul id="navbar" class="flex justify-between w-full" aria-label="breadcrumbs">
	<div class="flex w-1/4 justify-end min-w-fit">
		<li class="pl-10 flex justify-end items-center my-auto text-xl">
			<a href="/" class="inline-block h-10 w-10">
				<img class="w-full h-full" src="/images/dolpalee-logo.png" alt="홈버튼">
			</a>
		</li>
		<li class="w-1/2 flex justify-center min-w-fit ">
			<button
				class="text-black bg-white hover:bg-black hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center"
				type="button"
				data-dropdown-toggle="dropdown"
			>
				카테고리
				<svg
					class="w-4 h-4 ml-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</button>
			<!-- Dropdown menu -->
			<div
				class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4"
				id="dropdown"
			>
				<ul id="dropdown-ul" class="py-1" aria-labelledby="dropdown">
					<li>
						<a
							href="/category/전체"
							class="hover:bg-gray-100 text-gray-700 block px-4 py-2"
							>전체
						</a>
					</li>
				</ul>
			</div>
		</li>
	</div>

	<div class="flex justify-end items-stretch w-1/2 min-w-fit pr-20">
		<li class="w-1/6 min-w-fit pr-3 my-auto text-center text-base">
			<a href="/login">로그인</a>
		</li>
		<li class="w-1/6 min-w-fit pr-3 my-auto text-base">
			<a href="/register">회원가입</a>
		</li>
		<li class="w-1/6 min-w-fit my-auto text-base">
			<a href="/cart">
				<span>
					<i class="fas fa-cart-shopping" aria-hidden="true"></i>
				</span>
				<span> 카트</span>
			</a>
		</li>
	</div>
</ul>
</nav>
`
const loginNav = `
    <nav class="w-full py-2">
			<ul id="navbar" class="flex justify-between w-full" aria-label="breadcrumbs">
				<div class="flex w-1/4 justify-end min-w-fit">
					<li class="pl-10 flex justify-end items-center my-auto text-xl">
						<a href="/" class="inline-block h-10 w-10">
							<img class="w-full h-full" src="/images/dolpalee-logo.png" alt="홈버튼">
						</a>
					</li>
					<li class="w-1/2 flex justify-center min-w-fit ">
						<button
							class="text-black bg-white hover:bg-black hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center"
							type="button"
							data-dropdown-toggle="dropdown"
						>
							카테고리
							<svg
								class="w-4 h-4 ml-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</button>
						<!-- Dropdown menu -->
						<div
							class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4"
							id="dropdown"
						>
							<ul id="dropdown-ul" class="py-1" aria-labelledby="dropdown">
								<li>
									<a
										href="/category/전체"
										class="hover:bg-gray-100 text-gray-700 block px-4 py-2"
										>전체
									</a>
								</li>
							</ul>
						</div>
					</li>
				</div>

				<div class="flex justify-end items-stretch w-1/2 min-w-fit pr-20">
					<li class="w-1/6 min-w-fit pr-3 my-auto text-start text-base">
						<a href="/admin">페이지관리</a>
					</li>
					<li class="w-1/6 min-w-fit pr-3 my-auto text-center text-base">
						<a href="/account">계정관리</a>
					</li>
					<li class="w-1/6 min-w-fit pr-3 my-auto text-center text-base">
						<a href="/register">로그아웃</a>
					</li>
					<li class="w-1/6 min-w-fit my-auto text-base">
						<a href="/cart">
							<span>
								<i class="fas fa-cart-shopping" aria-hidden="true"></i>
							</span>
							<span> 카트</span>
						</a>
					</li>
				</div>
			</ul>
		</nav>
  `
/* nav template */
export function navTemplate() {
	return isLogin() ? loginNav : notLoginNav
}

// 등록되어있는 카테고리 리스트를 api로 가져와서, 드롭박스추가
export async function getCategoriseList() {
	const dropdown = $('#dropdown-ul');
  const categories = await Api.get("/api/categories");
  categories.forEach((category) => {
    const { _id, name } = category;

    dropdown.insertAdjacentHTML(
      "beforeend",
      `<li>
				<a
					href="/category/${name}"
					class="hover:bg-gray-100 text-gray-700 block px-4 py-2"
					>${name}</a
				>
			</li>`
    );
  });
}
