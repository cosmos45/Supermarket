document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeHeader();
        });

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.price-range input');
    const values = document.querySelectorAll('.price-values span');
    
    slider.addEventListener('input', function() {
        const value = this.value / 100;
        const percentage = ((value - 2.24) / (26.99 - 2.24)) * 100;
        this.style.background = `linear-gradient(to right, #6AA84F ${percentage}%, #e0e0e0 ${percentage}%)`;
        values[0].textContent = `£${value.toFixed(2)}`;
    });
});




document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing application...');
    // Initialize Cart (single initialization)
    window.cart = new Cart();
    
    // Initialize other components
    initializeSliders();
    initializeCategoryAnimations();
    initializeNavigation();
});

function initializeSliders() {
    const sliders = document.querySelectorAll('.products-slider, .most-popular-slider, .fresh-products-slider');
    sliders.forEach(slider => {
        const prevBtn = slider.parentElement.querySelector('.prev-btn, .most-popular-nav.prev, .fresh-nav-btn.prev');
        const nextBtn = slider.parentElement.querySelector('.next-btn, .most-popular-nav.next, .fresh-nav-btn.next');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                slider.scrollBy({ left: 260, behavior: 'smooth' });
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                slider.scrollBy({ left: -260, behavior: 'smooth' });
            });
        }
    });
}

function initializeCategoryAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.category-image').forEach((item) => {
        observer.observe(item);
    });

    const newsletterImage = document.querySelector('.newsletter-image');
    if (newsletterImage) {
        observer.observe(newsletterImage);
    }
}

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).style.display = 'block';
        });
    });
}


class Cart {
    constructor() {
        this.items = this.loadCart();
        this.total = 0;
        this.init();
        console.log('Cart initialized');
    }

