// App Controller

const App = (function (ProductCtrl, UICtrl, StorageCtrl) {
    //private
    const UISelectors = UICtrl.getSelectors();

    //Load Event Listeners
    const loadEventListeners = function () {

        // add product event listener
        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);

        // edit product click event listener
        document.querySelector(UISelectors.productList).addEventListener('click', productEditClick);

        // Edit product submit event listener
        document.querySelector(UISelectors.updateButton).addEventListener('click', productEditSubmit);

        // cancel product click event listener
        document.querySelector(UISelectors.cancelButton).addEventListener('click', productCancelClick)

        // delete product event listener
        document.querySelector(UISelectors.deleteButton).addEventListener('click', productDeleteSubmit);

    }

    const productAddSubmit = function (e) {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // Add product
            const newProduct = ProductCtrl.addProduct(productName, productPrice);

            //Add item to list
            UICtrl.addProductToList(newProduct);

            //Add product to LS
            StorageCtrl.storeProduct(newProduct);

            //get total price
            const total = ProductCtrl.getTotal();

            //Show total price
            UICtrl.showTotal(total);

            //

            // clear inputs
            UICtrl.clearInputs();
        }

        e.preventDefault();
    }

    const productEditClick = function (e) {

        if (e.target.classList.contains('edit-product')) {
            const id = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent

            // Get selected product
            const selectedProduct = ProductCtrl.getProductById(id);

            // set selected product to current product
            ProductCtrl.setCurrentProduct(selectedProduct);

            UICtrl.clearWarnings()

            // add product to UI
            UICtrl.addProductToForm();

            //edit state
            UIController.editState(e.target.parentNode.parentNode);

        }


        e.preventDefault();
    }

    const productEditSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {

            //update product
            const updatedProduct = ProductCtrl.updateProduct(productName, productPrice);

            //update UI
            let item = UICtrl.updateProduct(updatedProduct);

            //get total price
            const total = ProductCtrl.getTotal();

            //Show total price
            UICtrl.showTotal(total);

            //update Storage
            StorageCtrl.updateProduct(updatedProduct);

            UICtrl.addingState();
        }


        e.preventDefault();
    }

    const productCancelClick = function(e){

        UICtrl.addingState();
        UICtrl.clearWarnings();

        e.preventDefault();
    }
    
    const productDeleteSubmit = e => {

        // get selected product
        const selectedProduct = ProductCtrl.getCurrentProduct();

        //delete product
        ProductCtrl.deleteProduct(selectedProduct);

        //delete UI
        UICtrl.deleteProduct();

        //get total price
        const total = ProductCtrl.getTotal();

        //Show total price
        UICtrl.showTotal(total);

        // delete from Storage
        StorageCtrl.deleteProduct(selectedProduct.id);
        
        UICtrl.addingState();

        if(total == 0){
            UICtrl.hideCard();
        }

        e.preventDefault();
    }


    //public
    return {
        init: function () {
            console.log("starting app")
            UIController.addingState();
            const products = ProductCtrl.getProducts();


            if (products.length == 0) {
                UICtrl.hideCard();
            } else {
                UICtrl.createProductList(products);
            }
            
            //get total price
            const total = ProductCtrl.getTotal();

            //Show total price
            UICtrl.showTotal(total);

            //loading event listeners
            loadEventListeners();
        }
    }

})(ProductController, UIController, StorageController)

App.init();
