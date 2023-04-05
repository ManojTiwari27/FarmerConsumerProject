const addToCartButtons = document.querySelectorAll(".product button");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total p");
let cartItems = [];

addToCartButtons.forEach(button => {
  button.addEventListener("click", addToCartClicked);
});

function addToCartClicked(event) {
  const button = event.target;
  const product = button.closest(".product");
  const productTitle = product.querySelector("h3").textContent;
  const productPrice = parseFloat(product.querySelector("p").textContent.replace("$", ""));
  const productImageSrc = product.querySelector("img").src;

  addItemToCart(productTitle, productPrice, productImageSrc);
}

function addItemToCart(productTitle, productPrice, productImageSrc) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].title === productTitle) {
      cartItems[i].quantity++;
      updateCartTotal();
      return;
    }
  }

  const cartItem = {
    title: productTitle,
    price: productPrice,
    imageSrc: productImageSrc,
    quantity: 1
  };
  cartItems.push(cartItem);
  renderCart();
  updateCartTotal();
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  cartItems.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemImage = document.createElement("img");
    itemImage.src = item.imageSrc;
    itemImage.alt = item.title;
    cartItem.appendChild(itemImage);

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = item.title;
    itemDetails.appendChild(itemTitle);

    const itemPrice = document.createElement("p");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = `$${item.price}`;
    itemDetails.appendChild(itemPrice);

    const itemQuantity = document.createElement("input");
    itemQuantity.type = "number";
    itemQuantity.value = item.quantity;
    itemQuantity.min = 1;
    itemQuantity.addEventListener("change", quantityChanged);
    itemDetails.appendChild(itemQuantity);

    const itemRemove = document.createElement("button");
    itemRemove.classList.add("item-remove");
    itemRemove.textContent = "Remove";
    itemRemove.addEventListener("click", removeCartItem);
    itemDetails.appendChild(itemRemove);

    cartItem.appendChild(itemDetails);
    cartItemsContainer.appendChild(cartItem);
  });
}

function updateCartTotal() {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function quantityChanged(event) {
  const input = event.target;
  const item = input.closest(".cart-item");
  const title = item.querySelector("h3").textContent;
  const quantity = parseInt(input.value);
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].title === title) {
      cartItems[i].quantity = quantity;
      updateCartTotal();
      return;
    }
  }
}

function removeCartItem(event) {
  const button = event.target;
  const item = button.closest(".cart-item");
  const title = item.querySelector("h3").textContent;
  cartItems = cartItems.filter(item => item.title !== title);
  item.remove();
  updateCartTotal();
}
