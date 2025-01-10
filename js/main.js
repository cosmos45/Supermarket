document.addEventListener('DOMContentLoaded', () => {
    // Product slider functionality
    const sliders = document.querySelectorAll('.products-slider, .most-popular-slider, .fresh-products-slider');
    sliders.forEach(slider => {
        const prevBtn = slider.parentElement.querySelector('.prev-btn, .most-popular-nav.prev, .fresh-nav-btn.prev');
        const nextBtn = slider.parentElement.querySelector('.next-btn, .most-popular-nav.next, .fresh-nav-btn.next');
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 260, behavior: 'smooth' });
        });
        
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -260, behavior: 'smooth' });
        });
    });

    // Category image animation
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

    // Newsletter image animation
    const newsletterImage = document.querySelector('.newsletter-image');
    if (newsletterImage) {
        observer.observe(newsletterImage);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).style.display = 'block';
        });
    });
});

function openAddressModal() {
    document.getElementById('addressModal').style.display = 'flex';
}

document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('addressModal').style.display = 'none';
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addressModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function openAddressModal() {
    document.getElementById('addressModal').classList.add('show');
}

function closeAddressModal() {
    document.getElementById('addressModal').classList.remove('show');
}


// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM loaded, initializing application...');
//     // Initialize Cart (single initialization)
//     window.cart = new Cart();
    
//     // Initialize other components
//     initializeSliders();
//     initializeCategoryAnimations();
//     initializeNavigation();
// });

// function initializeSliders() {
//     const sliders = document.querySelectorAll('.products-slider, .most-popular-slider, .fresh-products-slider');
//     sliders.forEach(slider => {
//         const prevBtn = slider.parentElement.querySelector('.prev-btn, .most-popular-nav.prev, .fresh-nav-btn.prev');
//         const nextBtn = slider.parentElement.querySelector('.next-btn, .most-popular-nav.next, .fresh-nav-btn.next');
        
//         if (nextBtn) {
//             nextBtn.addEventListener('click', () => {
//                 slider.scrollBy({ left: 260, behavior: 'smooth' });
//             });
//         }
        
//         if (prevBtn) {
//             prevBtn.addEventListener('click', () => {
//                 slider.scrollBy({ left: -260, behavior: 'smooth' });
//             });
//         }
//     });
// }

// function initializeCategoryAnimations() {
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('animate');
//             }
//         });
//     }, { threshold: 0.1 });

//     document.querySelectorAll('.category-image').forEach((item) => {
//         observer.observe(item);
//     });

//     const newsletterImage = document.querySelector('.newsletter-image');
//     if (newsletterImage) {
//         observer.observe(newsletterImage);
//     }
// }

// function initializeNavigation() {
//     const navItems = document.querySelectorAll('.nav-item');
//     const contentSections = document.querySelectorAll('.content-section');

//     navItems.forEach(item => {
//         item.addEventListener('click', function(e) {
//             e.preventDefault();
//             navItems.forEach(nav => nav.classList.remove('active'));
//             this.classList.add('active');
            
//             contentSections.forEach(section => {
//                 section.style.display = 'none';
//             });
            
//             const targetId = this.getAttribute('href').substring(1);
//             document.getElementById(targetId).style.display = 'block';
//         });
//     });
// }


// class Cart {
//     constructor() {
//         this.items = [];
//         this.total = 0;
//         this.init();
//         console.log('Cart initialized');
//     }

//     init() {
//         // Event delegation for all cart-related actions
//         document.body.addEventListener('click', (e) => {
//             console.log('Click detected on:', e.target);
            
//             // Handle add to cart
//             if (e.target.classList.contains('add-to-cart')) {
//                 console.log('Add to cart clicked');
//                 e.preventDefault();
//                 this.addToCart(e);
//             }
            
//             // Handle quantity changes in product card
//             if (e.target.classList.contains('quantity-btn') || e.target.classList.contains('quantity-increase')) {
//                 const quantityContainer = e.target.closest('.quantity-selector') || e.target.closest('.quantity-control');
//                 if (quantityContainer) {
//                     const input = quantityContainer.querySelector('input[type="number"]');
//                     if (e.target.classList.contains('plus') || e.target.classList.contains('quantity-increase')) {
//                         input.value = parseInt(input.value) + 1;
//                     } else if (e.target.classList.contains('minus')) {
//                         input.value = Math.max(1, parseInt(input.value) - 1);
//                     }
//                 }
//             }

//             // Handle quantity changes in cart
//             if (e.target.classList.contains('qty-btn')) {
//                 const cartItem = e.target.closest('.cart-item');
//                 if (cartItem) {
//                     const id = parseInt(cartItem.dataset.id);
//                     const change = e.target.classList.contains('plus') ? 1 : -1;
//                     this.updateQuantity(id, change);
//                 }
//             }

