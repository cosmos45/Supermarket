// // document.addEventListener('DOMContentLoaded', () => {
// //     const slider = document.querySelector('.products-slider');
// //     const prevBtn = document.querySelector('.prev-btn');
// //     const nextBtn = document.querySelector('.next-btn');
    
// //     nextBtn.addEventListener('click', () => {
// //         slider.scrollBy({ left: 260, behavior: 'smooth' });
// //     });
    
// //     prevBtn.addEventListener('click', () => {
// //         slider.scrollBy({ left: -260, behavior: 'smooth' });
// //     });
// // });

// // document.addEventListener('DOMContentLoaded', function() {
// //     const observer = new IntersectionObserver((entries) => {
// //         entries.forEach(entry => {
// //             if (entry.isIntersecting) {
// //                 entry.target.classList.add('animate');
// //             }
// //         });
// //     }, {
// //         threshold: 0.1
// //     });

// //     document.querySelectorAll('.category-image').forEach((item) => {
// //         observer.observe(item);
// //     });
// // });

// // document.addEventListener('DOMContentLoaded', () => {
// //     const slider = document.querySelector('.most-popular-slider');
// //     const prevBtn = document.querySelector('.most-popular-nav.prev');
// //     const nextBtn = document.querySelector('.most-popular-nav.next');
    
// //     nextBtn.addEventListener('click', () => {
// //         slider.scrollBy({ left: 260, behavior: 'smooth' });
// //     });
    
// //     prevBtn.addEventListener('click', () => {
// //         slider.scrollBy({ left: -260, behavior: 'smooth' });
// //     });
// // });


// // document.addEventListener('DOMContentLoaded', () => {
// //     const slider = document.querySelector('.fresh-products-slider');
// //     const prevBtn = document.querySelector('.fresh-nav-btn.prev');
// //     const nextBtn = document.querySelector('.fresh-nav-btn.next');
    
// //     nextBtn.addEventListener('click', () => {
// //         slider.scrollBy({ left: 260, behavior: 'smooth' });
// //     });
    
// //     prevBtn.addEventListener('click', () => {
// //         slider.scrollBy({ left: -260, behavior: 'smooth' });
// //     });
// // });

// // document.addEventListener('DOMContentLoaded', function() {
// //     const observer = new IntersectionObserver((entries) => {
// //         entries.forEach(entry => {
// //             if (entry.isIntersecting) {
// //                 entry.target.classList.add('slide-in');
// //             }
// //         });
// //     }, {
// //         threshold: 0.1
// //     });

// //     const bannerImage = document.querySelector('.slide-image');
// //     observer.observe(bannerImage);
// // });


// // document.addEventListener('DOMContentLoaded', function() {
// //     const observer = new IntersectionObserver((entries) => {
// //         entries.forEach(entry => {
// //             if (entry.isIntersecting) {
// //                 entry.target.classList.add('slide-active');
// //             }
// //         });
// //     }, {
// //         threshold: 0.1
// //     });

// //     const newsletterImage = document.querySelector('.newsletter-image');
// //     observer.observe(newsletterImage);
// // });


// document.addEventListener('DOMContentLoaded', () => {
//     // Product slider functionality
//     const sliders = document.querySelectorAll('.products-slider, .most-popular-slider, .fresh-products-slider');
//     sliders.forEach(slider => {
//         const prevBtn = slider.parentElement.querySelector('.prev-btn, .most-popular-nav.prev, .fresh-nav-btn.prev');
//         const nextBtn = slider.parentElement.querySelector('.next-btn, .most-popular-nav.next, .fresh-nav-btn.next');
        
//         nextBtn.addEventListener('click', () => {
//             slider.scrollBy({ left: 260, behavior: 'smooth' });
//         });
        
//         prevBtn.addEventListener('click', () => {
//             slider.scrollBy({ left: -260, behavior: 'smooth' });
//         });
//     });

//     // Category image animation
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

//     // Newsletter image animation
//     const newsletterImage = document.querySelector('.newsletter-image');
//     if (newsletterImage) {
//         observer.observe(newsletterImage);
//     }
// });


// document.addEventListener('DOMContentLoaded', function() {
//     // Load header
//     fetch('/components/header.html')
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('header-placeholder').innerHTML = data;
//             initializeHeader();
//         });

//     // Load footer
//     fetch('/components/footer.html')
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('footer-placeholder').innerHTML = data;
//         });
// });

// function initializeHeader() {
//     // Add header-specific functionality here
// }
