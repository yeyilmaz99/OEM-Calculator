// UI Controller
const UIController = (function () {
    //private
    const Selectors = {
        productList: "#item-list",
        productListItems: "#item-list tr",
        addButton: ".addBtn",
        updateButton: ".updateBtn",
        deleteButton: ".deleteBtn",
        cancelButton: ".cancelBtn",
        productName: "#productName",
        productPrice: "#productPrice",
        productCard: "#productCard",
        totalTL: "#total-tl",
        totalDollar: "#total-dollar"

    };


    //public
    return {
        createProductList: function (products) {
            let html = '';

            products.forEach(prd => {
                html += `
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price} $</td>
                        <td class="text-right">
                            <i class ="far fa-edit edit-product"></i>
                        </td>
                    </tr>
                `
            });
            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: function () {
            return Selectors;
        },
        addProductToList: function (prd) {
            document.querySelector(Selectors.productCard).style.display = "block"
            let item = `
                <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price} $</td>
                    <td class="text-right">
                        <i class ="far fa-edit edit-product"></i>
                    </td>
                </tr>
            `
            document.querySelector(Selectors.productList).innerHTML += item;
        },
        updateProduct: function (prd) {

            let updatedItem

            let items = document.querySelectorAll(Selectors.productListItems);

            items.forEach(item => {
                if (item.classList.contains('bg-warning')) {
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price + '$';
                    updatedItem = item
                }
            })

            return updatedItem;

        },
        deleteProduct: ()=>{
            let items = document.querySelectorAll(Selectors.productListItems);

            items.forEach(item =>{
                if(item.classList.contains('bg-warning')){
                    item.remove();
                }
            })
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';

        },
        clearWarnings: function () {

            const items = document.querySelectorAll(Selectors.productListItems);

            items.forEach(item => {
                if (item.classList.contains('bg-warning')) {
                    item.classList.remove('bg-warning')
                }
            })

        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = "none";
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalDollar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * 8.67
        },
        addProductToForm: function () {
            const selectedProduct = ProductController.getCurrentProduct()
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;
        },
        addingState: function (item) {
            UIController.clearWarnings();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = "inline";
            document.querySelector(Selectors.updateButton).style.display = "none";
            document.querySelector(Selectors.deleteButton).style.display = "none";
            document.querySelector(Selectors.cancelButton).style.display = "none";
        },
        editState: function (tr) {
            tr.classList.add('bg-warning')
            document.querySelector(Selectors.addButton).style.display = "none";
            document.querySelector(Selectors.updateButton).style.display = "inline";
            document.querySelector(Selectors.deleteButton).style.display = "inline";
            document.querySelector(Selectors.cancelButton).style.display = "inline";
        }

    }



})()
