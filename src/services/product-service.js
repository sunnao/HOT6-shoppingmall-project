import { productModel, categoryModel } from '../db';

class ProductService {
	constructor(productModel, categoryModel) {
		this.productModel = productModel;
		this.categoryModel = categoryModel;
	}

	// 제품 등록하기 - postman에서 테스트시, 먼저 카테고리 생성 후 제품등록
	async addProduct(productInfo) {
		const { name } = productInfo;
		const isExistProduct = await this.productModel.findByName(name);
		if (isExistProduct) {
			throw new Error(
				'이 제품명은 현재 사용중입니다. 다른 제품명을 입력해 주세요.',
			);
		}
		const createdNewProduct = await this.productModel.create(productInfo);
		const newProductCheck = await this.productModel.findById(
			createdNewProduct._id,
		);
		if (!newProductCheck) {
			const error = new Error('제품이 정상적으로 저장되지 않았습니다.');
			error.name = 'InternalServerError';
			throw error;
		}
		return createdNewProduct;
	}

	async getProducts() {
		return await this.productModel.findAll();
	}

	async getProductsByCategoryName(categoryName) {
		const category = await this.categoryModel.findByName(categoryName);
		return this.productModel.findAllByCategoryId(category._id);
	}

	async getProductById(_id) {
		const product = await this.productModel.findById(_id);
		if (!product) {
			throw new Error('해당 제품을 찾을 수 없습니다.');
		}
		return product;
	}

	async getProductByName(name) {
		const product = await this.productModel.findByName(name);
		if (!product) {
			throw new Error('해당 제품을 찾을 수 없습니다.');
		}
		return product;
	}

	async editProduct(_id, updateInfo) {
		const product = await this.productModel.findById(_id);
		if (!product) {
			const error = new Error('등록되어있지 않은 상품입니다.');
			error.name = 'NotFound';
			throw error;
		}

		return await this.productModel.update({ _id, updateInfo });
	}

	async deleteProduct(productId) {
		const isExistProduct = await this.productModel.findById(productId);
		if (!isExistProduct) {
			throw new Error('존재하지 않는 상품입니다.');
		}
		return await this.productModel.delete(productId);
	}

	async getProductBySize(size) {
		return await this.productModel.findBySize(size);
	}

	async getProductByPrice(price1, price2) {
		return await this.productModel.findByPrice(price1, price2);
	}
}

const productService = new ProductService(productModel, categoryModel);

export { productService };
