import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('product', ProductSchema);

export class ProductModel {
	async create(productInfo) {
		return await Product.create(productInfo);
	}

	async findAll() {
		return await Product.find({}).sort({ createdAt: -1 });
	}

	async findById(_id) {
		return await Product.findById(_id);
	}

	async findByName(name) {
		return await Product.findOne({ name });
	}

	async findAllByCategoryId(categoryId) {
		return await Product.find({ categoryId }).sort({ createdAt: -1 });
	}

	// 카테고리_id에 해당하는 제품1개 가져오기
	// 하나라도 등록된 상품이 있는지 null 값 확인용
	async findOneByCategoryId(categoryId) {
		return await Product.findOne({ categoryId });
	}

	async update({ _id, updateInfo }) {
		//updateInfo = {aaa:bb}
		const filter = { _id };
		const option = { returnOriginal: false };

		return await Product.findOneAndUpdate(filter, updateInfo, option);
	}

	async delete(_id) {
		return Product.deleteOne({ _id });
	}

	//  -----------필터 기능------------
	// 해당 제품크기로 가져오기
	async findBySize(size) {
		return await Product.find({ size });
	}

	// 해당 제품색상으로 가져오기
	async findByColor(color) {
		return await Product.find({ color });
	}

	// 해당 제품가격으로 가져오기
	async findByPrice(price1, price2) {
		return await Product.find({
			price: { $gte: price1, $lte: price2 },
		});
	}

	// 무료배송여부로 가져오기
	async findByFreeDelivery(boolean) {
		return await Product.find({ free_delivery: boolean });
	}
}

const productModel = new ProductModel();

export { productModel };
