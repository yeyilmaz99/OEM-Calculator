// Storage Controller
const StorageController = (function () {

    // Private


    // Public
    return {
        storeProduct: function(product){

            let products;

            if(localStorage.getItem('products')=== null){
                products = [];
                products.push(product);
            }else{
                products = JSON.parse(localStorage.getItem('products'));
                products.push(product);
            }
            localStorage.setItem('products',JSON.stringify(products));
        },
        getProducts: function(){
            let products;
            if(localStorage.getItem('products')===null){
                products = [];
            }else{
                products = JSON.parse(localStorage.getItem('products'));
            }  
            return products;
        },
        updateProductLS: function(product){
            let products = JSON.parse(localStorage.getItem('products'));

            products.forEach(function(prd,index){
                if(product.id == prd.id){
                    products.splice(index,1,product)
                }
            });
            localStorage.setItem('products',JSON.stringify(products));
        },
        deleteProductLS: function(id){
            let products = JSON.parse(localStorage.getItem('products'));

            products.forEach(function(prd,index){
                if(id == prd.id){
                    products.splice(index,1)
                }
            });
            localStorage.setItem('products',JSON.stringify(products));
        }
    }



})()


// Product Controller
const ProductController = (function () {

    // Private
    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products: StorageController.getProducts(),
        selectedProduct: null,
        totalPrice: 0
    }


    // Public
    return {
        getProducts: function () {
            return data.products;
        },
        getData: function () {
            return data;
        },
        getProductById: function (id) {
            let product = null

            data.products.forEach(function (prd) {
                if (prd.id == id) {
                    product = prd;
                }
            })


            return product;
        },
        setCurrentProduct: function (product) {
            data.selectedProduct = product;
        },
        getCurrentProduct: function () {
            return data.selectedProduct;
        },
        addProduct: function (name, price) {
            let id;

            if (data.products.length > 0) {
                id = data.products[data.products.length - 1].id + 1
            } else {
                id = 0;
            }
            const newProduct = new Product(id, name, parseFloat(price));
            data.products.push(newProduct);
            return newProduct;

        },
        updateProduct: function (name, price) {
            let product = null;

            data.products.forEach(function (prd) {
                if (prd.id == data.selectedProduct.id) {
                    prd.name = name;
                    prd.price = parseFloat(price);
                    product = prd;
                }
            })

            return product

        },
        deleteProduct: function (product) {
            data.products.forEach(function (prd, index) {
                if (prd.id == product.id) {
                    data.products.splice(index, 1);
                }
            })
        },
        getTotal: function () {
            let total = 0;

            data.products.forEach(function (item) {
                total += item.price;
            });
            data.totalPrice = total;
            return data.totalPrice;
        }

    }



})()


// UI Controller
const UIController = (function () {
    // Private
    const Selectors = {
        productList: "#item-list",
        productListItems: '#item-list tr',
        addButton: ".addBtn",
        updateButton: '.updateBtn',
        deleteButton: '.deleteBtn',
        cancelButton: '.cancelBtn',
        productName: "#productName",
        productPrice: "#productPrice",
        productCard: "#productCard",
        totalTL: '#total-tl',
        totalDollar: '#total-dollar'
    }

    // Public
    return {
        createProductList: function (products) {
            let html = '';

            products.forEach(prd => {
                html += ` 
                    <tr style="text-align: center;">
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}</td>
                        <td align="right">
                                <i class="far fa-edit edit-product"></i>
                        </td>
                    </tr>
                `
            });


            document.querySelector(Selectors.productList).innerHTML = html;

        },
        getSelectors: function () {
            return Selectors;
        },
        addProduct: function (prd) {
            document.querySelector(Selectors.productCard).style.display = 'block';
            var item = `
                    <tr style="text-align: center;">
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}</td>
                        <td align="right">
                        <td align="right">
                                <i class="far fa-edit edit-product"></i>
                        </td>
                    </tr>
    
            `;
            document.querySelector(Selectors.productList).innerHTML += item;
        },
        updateProduct: function (prd) {

            let updatedItem = null;
            let items = document.querySelectorAll(Selectors.productListItems);

            items.forEach(function (item) {
                if (item.classList.contains('bg-warning')) {
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price + ' $';
                    updatedItem = item;
                }
            })
            return updatedItem;
        },
        deleteProduct: function () {

            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function (item) {
                if (item.classList.contains('bg-warning')) {
                    item.remove();
                }
            })
        },
        clearInputs: function (item) {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        clearWarnings: function () {
            let items = document.querySelectorAll(Selectors.productListItems);

            items.forEach(function (item) {
                if (item.classList.contains('bg-warning')) {
                    item.classList.remove('bg-warning');
                }
            })
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none';
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalDollar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * 8, 44

        },
        addProductToForm: function () {
            const selectedProduct = ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;
        },
        addingState: function (item) {
            UIController.clearWarnings();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = 'inline';
            document.querySelector(Selectors.updateButton).style.display = 'none';
            document.querySelector(Selectors.deleteButton).style.display = 'none';
            document.querySelector(Selectors.cancelButton).style.display = 'none';
        },
        editState: function (tr) {

            tr.classList.add('bg-warning');
            document.querySelector(Selectors.addButton).style.display = 'none';
            document.querySelector(Selectors.updateButton).style.display = 'inline';
            document.querySelector(Selectors.deleteButton).style.display = 'inline';
            document.querySelector(Selectors.cancelButton).style.display = 'inline';
        }
    }

})()