//             // Handle remove item
//             if (e.target.classList.contains('remove-item')) {
//                 const cartItem = e.target.closest('.cart-item');
//                 if (cartItem) {
//                     const id = parseInt(cartItem.dataset.id);
//                     this.removeItem(id);
//                 }
//             }

//             // Handle cart close
//             if (e.target.classList.contains('close-cart') || e.target.classList.contains('cart-overlay')) {
//                 this.closeCart();
//             }
//         });

//         // Initialize cart icon
//         const cartIcon = document.querySelector('.cart-icon');
//         if (cartIcon) {
//             cartIcon.addEventListener('click', () => this.openCart());
//         }
//     }

//     addToCart(e) {
//         const productCard = e.target.closest('.product-card') || 
//                           e.target.closest('.most-popular-card') || 
//                           e.target.closest('.fresh-product-card');
        
//         if (!productCard) {
//             console.log('No product card found');
//             return;
//         }

//         console.log('Adding product to cart');
//         const priceElement = productCard.querySelector('.current-price') || 
//                            productCard.querySelector('.price') ||
//                            productCard.querySelector('.most-popular-price') ||
//                            productCard.querySelector('.fresh-price-current');
        
//         if (!priceElement) {
//             console.error('Price element not found');
//             return;
//         }

//         const product = {
//             id: Date.now(),
//             name: productCard.querySelector('h3').textContent,
//             price: this.extractPrice(priceElement.textContent),
//             quantity: parseInt(productCard.querySelector('input[type="number"]')?.value || 1),
//             image: productCard.querySelector('img').src
//         };

//         console.log('Product details:', product);

//         const existingItem = this.items.find(item => item.name === product.name);
//         if (existingItem) {
//             existingItem.quantity += product.quantity;
//         } else {
//             this.items.push(product);
//         }

//         this.updateCart();
//         this.openCart();
//     }

//     updateQuantity(id, change) {
//         console.log('Updating quantity for item:', id);
//         const item = this.items.find(item => item.id === id);
//         if (item) {
//             item.quantity = Math.max(1, item.quantity + change);
//             this.updateCart();
//         }
//     }

//     removeItem(id) {
//         console.log('Removing item:', id);
//         this.items = this.items.filter(item => item.id !== id);
//         if (this.items.length === 0) {
//             this.closeCart();
//         }
//         this.updateCart();
//     }

//     updateCart() {
//         const cartItems = document.querySelector('.cart-items');
//         const cartCount = document.querySelector('.cart-count');
//         const totalAmount = document.querySelector('.total-amount');
        
//         if (!cartItems || !cartCount || !totalAmount) {
//             console.error('Cart elements not found');
//             return;
//         }

//         cartItems.innerHTML = this.items.map(item => this.createCartItemHTML(item)).join('');
        
//         this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         totalAmount.textContent = `£${this.total.toFixed(2)}`;
//         cartCount.textContent = `(${this.items.length} ${this.items.length === 1 ? 'Item' : 'Items'})`;
//     }

//     createCartItemHTML(item) {
//         return `
//             <div class="cart-item" data-id="${item.id}">
//                 <img src="${item.image}" alt="${item.name}">
//                 <div class="cart-item-details">
//                     <h3 class="cart-item-title">${item.name}</h3>
//                     <div class="cart-item-price">£${(item.price * item.quantity).toFixed(2)}</div>
//                     <div class="cart-item-quantity">
//                         <button class="qty-btn minus">-</button>
//                         <span>${item.quantity}</span>
//                         <button class="qty-btn plus">+</button>
//                         <button class="remove-item">&times;</button>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     extractPrice(priceString) {
//         const price = parseFloat(priceString.replace('£', ''));
//         return isNaN(price) ? 0 : price;
//     }

//     openCart() {
//         console.log('Opening cart');
//         const sidebar = document.querySelector('.cart-sidebar');
//         const overlay = document.querySelector('.cart-overlay');
//         if (sidebar && overlay) {
//             sidebar.classList.add('open');
//             overlay.classList.add('show');
//         }
//     }

//     closeCart() {
//         console.log('Closing cart');
//         const sidebar = document.querySelector('.cart-sidebar');
//         const overlay = document.querySelector('.cart-overlay');
//         if (sidebar && overlay) {
//             sidebar.classList.remove('open');
//             overlay.classList.remove('show');
//         }
//     }
// }
// document.addEventListener('DOMContentLoaded', () => {
//     window.cart = new Cart();
// });
