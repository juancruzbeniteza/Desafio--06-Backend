import repository from "../repositories/orders.rep.js";

class OrderService{
    constructor(){
        this.repository=repository
    }

    create=async (data)=>{
        try {
         const response= await this.repository.create(data);
         return response
        } catch (error) {
         throw error
        }
     }
 
     read=async ({filter,sortAndPaginate})=>{
         try {
             const response= await this.repository.read({filter,sortAndPaginate});
             return response
         } catch (error) {
             throw error
         }
     }
 
     readOne=async (id)=>{
         try {
             const response= await this.repository.readOne(id);
             return response
         } catch (error) {
             throw error
         }
     }

     report=async (id)=>{
         try {
             const response= await this.repository.report(id);
             return response
         } catch (error) {
             throw error
         }
     }
 
     update=async (id,quantity,state)=>{
         try {
             const response= await this.repository.update(id,quantity,state);
             return response
         } catch (error) {
             throw error
         }
     }
 
     destroy=async (id)=>{
         try {
             const response= await this.repository.destroy(id);
             return response
         } catch (error) {
             throw error
         }
     }
}

const orderService = new OrderService()
export default orderService