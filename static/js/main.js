// console.log(func())
// console.log('123')

pizda = window.Telegram.WebApp
pizda.MainButton.text = 'View ur cart'
pizda.MainButton.show()
pizda.MainButton.color = '#8b8bd0'
// pizda.isExpanded = false
// callback = [{id:4,size:2}]
// pizda.MainButton.onClick = console.log('pizdec')

// window.Telegram.WebApp.MainButton.onClick(pizdec())

var main_button = window.Telegram.WebApp.MainButton
main_button.text = 'View ur cart'


function mainButtonClickedEvent() {
  main_button.text = 'Pay $10.00'
  createCart()

  main_button.onClick() = pesik2
}

main_button.onClick() = mainButtonClickedEvent

// console.log(func()[0][3])
//
// for (var i = 0; i < func().length; i++) {
//   console.log(func()[i])
// }

var products = products()
var cats = cats()
var size = size()
var stop_list = stop_list()
var productList = []

function getMainCont(){
  return document.getElementsByClassName('container')[0]
}

function clearAll(){
  clear = getMainCont()
  while(clear.firstChild){
      clear.removeChild(clear.firstChild);
  }
}


function createCategory(){
  clearBackBtn()

  clearNav()
  nav_menu = document.getElementById('nav-menu')
  nav_item = document.createElement('span')
  nav_item.innerText = 'Choose a category'
  nav_menu.appendChild(nav_item)
  clearAll()
  main = getMainCont()

  cat_cont = document.createElement('div')
  cat_cont.className = 'cat-cont'
  main.appendChild(cat_cont)

  for (var i = 0; i < cats.length; i++){
    for (var x = 0; x < products.length; x++){
      if (cats[i].id == products[x].category){
        cat_item = document.createElement('div')
        cat_item.className = 'cat-item'

        cat_name = document.createElement('p')
        cat_icon = document.createElement('img')

        cat_name.innerText = cats[i].name
        cat_icon.src = 'static/png/icons/' + cats[i].icon

        cat_item.appendChild(cat_icon)
        cat_item.appendChild(cat_name)

        cat_item.id = 'category-' + cats[i].id
        cat_item.onclick = function(){
          createProducts(this.id)
        }
        cat_cont.appendChild(cat_item)
        break
      }
    }
  }
}

function createProducts(cat_id){
  // pizda = products()
  // console.log(pizda)
  clearAll()
  clearBackBtn()
  main = getMainCont()
  product_cont = document.createElement('div')
  product_cont.className = 'product-cont'
  product_cont.id = cat_id
  main.appendChild(product_cont)

  // product_cont_title = document.createElement('div')
  // product_cont_title.className = 'product-cont-title'
  // product_cont.appendChild(product_cont_title)

  // nav_menu = document.createElement('div')
  // nav_menu.className = 'nav-menu'
  // product_cont_title.appendChild(nav_menu)
  clearNav()
  nav_menu = document.getElementById('nav-menu')

  category_nav = document.createElement('span')
  category_nav.onclick = function(){
    createCategory()
  }
  galka = document.createElement('span')
  products_nav = document.createElement('span')

  category_nav.innerText = 'Category'
  for (var z = 0; z < cats.length; z++){
    check_stmt = 'category-' + cats[z].id
    if (check_stmt == cat_id){
      products_nav.innerText = cats[z].name
    }
  }
  galka.innerText = '>'

  nav_menu.appendChild(category_nav)
  nav_menu.appendChild(galka)
  nav_menu.appendChild(products_nav)


  // title = document.createElement('p')
  //
  // product_cont_title.appendChild(title)
  h_back = document.getElementById('b-button')
  back_btn = document.createElement('button')
  back_btn.innerText = 'BACK'
  back_btn.onclick = function(){
    createCategory()
  }
  // clearBackBtn()
  h_back.appendChild(back_btn)

  for (var i = 0; i < products.length; i++){
    check_id = 'category-' + products[i].category
    if (cat_id == check_id){

      product_item = document.createElement('div')
      product_item.className = 'product-item'
      product_item.id = 'product-' + products[i].id

      product_item.onclick = function(){
        createProductItemInfo(this.id, products)
      }

      product_cont.appendChild(product_item)

      product_image = document.createElement('div')
      product_image.className = 'product-image'
      product_item.appendChild(product_image)

      product_image_src = document.createElement('img')
      product_image_src.src = products[i].image
      product_image.appendChild(product_image_src)


      product_info = document.createElement('div')
      product_info.className = 'product-info'
      product_item.appendChild(product_info)

      product_name = document.createElement('div')
      product_name.className = 'product-name'
      product_name.innerText = products[i].name
      product_info.appendChild(product_name)

      product_price = document.createElement('div')
      product_price.className = 'product-price'
      product_price.innerText = products[i].price
      product_info.appendChild(product_price)

      product_add_button = document.createElement('button')
      product_add_button.className = 'product-add-button'
      product_add_button.innerText = 'ADD'
      product_info.appendChild(product_add_button)

      // product_add_button_butt = document.createElement('button')
      // product_add_button_butt.innerText = 'ADD'
      //
      // product_add_button.appendChild(product_add_button_butt)



      // product_add = document.createElement('div')

    }
  }
}

