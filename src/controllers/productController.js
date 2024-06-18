import productService from "../services/productService.js";
import CustomError from "../utils/errors/CustomErrors.js";
import errors from "../utils/errors/errors.js";


class ProductControler{
    constructor(){
        this.service=productService
    }

    create= async (req,res, next)=>{
        
        try {
            const data = req.body;
            const response = await this.service.create(data);
            if(response){
                return res.success201(response);
            }
            CustomError.new(errors.notFound);
        } catch (error) {
            return next(error);
        }
    }

    read= async (req,res, next)=>{
        try {
            const sortAndPaginate = {
                sort: {price: 1},
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10
            }

            const filter = {}
            if(req.query.title){
                filter.title = new RegExp(req.query.title.trim(), "i");
            }

            if (req.query.price === "desc") {
                sortAndPaginate.sort.price = -1;
            }
            const products = await this.service.read({filter,sortAndPaginate})
            
            if(products.docs.length>0){
                return res.success200(products)
                
            }else{
                CustomError.new(errors.notFound);
            }
            
        } catch (error) {
            return next(error);
            
        }
    }

    readOne= async (req,res, next)=>{
        try {
            const {pid} = req.params
            const product =await this.service.readOne(pid)
            if(product){
                return res.success200(product)
            }else{
                CustomError.new(errors.notFound);
            }
            
        } catch (error) {
            return next(error);
        }
    }

    update= async (req,res, next)=>{
        try {
            const {pid} = req.params
            const data = req.body;
            const product = await this.service.update(pid,data)
            if(product){
                return res.success200(product)
            }else{
                CustomError.new(errors.notFound);
            }
            
        } catch (error) {
            return next(error);
        }
    }

    destroy= async (req,res, next)=>{
        try {
            const {pid} = req.params
            const product = await this.service.destroy(pid)
            if(product){
                return res.success200(product)
            }else{
                CustomError.new(errors.notFound);
            }
            
        } catch (error) {
            return next(error);
        }
    }

}

export default ProductControler
const  controller = new ProductControler()
const {create, read, readOne, update, destroy} = controller
export {create, read, readOne, update, destroy}