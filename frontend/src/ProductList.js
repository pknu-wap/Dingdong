import faker from 'faker';

class ProductList {
  constructor() {
    this.productsContainer = document.querySelector('.products-container');
    this.loadingIndicator = document.querySelector('.loading');

    this.products = [];
    this.page = 1;
    this.isLoading = false;

    this.generateProducts();
    this.renderProducts();
    this.attachScrollEvent();
  }

  generateProducts() {
    for (let i = 0; i < 20; i++) {
      this.products.push({
        image: faker.image.image(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
      });
    }
  }

  renderProducts() {
    const productsToRender = this.products.slice((this.page - 1) * 20, this.page * 20);
    productsToRender.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₩${product.price}</p>
      `;
      this.productsContainer.appendChild(productElement);
    });
  }

  attachScrollEvent() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    if (this.isLoading || this.products.length === 0) return;

    const scrollHeight = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;

    if (scrollHeight >= documentHeight - 200) {
      this.isLoading = true;
      this.loadingIndicator.style.display = 'block';

      this.page++;
      this.generateProducts();

      setTimeout(() => {
        this.renderProducts();
        this.isLoading = false;
        this.loadingIndicator.style.display = 'none';
      }, 500);
    }
  }
}

const productList = new ProductList();