function createProductItemInfo(product_id){
  clearBackBtn()
  // products()
  var main_id = 1
  for (var i = 0; i < products.length; i++){
    check_id = 'product-' + products[i].id
    if (product_id == check_id){
      main_id = i
    }
  }
  clearAll()
  main = getMainCont()

  product_item_info_cont = document.createElement('div')
  product_item_info_cont.className = 'product-item-info-cont'
  product_item_info_cont.id = product_id
  main.appendChild(product_item_info_cont)

  title = document.createElement('div')
  title.className = 'product-item-title'
  product_item_info_cont.appendChild(title)

  back_btn = document.createElement('button')
  back_btn.innerText = 'BACK'

  // nav_menu = document.createElement('div')
  // nav_menu.className = 'nav-menu'
  // title.appendChild(nav_menu)
  clearNav()
  nav_menu = document.getElementById('nav-menu')

  category_nav = document.createElement('span')
  category_nav.innerText = 'Category'


  category_nav.onclick = function(){
    createCategory()
  }

  products_nav = document.createElement('span')
  for (var z = 0; z < cats.length; z++){
    if (products[main_id].category == cats[z].id) {
      products_nav.innerText = cats[z].name
    }
  }
  products_nav.onclick = function(){
    check = document.getElementById('cont-main').firstChild.id
    for (var i = 0; i < products.length; i++){
      check_id = 'product-' + products[i].id
      if (check_id == check){
        createProducts('category-' + products[i].category)
      }
    }
  }

  item_nav = document.createElement('span')
  item_nav.innerText = products[main_id].name

  galka = document.createElement('span')
  galka.innerText = '>'

  galka2 = document.createElement('span')
  galka2.innerText = '>'

  nav_menu.appendChild(category_nav)
  nav_menu.appendChild(galka)
  nav_menu.appendChild(products_nav)
  nav_menu.appendChild(galka2)
  nav_menu.appendChild(item_nav)

  back_btn.onclick = function(){
    // console.log(document.getElementById('cont-main').firstChild.id)
    check = document.getElementById('cont-main').firstChild.id
    for (var i = 0; i < products.length; i++){
      check_id = 'product-' + products[i].id
      if (check_id == check){
        createProducts('category-' + products[i].category)
      }
    }
  }
  h_back = document.getElementById('b-button')
  h_back.appendChild(back_btn)

  product_name = document.createElement('div')
  product_price = document.createElement('div')
  product_descr = document.createElement('div')
  product_add = document.createElement('div')
  product_size = document.createElement('div')
  product_image = document.createElement('div')
  product_info = document.createElement('div')

  // product_image_src = document.createElement('img')
  // console.log(products[main_id].image)

  // product_image.className = 'product-item-img'
  // product_item_info_cont.appendChild(product_image)

  product_image.className = 'product-item-img'
  product_item_info_cont.appendChild(product_image)

  product_image_src = document.createElement('img')
  product_image_src.src = products[main_id].image
  product_image.appendChild(product_image_src)

  product_info.className = 'product-item-info'
  product_item_info_cont.appendChild(product_info)


  product_name.className = 'product-item-info-name'
  product_price.className = 'product-item-info-price'
  product_descr.className = 'product-item-info-descr'
  product_plus_button = document.createElement('div')
  product_plus_button.className = 'product-item-info-button'
  product_plus_info = document.createElement('button')

  cart_item_info_main = document.createElement('div')
  cart_tiem_info_child = document.createElement('div')
  cart_item_info_main.className = 'cart-item-info-main'
  cart_tiem_info_child.className = 'cart-item-info-child'
  product_plus_info.innerText = 'i'

  product_info.appendChild(cart_item_info_main)
  product_info.appendChild(cart_tiem_info_child)
  // product_descr.
  cart_item_info_main.appendChild(product_name)
  cart_item_info_main.appendChild(product_price)
  cart_tiem_info_child.appendChild(product_descr)
  cart_tiem_info_child.appendChild(product_plus_button)
  product_plus_button.appendChild(product_plus_info)

  product_name_text = document.createElement('p')
  product_price_text = document.createElement('p')
  product_descr_text = document.createElement('p')
  product_name_text.innerText = products[main_id].name
  product_price_text.innerText = products[main_id].price
  product_descr_text.innerText = products[main_id].description
  product_name.appendChild(product_name_text)
  product_price.appendChild(product_price_text)
  product_descr.appendChild(product_descr_text)

  sizes_map = document.createElement('div')
  sizes_map.className = 'sizes-map'
  product_add.appendChild(sizes_map)

  product_add_button = document.createElement('div')
  product_add_button_button = document.createElement('button')
  product_add_button.className = 'add-button'
  product_add_button_button.innerText = 'ADD'

  product_add_button.onclick = function(){
    if (this.classList.contains('add-active')){
      size_get = document.getElementsByClassName('size-selected')
      size_id = size_get[0].id
      addCountProduct(product_id, size_id)
    }
    else{
      console.log('error')
    }
  }
  // console.log(size)
  for (var z = 1; z < size.length; z++){
    for (var c=0; c < stop_list.length; c++){
      if ((size[z].id == stop_list[c].size) & (product_id == ('product-' + stop_list[c].product))){
        if (stop_list[c].quantity > 0){
          size_item = document.createElement('button')
          size_item.className = 'size-map-item'
          size_item.innerText = size[z].name
          size_item.id = 'size-' + size[z].id
          sizes_map.appendChild(size_item)
          size_item.classList.add("size-active")
          size_item.onclick = function(){
            size_id = this.id
            if (this.classList.contains("size-selected")){
              product_add_button.classList.remove("add-active")
              this.classList.remove("size-selected")
            }
            else{
              find = document.getElementsByClassName('size-selected')
              for(var i=0; i < find.length; i++){
                find[i].classList.remove("size-selected")
              }
              product_add_button.classList.add("add-active")
              this.classList.add("size-selected")
            }
          }
        }
        else{
          size_item = document.createElement('button')

          size_item.className = 'size-map-item'
          size_item.innerText = size[z].name
          sizes_map.appendChild(size_item)
          size_item.classList.add("size-inactive")
        }
      }
    }
  }
  // if (sizes.id == stoplist.size & product_id == ('product-' + stoplist.product))


  product_add.className = 'product-item-add'
  product_item_info_cont.appendChild(product_add)
  product_add.appendChild(product_add_button)
  product_add_button.appendChild(product_add_button_button)
}


