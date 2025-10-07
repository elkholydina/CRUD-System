var productName = document.getElementById( "floatingInput1" )
var productCategory = document.getElementById( "floatingInput2" )
var productPrice = document.getElementById( "floatingInput3" )
var productDesc = document.getElementById( "floatingInput4" )
var productImage = document.getElementById( "formFile" )

var products = JSON.parse(localStorage.getItem("products")) || []
displayProducts()

function mainFunction ()
{
    getProducts()
    displayProducts()
    clearInputs()
    saveToStorage()
}

function getProducts ()
{
    var pImage = productImage.files[ 0 ]?.name || "notfound.jpg"
    var product = {
        pName: productName.value,
        pCategory: productCategory.value,
        pPrice: productPrice.value,
        pDesc: productDesc.value,
        pImage 
    }
 
    products.push( product )
}

function displayProducts ()
{
    var totalProducts = ""

    for ( var i = 0; i < products.length; i++)
    {
        totalProducts += `<div class="col-3">
               <div class=" shadow-lg pb-3">
                <img src="./imgs/${products[i].pImage}" onerror = "this.src = './imgs/notfound.jpg' " alt="cute1" class="w-100">
                <h5 class="mt-3 mx-3">${products[i].pName}</h5>
                <p class="mt-2 mx-3">${products[i].pCategory}</p>
                <p class="mt-2 mx-3">${products[i].pPrice}$</p>
                <p class="mt-2 mx-3">${products[i].pDesc}</p>
                <div class="mt-2 mx-3">
                    <button class="text-bg-danger border-0 rounded-3" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash fs-5 p-2"></i></button>
                    <button class="text-bg-warning border-0 rounded-3" onclick="getProductToEdit(${i})"><i class="fa-solid fa-pen-to-square fs-5 p-2"></i></button>
                </div>
               </div>
            </div>`
        
        document.getElementById("products").innerHTML = totalProducts
    }
}

function clearInputs ()
{
    productName.value = ""
    productCategory.value = ""
    productPrice.value = ""
    productDesc.value = ""
}

function saveToStorage ()
{
    localStorage.setItem("products" , JSON.stringify(products))
}

function deleteProduct (index)
{
    products.splice( index, 1 )
    displayProducts()
    saveToStorage()
}

function getProductToEdit (index)
{
    productIndex = index

    productName.value = products[ index ].pName
    productCategory.value = products[ index ].pCategory
    productPrice.value = products[ index ].pPrice
    productDesc.value = products[ index ].pDesc;
    
    document.getElementById( "add" ).classList.add("d-none")
    document.getElementById( "save" ).classList.remove("d-none")
}

var productIndex   

function editProduct ()
{
    products[productIndex].pName =  productName.value
    products[productIndex].pCategory =  productCategory.value
    products[productIndex].pPrice =  productPrice.value
    products[ productIndex ].pDesc = productDesc.value

    document.getElementById( "add" ).classList.remove("d-none")
    document.getElementById( "save" ).classList.add("d-none")
    
    displayProducts()
    clearInputs()
    saveToStorage()
}

function search ( word )
{
    var searchProducts = ""

    for ( var i = 0; i < products.length; i++ )
    {
        if ( products[ i ].pName.trim().toLowerCase().includes( word.toLowerCase() ) )
        {
            searchProducts+= `<div class="col-3">
               <div class=" shadow-lg pb-3">
                <img src="./imgs/${products[i].pImage}" alt="cute1" class="w-100">
                <h5 class="mt-3 mx-3">${products[i].pName.toLowerCase().replace(word.toLowerCase() , `<span style="color:red">${word}</span>`)}</h5>
                <p class="mt-2 mx-3">${products[i].pCategory}</p>
                <p class="mt-2 mx-3">${products[i].pPrice}$</p>
                <p class="mt-2 mx-3">${products[i].pDesc}</p>
                <div class="mt-2 mx-3">
                    <button class="text-bg-danger border-0 rounded-3" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash fs-5 p-2"></i></button>
                    <button class="text-bg-warning border-0 rounded-3" onclick="getProductToEdit(${i})"><i class="fa-solid fa-pen-to-square fs-5 p-2"></i></button>
                </div>
               </div>
            </div>`
        
        document.getElementById("products").innerHTML = searchProducts
        }
    }
}