// Storage Controller
const StorageController = (function(){
    //private




    //public
    return{
        storeProduct: (product) => {
            let products;
            if(localStorage.getItem('products')===null){
                products = [];
                products.push(product);
            }else{
                products = JSON.parse(localStorage.getItem('products'));
                products.push(product);
            }
            localStorage.setItem('products',JSON.stringify(products));
        },
        getProducts: ()=>{
            if(localStorage.getItem('products')===null){
                products = [];

            }else{
                products = JSON.parse(localStorage.getItem('products'));
            }
            return products;
        },
        updateProduct: (product) =>{
            let products = JSON.parse(localStorage.getItem('products'))

            products.forEach((prd,index)=>{
                if(product.id== prd.id){
                    products.splice(index,1,product);
                }
            });
            localStorage.setItem('products',JSON.stringify(products));
        },
        deleteProduct: (id)=>{
            let products = JSON.parse(localStorage.getItem('products'))

            products.forEach((prd,index)=>{
                if(id== prd.id){
                    products.splice(index,1);
                }
            });
            localStorage.setItem('products',JSON.stringify(products));
        }
    }
    
})()