function createCart(){
  clearNav()
  clearBackBtn()
  clearAll()
  main = getMainCont()
  cart_cont = document.createElement('div')
  cart_cont.className = 'cart-cont'
  main.appendChild(cart_cont)

  nav_menu = document.getElementById('nav-menu')
  nav_item = document.createElement('span')
  nav_item.innerText = 'Ur cart'
  nav_menu.appendChild(nav_item)

  h_back = document.getElementById('b-button')

  // cart_title = document.createElement('div')
  // cart_title.className = 'cart-title'
  // cart_cont.appendChild(cart_title)

  // title_text = document.createElement('p')
  // title_text.innerText = 'Корзина'
  // cart_title.appendChild(title_text)



  cart_edit_button = document.createElement('button')
  cart_edit_button.className = 'cart-edit-button'
  h_back.appendChild(cart_edit_button)

  btn = document.createElement('div')
  btn.innerText = 'EDIT'
  btn.onclick = function(){
    createCategory()
  }
  cart_edit_button.appendChild(btn)

  cart_items = document.createElement('div')
  cart_items.className = 'cart-items'
  cart_cont.appendChild(cart_items)

  for (var i = 0; i < productList.length; i++) {
    cart_item = document.createElement('div')
    cart_item.id = 'product-' + productList[i].product_id
    cart_item.className = 'cart-item'
    cart_items.appendChild(cart_item)

    cart_item_image = document.createElement('div')
    cart_item_info = document.createElement('div')
    cart_item_counter = document.createElement('div')

    cart_item_image.className = 'cart-item-img'
    cart_item.appendChild(cart_item_image)

    image_src = document.createElement('img')
    for (var z = 0; z < products.length; z++){
      if (productList[i].product_id == products[z].id){
        image_src.src = products[z].image
      }
    }

    cart_item_image.appendChild(image_src)

    info_counter_cont = document.createElement('div')
    info_counter_cont.className = 'info-counter-cont'

    cart_item_info.className = 'cart-item-info'
    cart_item.appendChild(info_counter_cont)
    info_counter_cont.appendChild(cart_item_info)

    info_name = document.createElement('p')
    info_name.innerText = productList[i].product_name
    info_name.className = 'info-name'


    info_size = document.createElement('p')
    info_size.innerText = productList[i].size_name
    info_size.className = 'info-size'


    info_price = document.createElement('p')
    info_price.className = 'info-price'
    for (var z = 0; z < products.length; z++){
      if (productList[i].product_id == products[z].id){
        info_price.innerText = products[z].price * productList[i].counter
      }
    }
     // * productList[i].counter
    cart_item_info.appendChild(info_price)
    cart_item_info.appendChild(info_name)
    cart_item_counter.appendChild(info_size)


    cart_item_counter.className = 'cart-item-counter'
    cart_item_counter.id = 'size-' + productList[i].size_id
    info_counter_cont.appendChild(cart_item_counter)

    cart_item_counter_btn_plus = document.createElement('button')
    cart_item_counter_btn_plus.className = 'cart-item-btn btn-plus'
    cart_item_counter_btn_plus.innerText = '+'

    cart_item_counter_btn_plus.onclick = function(){
      console.log(this.parentElement.id)
      console.log(this.parentElement.parentElement.parentElement.id)
      size_id = this.parentElement.id
      product_id = this.parentElement.parentElement.parentElement.id

      this.parentElement.querySelector('#counter').innerText = countPlus(product_id, size_id)
    }

    cart_item_counter_btn_minus = document.createElement('button')
    cart_item_counter_btn_minus.className = 'cart-item-btn btn-minus'
    cart_item_counter_btn_minus.innerText = '-'

    cart_item_counter_btn_minus.onclick = function(){

      size_id = this.parentElement.id
      product_id = this.parentElement.parentElement.parentElement.id
      contex = countMinus(product_id, size_id)
      this.parentElement.querySelector('#counter').innerText = contex
      if (contex <= 0){
        this.parentElement.parentElement.parentElement.remove()
      }
      if (productList.length == 0){
        main_cart = document.getElementById('main-cart')
        main_cart.classList.remove('shown')
        createCategory()
      }
    }

    cart_item_counter_counter = document.createElement('p')
    cart_item_counter_counter.className = 'item-counter'
    cart_item_counter_counter.id = 'counter'
    cart_item_counter_counter.innerText = productList[i].counter

    cart_item_counter.appendChild(cart_item_counter_btn_minus)
    cart_item_counter.appendChild(cart_item_counter_counter)

    cart_item_counter.appendChild(cart_item_counter_btn_plus)
  }

  cart_info = document.createElement('div')
  cart_info.className = 'cart-info'
  cart_cont.appendChild(cart_info)
}


