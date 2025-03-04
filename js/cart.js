document.addEventListener("DOMContentLoaded", function () {
  const listCart = document.querySelector(".list_cart");
  const totalProductsElement = document.querySelector(".total-products small");
  const totalPriceElement = document.querySelector(".total-price small");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function parsePrice(price) {
    return parseFloat(price.replace("đ", "").replace(/\./g, "").trim());
  }

  function formatPrice(price) {
    return `${price.toLocaleString("vi-VN")}đ`;
  }

  function updateCartSummary() {
    const totalProducts = cart.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    const totalPrice = cart.reduce((sum, product) => {
      const price = parsePrice(product.price);
      return sum + price * product.quantity;
    }, 0);

    totalProductsElement.innerHTML = `x${totalProducts}`;
    totalPriceElement.innerHTML = formatPrice(totalPrice);
  }

  function renderCartDetail() {
    listCart.innerHTML = ""; // Clear existing items
    cart.forEach((product, index) => {
      const totalPrice = formatPrice(
        parsePrice(product.price) * product.quantity
      );
      const productHTML = `
                <div id="item_cart" class="row d-flex align-items-center">
                    <div class="col-1">
                        <button class="border-0 btn-danger remove_btn" type="button" data-index="${index}">
                            x
                        </button>
                    </div>
                    <div class="col-1">
                        <img height="100px" style="margin-left: -30px;" src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="col-4">
                        <a style="font-size: 16px;">${product.name}</a>
                    </div>
                    <div class="col-2" style="margin-top: 20px;">
                        <p style="color: red;">${product.price}</p>
                    </div>
                    <div class="col-2">
                        <form action="#">
                            <input class="input_number" type="number" value="${product.quantity}" min="0" style="width: 50px;" data-index="${index}">
                        </form>
                    </div>
                    <div class="col-2" style="margin-top: 20px;">
                        <p style="color: red;">${totalPrice}</p>
                    </div>
                    <hr>
                </div>
            `;
      listCart.insertAdjacentHTML("beforeend", productHTML);
    });

    // Add event listeners to remove buttons
    const removeButtons = listCart.querySelectorAll(".remove_btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartDetail();
        updateCartSummary();
      });
    });

    // Add event listeners to quantity input fields
    const quantityInputs = listCart.querySelectorAll(".input_number");
    quantityInputs.forEach((input) => {
      input.addEventListener("change", function () {
        const index = this.dataset.index;
        const newQuantity = parseInt(this.value);
        if (newQuantity > 0) {
          cart[index].quantity = newQuantity;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartDetail();
        updateCartSummary();
      });
    });

    updateCartSummary();
  }

  renderCartDetail();
});