// App Controller
const App = (function (ProductCtrl, UICtrl, StorageCtrl) {

    const UISelectors = UICtrl.getSelectors();

    //Load Event Listeners
    const loadEventListeners = function () {

        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);

        // edit Product click
        document.querySelector(UISelectors.productList).addEventListener('click', productEditClick);

        // edit Product Submit 
        document.querySelector(UISelectors.updateButton).addEventListener('click', editProductSubmit);

        // cancel button click
        document.querySelector(UISelectors.cancelButton).addEventListener('click', cancelUpdate);

        // delete button click
        document.querySelector(UISelectors.deleteButton).addEventListener('click', deleteProductSubmit);
    }
    const productAddSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // Add product
            const newProduct = ProductCtrl.addProduct(productName, productPrice);

            // add item to list
            UICtrl.addProduct(newProduct);

            // add product to Local storage
            StorageCtrl.storeProduct(newProduct);

            // get total
            const total = ProductController.getTotal();

            //show Total
            UICtrl.showTotal(total);

            // clear inputs

            UICtrl.clearInputs();
        }

        e.preventDefault();
    }
    const productEditClick = function (e) {
        if (e.target.classList.contains('edit-product')) {
            const id = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent

            // get selected product
            const product = ProductCtrl.getProductById(id);

            // set current product
            ProductCtrl.setCurrentProduct(product);
            UICtrl.clearWarnings();
            // add product to UI
            UICtrl.addProductToForm();

            UICtrl.editState(e.target.parentNode.parentNode);
        }



        e.preventDefault();
    }
    const editProductSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {

            //update product

            let updatedProduct = ProductCtrl.updateProduct(productName, productPrice);

            // update UI
            let item = UICtrl.updateProduct(updatedProduct);

            // update storage
            StorageCtrl.updateProductLS(updatedProduct);

            // get total
            const total = ProductCtrl.getTotal();

            //show Total
            UICtrl.showTotal(total);

            UICtrl.addingState();

        }


        e.preventDefault();
    }
    const cancelUpdate = function (e) {
        UICtrl.addingState();
        UICtrl.clearWarnings();

        e.preventDefault();
    }
    const deleteProductSubmit = function (e) {
        // get selected product

        const selectedProduct = ProductCtrl.getCurrentProduct();

        // delete product
        ProductCtrl.deleteProduct(selectedProduct);

        //delete UI
        UICtrl.deleteProduct();

        // get total
        const total = ProductCtrl.getTotal();

        //show Total
        UICtrl.showTotal(total);
        
        // delete from LS
        StorageCtrl.deleteProductLS(selectedProduct.id);

        UICtrl.addingState();

        if(total ==0){
            UICtrl.hideCard();
        }

        e.preventDefault();
    }

    return {
        init: function () {
            console.log('starting app..');

            UICtrl.addingState();
            const products = ProductCtrl.getProducts();

            if (products.length == 0) {
                UICtrl.hideCard();
            } else {
                UICtrl.createProductList(products);

            }
            //Load Event Listeners
            loadEventListeners();

        }
    }


})(ProductController, UIController, StorageController)


App.init();