function addCountProduct(product_id, size_id){
  stmt = checkCart(product_id, size_id)
  if ((stmt[0] == 'Ready')||(stmt[0] == 'Empty')) {
    productList.push({
      product_id : stmt[1],
      product_name : stmt[2],
      size_id : stmt[3],
      size_name : stmt[4],
      counter : 1
    })
    console.log(productList)
  }
  else if (stmt[0] == 'Error'){
    console.log('Error-001-added-error')
  }
}

function checkCart(product_id, size_id){
  for (var i = 0; i < products.length; i++){
    for (var x = 0; x < size.length; x++){
      check_product_id = 'product-' + products[i].id
      check_size_id = 'size-' + size[x].id
      if ((check_product_id == product_id)&(check_size_id == size_id)) {
        if (productList.length > 0){
          var trycheck = 1
          for (var z = 0 ; z < productList.length; z++){
            if ((products[i].id == productList[z].product_id)&(size[x].id == productList[z].size_id)){
              return ['Error']
            }
          }
          if (trycheck != 0){
            return ['Ready', products[i].id, products[i].name, size[x].id, size[x].name]
          }
        }
        else{
          return ['Empty', products[i].id, products[i].name, size[x].id, size[x].name]
        }
      }
    }
  }
}


function countPlus(product_id, size_id){
  if (checkCart(product_id, size_id)[0] == 'Error'){
    for (var i = 0; i < productList.length; i++) {
      check_product_id = 'product-' + productList[i].product_id
      check_size_id = 'size-' + productList[i].size_id
      if ((product_id == check_product_id)&(size_id == check_size_id)){
        productList[i].counter = productList[i].counter + 1
        console.log(productList)
        re = productList[i].counter
      }
    }
    return re
  }
  else{
    console.log('Error-002-Not-found-item')
    // console.log(checkCart(product_id, size_id)[0])
  }
}

