const btnsCart = document.querySelectorAll(".product-item .btn .bi-cart");

document.addEventListener("DOMContentLoaded", function () {
  const cartDropdown = document.querySelector(".cart_dropdown .product_list");
  const totalAmountElement = document.querySelector(".total_amount");
  const cartCounterElement = document.querySelector(".cart_counter");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function parsePrice(price) {
    // Remove currency symbol and dots
    return parseFloat(price.replace("đ", "").replace(/\./g, "").trim());
  }

  function formatPrice(price) {
    // Format the price to VND currency format
    return `${price.toLocaleString("vi-VN")}đ`;
  }

  function calculateTotal() {
    let total = cart.reduce((sum, product) => {
      const price = parsePrice(product.price);
      return sum + price * product.quantity;
    }, 0);
    totalAmountElement.textContent = formatPrice(total);
  }

  function updateCartCounter() {
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartCounterElement.textContent = totalItems;
  }

  function renderCart() {
    cartDropdown.innerHTML = "";
    cart.forEach((product, index) => {
      const productHTML = `
                <div class="row" data-index="${index}">
                    <div class="col-3">
                        <img width="100%" src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="col-8">
                        <a style="font-size: 14px;">${product.name}</a>
                        <div class="row">
                            <span>${product.quantity} x ${product.price}</span>
                        </div>
                    </div>
                    <div class="col-2" style="position: absolute; left: 280px;">
                        <button class="remove_btn border-0 btn-danger" type="button">
                            x
                        </button>
                    </div>
                </div>
            `;
      cartDropdown.insertAdjacentHTML("beforeend", productHTML);
    });

    // Add event listeners to remove buttons
    const removeButtons = cartDropdown.querySelectorAll(".remove_btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.closest(".row").dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        calculateTotal();
        updateCartCounter();
      });
    });

    calculateTotal();
    updateCartCounter();
  }

  function addToCartV2(product) {
    const existingProductIndex = cart.findIndex(
      (item) => item.name === product.name
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
      alert("Đã thêm sản phẩm");
  }

  btnsCart.forEach((button, index) => {
    button.addEventListener("click", function () {
      const productItem = button.closest(".product-item");
      const productImage = productItem.querySelector("img").src;
      const productName =
        productItem.querySelector(".product_name").textContent;
      const productPrice =
        productItem.querySelector(".product_price").textContent;

      const product = {
        id: index,
        image: productImage,
        name: productName,
        price: productPrice,
      };

      addToCartV2(product);
    });
  });

  renderCart();
});