    loadCart() {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Failed to load cart:', error);
            return [];
        }
    }

    init() {
        document.body.addEventListener('click', (e) => {
            console.log('Click detected on:', e.target);
            
            if (e.target.classList.contains('add-to-cart')) {
                console.log('Add to cart clicked');
                e.preventDefault();
                this.addToCart(e);
            }
            
            if (e.target.classList.contains('quantity-btn') || e.target.classList.contains('quantity-increase')) {
                const quantityContainer = e.target.closest('.quantity-selector') || e.target.closest('.quantity-control');
                if (quantityContainer) {
                    const input = quantityContainer.querySelector('input[type="number"]');
                    if (e.target.classList.contains('plus') || e.target.classList.contains('quantity-increase')) {
                        input.value = parseInt(input.value) + 1;
                    } else if (e.target.classList.contains('minus')) {
                        input.value = Math.max(1, parseInt(input.value) - 1);
                    }
                }
            }

            if (e.target.classList.contains('qty-btn')) {
                const cartItem = e.target.closest('.cart-item');
                if (cartItem) {
                    const id = parseInt(cartItem.dataset.id);
                    const change = e.target.classList.contains('plus') ? 1 : -1;
                    this.updateQuantity(id, change);
                }
            }

            if (e.target.classList.contains('remove-item')) {
                const cartItem = e.target.closest('.cart-item');
                if (cartItem) {
                    const id = parseInt(cartItem.dataset.id);
                    this.removeItem(id);
                }
            }

            if (e.target.classList.contains('close-cart') || e.target.classList.contains('cart-overlay')) {
                this.closeCart();
            }
        });

        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => this.openCart());
        }

        this.updateCart();
    }

    addToCart(e) {
        const productCard = e.target.closest('.product-card') || 
                          e.target.closest('.most-popular-card') || 
                          e.target.closest('.fresh-product-card');
        
        if (!productCard) {
            console.log('No product card found');
            return;
        }

        console.log('Adding product to cart');
        const priceElement = productCard.querySelector('.current-price') || 
                           productCard.querySelector('.price') ||
                           productCard.querySelector('.most-popular-price') ||
                           productCard.querySelector('.fresh-price-current');
        
        if (!priceElement) {
            console.error('Price element not found');
            return;
        }

        const product = {
            id: Date.now(),
            name: productCard.querySelector('h3').textContent,
            price: this.extractPrice(priceElement.textContent),
            quantity: parseInt(productCard.querySelector('input[type="number"]')?.value || 1),
            image: productCard.querySelector('img').src
        };

        console.log('Product details:', product);

        const existingItem = this.items.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.items.push(product);
        }

        this.updateCart();
        this.openCart();
    }

    updateQuantity(id, change) {
        console.log('Updating quantity for item:', id);
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, item.quantity + change);
            this.updateCart();
        }
    }

    removeItem(id) {
        console.log('Removing item:', id);
        this.items = this.items.filter(item => item.id !== id);
        this.updateCart();
        if (this.items.length === 0) {
            this.closeCart();
        }
    }

    updateCart() {
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const totalAmount = document.querySelector('.total-amount');
        
        if (!cartItems || !cartCount || !totalAmount) {
            console.error('Cart elements not found');
            return;
        }
    
        cartItems.innerHTML = this.items.map(item => this.createCartItemHTML(item)).join('');
        
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `£${this.total.toFixed(2)}`;
        cartCount.textContent = `(${this.items.length} ${this.items.length === 1 ? 'Item' : 'Items'})`;
        
        try {
            localStorage.setItem('cartItems', JSON.stringify(this.items));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }

    createCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">£${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn minus">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus">+</button>
                        <button class="remove-item">&times;</button>
                    </div>
                </div>
            </div>
        `;
    }

    extractPrice(priceString) {
        const price = parseFloat(priceString.replace('£', ''));
        return isNaN(price) ? 0 : price;
    }

    openCart() {
        console.log('Opening cart');
        const sidebar = document.querySelector('.cart-sidebar');
        const overlay = document.querySelector('.cart-overlay');
        if (sidebar && overlay) {
            sidebar.classList.add('open');
            overlay.classList.add('show');
        }
    }

    closeCart() {
        console.log('Closing cart');
        const sidebar = document.querySelector('.cart-sidebar');
        const overlay = document.querySelector('.cart-overlay');
        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        }
    }
    addToCartFromDetails(product) {
        console.log('Adding product from details:', product);
        
        // Validate product data
        if (!product || !product.name || !product.price) {
            console.error('Invalid product data');
            return;
        }
    
        const existingItem = this.items.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.items.push(product);
        }
    
        // Update cart UI
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const totalAmount = document.querySelector('.total-amount');
        
        if (cartItems && cartCount && totalAmount) {
            this.updateCart();
            this.openCart();
        } else {
            console.error('Cart elements not found - redirecting to cart page');
            window.location.href = '/pages/cart.html';
        }
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});

class CartPage {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        // Load cart items from localStorage immediately
        this.loadCartItems();
        
        // Add event listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quantity-btn')) {
                const itemId = e.target.closest('.cart-item').dataset.id;
                const isIncrease = e.target.classList.contains('plus');
                this.updateQuantity(itemId, isIncrease);
            }
            
            if (e.target.classList.contains('remove-item')) {
                const itemId = e.target.closest('.cart-item').dataset.id;
                this.removeItem(itemId);
            }
        });

        // Listen for storage events from other tabs/windows
        window.addEventListener('storage', (e) => {
            if (e.key === 'cartItems') {
                this.loadCartItems();
            }
        });
    }

    loadCartItems() {
        try {
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) {
                this.items = JSON.parse(savedCart);
                this.renderCart();
            }
        } catch (error) {
            console.error('Failed to load cart:', error);
            this.items = [];
        }
    }

    updateQuantity(itemId, isIncrease) {
        const item = this.items.find(item => item.id === parseInt(itemId));
        if (item) {
            if (isIncrease) {
                item.quantity++;
            } else {
                item.quantity = Math.max(1, item.quantity - 1);
            }
            this.updateCart();
        }
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== parseInt(itemId));
        this.updateCart();
    }

    updateCart() {
        try {
            localStorage.setItem('cartItems', JSON.stringify(this.items));
            this.renderCart();
        } catch (error) {
            console.error('Failed to update cart:', error);
        }
    }

    renderCart() {
        const cartContainer = document.getElementById('cart-items-list');
        const subtotalElement = document.getElementById('cart-subtotal');
        const totalElement = document.getElementById('cart-total');

        if (!cartContainer || !subtotalElement || !totalElement) return;

        if (this.items.length === 0) {
            cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            subtotalElement.textContent = '£0.00';
            totalElement.textContent = '£0.00';
            return;
        }

        cartContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <div class="price-info">
                        ${item.originalPrice ? `<span class="original-price">£${item.originalPrice}</span>` : ''}
                        <span class="current-price">£${item.price}</span>
                    </div>
                    <div class="item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="remove-item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="item-total">£${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');

        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        subtotalElement.textContent = `£${subtotal.toFixed(2)}`;
        totalElement.textContent = `£${subtotal.toFixed(2)}`;
    }
}

// Initialize cart page and promo/note sections
document.addEventListener('DOMContentLoaded', () => {
    new CartPage();

    // Initialize promo code and note sections
    document.querySelectorAll('.action-text').forEach(element => {
        element.addEventListener('click', function() {
            const container = this.nextElementSibling;
            container.classList.toggle('hidden');
        });
    });
});

class ProductPage {
    constructor() {
        this.initializeProductCards();
        this.initializeProductDetails();
        this.initializeSections();
    }

    initializeProductCards() {
        document.querySelectorAll('.product-card, .most-popular-card, .fresh-product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.quantity-selector') || 
                    e.target.closest('.quantity-control') || 
                    e.target.closest('.add-to-cart')) {
                    return;
                }
                const productData = {
                    id: Date.now(),
                    name: card.querySelector('h3').textContent,
                    price: this.extractPrice(card.querySelector('.current-price, .price, .most-popular-price, .fresh-price-current').textContent),
                    image: card.querySelector('img').src,
                    quantity: 1
                };

                localStorage.setItem('selectedProduct', JSON.stringify(productData));
                window.location.href = `/pages/productdetails.html?id=${productData.id}`;
            });
        });
    }

    initializeProductDetails() {
        const productData = JSON.parse(localStorage.getItem('selectedProduct'));
        if (!productData) return;

        const titleElement = document.querySelector('.product-title');
        const imageElement = document.querySelector('.product-image img');
        const priceElement = document.querySelector('.product-price');
        
        if (titleElement) titleElement.textContent = productData.name;
        if (imageElement) imageElement.src = productData.image;
        if (priceElement) priceElement.textContent = `£${productData.price.toFixed(2)}`;

        const addToCartBtn = document.querySelector('.add-to-cart');
        const quantityInput = document.querySelector('.quantity-input');

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const quantity = parseInt(quantityInput?.value || 1);
                const cart = window.cart || new Cart();
                
                const cartItem = {
                    ...productData,
                    quantity: quantity
                };
                
                cart.addToCartFromDetails(cartItem);
            });
        }
    }

    initializeSections() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const header = section.querySelector('.section-header');
            const content = section.querySelector('.section-content');
            const toggle = section.querySelector('.toggle');
            
            if (header && content && toggle) {
                header.addEventListener('click', () => {
                    // Close other sections
                    sections.forEach(otherSection => {
                        if (otherSection !== section) {
                            const otherContent = otherSection.querySelector('.section-content');
                            const otherToggle = otherSection.querySelector('.toggle');
                            if (otherContent && otherToggle) {
                                otherContent.classList.remove('active');
                                otherToggle.textContent = '+';
                            }
                        }
                    });
                    
                    // Toggle current section
                    content.classList.toggle('active');
                    toggle.textContent = content.classList.contains('active') ? '-' : '+';
                });
            }
        });
    }

    extractPrice(priceString) {
        return parseFloat(priceString.replace('£', ''));
    }
}

// Initialize the ProductPage
document.addEventListener('DOMContentLoaded', () => {
    window.cart = window.cart || new Cart();
    new ProductPage();
});

document.addEventListener('DOMContentLoaded', () => {
    new ProductPage();
});