function countMinus(product_id, size_id){
  if (checkCart(product_id, size_id)[0] == 'Error'){
    for (var i = 0; i < productList.length; i++) {
      check_product_id = 'product-' + productList[i].product_id
      check_size_id = 'size-' + productList[i].size_id
      if ((product_id == check_product_id)&(size_id == check_size_id)){
        productList[i].counter = productList[i].counter - 1
        console.log(productList)
        re = productList[i].counter
        if (productList[i].counter == 0){
          productList.splice(i, 1)
          console.log('Error-004-zero')
        }
      }
    }
  }
  else{
    console.log('Error-002-Not-found-item')
  }
  return re
}


// function checkCart(){
//   for (var i = 0 ; i < products.length; i++){
//     if
//   }
// }

// console.log(checkCart('product-5', 'size-2'))

// addCountProduct('product-1', 'size-2')
// // console.log('product-' + productList[1].product_id)
// addCountProduct('product-3', 'size-2')
// addCountProduct('product-4', 'size-3')
// addCountProduct('product-3', 'size-4')
// addCountProduct('product-2', 'size-5')
// //
// //
// //
// countMinus('product-2', 'size-5')
// countMinus('product-1', 'size-2')
// countMinus('product-1', 'size-2')
// countMinus('product-1', 'size-2')
// countMinus('product-4', 'size-2')
// countMinus('product-4', 'size-1')



// console.log(JSON.parse(JSON.stringify(productList)))
// countPlus('product-1', 'size-2')
// countPlus('product-1', 'size-2')
// countPlus('product-1', 'size-2')
// countPlus('product-1', 'size-2')
// countPlus('product-4', 'size-1')
// countPlus('product-4', 'size-1')
// countPlus('product-3', 'size-1')

createCategory()

// createCart()
// console.log(size)

// console.log(products[0].name)
// console.log(checkCart('product-5', 'size-2'))


// console.log(products)
// function consolelog(id){
//   console.log(id)
// }


// createProductItemInfo('product-1')
// createProducts(products(), 'category-1')
//
// clearAll()
// pizda = document.getElementsByClassName('shop')
// console.log(pizda[0].firstChild)
// function testimg(){
//   clearAll()
//   main = getMainCont()
//   img = document.createElement('img')
//   main.appendChild(img)
//   img.src = "/static/png/not_found.png"
// }
//
// testimg()
// while(productList.length = 0){
//   if (productList.length)
// }

console.log(products)

function pesik(){
  createCart()
}

function pesik2(){
  fetch("/", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(productList)
  })
}

// let data = [
    // {
//     element: "asfsafsfa",
//     piza : 'asda'
//   },
//   {
//     gavno: 12341,
//     pes: 213123,
//   }
// ];
//

function clearBackBtn(){
  back_btn = document.getElementById('b-button')
  while(back_btn.firstChild){
      back_btn.removeChild(back_btn.firstChild);
  }
}

function clearNav(){
  nav_menu = document.getElementById('nav-menu')
  while(nav_menu.firstChild){
      nav_menu.removeChild(nav_menu.firstChild);
  }
}

// console.log(products[1].descrition)


// clearBackBtn()
