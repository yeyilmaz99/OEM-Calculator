// Storage Controller
const StorageController = (function () {

    // Private


    // Public
    return {

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
        products: [

        ],
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

        }
    }



})()


// UI Controller
const UIController = (function () {
    // Private
    const Selectors = {
        productList: "#item-list",
        addButton: ".addBtn",
        productName: "#productName",
        productPrice: "#productPrice",
        productCard: "#productCard"
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
                            <button  type="submit" class="btn btn-warning btn-sm d-grid gap-2">
                                <i class="far fa-edit"></i>
                            </button>
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
            document.querySelector(Selectors.productCard).style.display='block';
            var item = `
                    <tr style="text-align: center;">
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}</td>
                        <td align="right">
                            <button type="submit" class="btn btn-warning btn-sm d-grid gap-2">
                                <i class="far fa-edit"></i>
                            </button>
                        </td>
                    </tr>
    
            `;
            document.querySelector(Selectors.productList).innerHTML += item;
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none';
        }
    }

})()


// App Controller
const App = (function (ProductCtrl, UICtrl,) {

    const UISelectors = UICtrl.getSelectors();

    //Load Event Listeners
    const loadEventListeners = function () {

        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);


    }
    const productAddSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // Add product
            const newProduct = ProductCtrl.addProduct(productName, productPrice);

            // add item to list
            UICtrl.addProduct(newProduct);

            // clear inputs

            UICtrl.clearInputs();
        }

        e.preventDefault();
    }

    return {
        init: function () {
            console.log('starting app..')
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


})(ProductController, UIController)


App.init();