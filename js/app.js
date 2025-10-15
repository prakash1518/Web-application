document.addEventListener('DOMContentLoaded', init);

function init() {
    // Initialize all components
    initAuth();
    initLoginPage();
    initHomepage();
    initCatalogPage();
    initBlogPage();
    initAccountPage();
    initAdminPage();
    initCartPage();
}

function initAuth() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const loginLink = document.querySelector('.nav-login');
    const logoutLink = document.querySelector('.nav-logout');
    const accountLink = document.querySelector('.nav-account');

    if (isAuthenticated) {
        if(loginLink) loginLink.style.display = 'none';
        if(logoutLink) logoutLink.style.display = 'list-item';
        if(accountLink) accountLink.style.display = 'list-item';
    } else {
        if(loginLink) loginLink.style.display = 'list-item';
        if(logoutLink) logoutLink.style.display = 'none';
        if(accountLink) accountLink.style.display = 'none';
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
    }
}

function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sessionStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'index.html';
        });
    }

    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            sessionStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'admin.html';
        });
    }
}

// ... (The rest of the functions remain largely the same)
function initHomepage() {
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        renderProducts(mockData.products.slice(0, 2), featuredProductsContainer);
    }
}

function initCatalogPage() {
    const productGridContainer = document.getElementById('product-grid');
    if (productGridContainer) {
        const searchBar = document.getElementById('search-bar');
        const categoryFilter = document.getElementById('category-filter');
        const categories = ['all', ...new Set(mockData.products.map(p => p.category))];
        
        if (categoryFilter.options.length <= 1) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoryFilter.appendChild(option);
            });
        }

        function filterAndRender() {
            const searchTerm = searchBar.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
            const filtered = mockData.products.filter(p => 
                (p.name.toLowerCase().includes(searchTerm)) && 
                (selectedCategory === 'all' || p.category === selectedCategory)
            );
            renderProducts(filtered, productGridContainer);
        }

        searchBar.addEventListener('input', filterAndRender);
        categoryFilter.addEventListener('change', filterAndRender);
        renderProducts(mockData.products, productGridContainer);
    }
}

function initBlogPage() {
    const blogPostsContainer = document.getElementById('blog-posts');
    if (blogPostsContainer) {
        renderBlogPosts(mockData.blog, blogPostsContainer);
    }
}

function initAccountPage() {
    const accountInfoContainer = document.getElementById('account-info');
    if (accountInfoContainer) {
        const user = mockData.user;
        accountInfoContainer.innerHTML = `
          <form>
            <label>Full Name</label>
            <input type="text" value="${user.name}" readonly />
            <label>Email</label>
            <input type="email" value="${user.email}" readonly />
          </form>
        `;
    }
    const orderHistoryContainer = document.getElementById('order-history');
    if(orderHistoryContainer){
        orderHistoryContainer.innerHTML = '';
        mockData.user.orders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.className = 'card-content';
            orderDiv.innerHTML = `<p><strong>Order ID:</strong> ${order.id} | <strong>Date:</strong> ${order.date} | <strong>Status:</strong> ${order.status} | <strong>Total:</strong> ₹${order.total.toFixed(2)}</p>`;
            orderHistoryContainer.appendChild(orderDiv);
        });
    }
}

function initAdminPage() {
    const ordersTableBody = document.getElementById('orders-table-body');
    if (ordersTableBody) {
        ordersTableBody.innerHTML = '';
        mockData.user.orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>#${order.id}</td><td>${order.date}</td><td>₹${order.total.toFixed(2)}</td><td>${order.status}</td>`;
            ordersTableBody.appendChild(row);
        });
    }
}

function initCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        renderCart();
    }
}

function renderProducts(products, container) {
    container.innerHTML = '';
    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p class="product-price">₹${product.price}</p>
                <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        container.appendChild(productCard);
    });

    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.getAttribute('data-product-id');
            addToCart(parseInt(productId));
        }
    });
}

function renderBlogPosts(posts, container) {
    container.innerHTML = '';
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="card-content">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            </div>
        `;
        container.appendChild(postCard);
    });
}

function addToCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [] };
    const product = mockData.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.items.push({ productId: product.id, name: product.name, price: product.price, quantity: 1, image: product.image });
    }
    
    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert(`'${product.name}' was added to your cart.`);
    
    if (document.getElementById('cart-items')) {
        renderCart();
    }
}

function updateCartTotals(cart) {
    cart.subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cart.tax = cart.subtotal * 0.05;
    cart.total = cart.subtotal + cart.tax;
    return cart;
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');
    if (!cartItemsContainer) return;

    let cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [] };
    cart = updateCartTotals(cart);
    
    cartItemsContainer.innerHTML = '';
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.items.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div><h3>${item.name}</h3><p>Quantity: ${item.quantity}</p><p class="product-price">₹${item.price.toFixed(2)}</p></div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    cartSummaryContainer.innerHTML = `
        <h2>Order Summary</h2>
        <div class="summary-line"><span>Subtotal</span><span>₹${cart.subtotal.toFixed(2)}</span></div>
        <div class="summary-line"><span>Tax</span><span>₹${cart.tax.toFixed(2)}</span></div>
        <hr style="margin-bottom: 1rem; border-color: #333;">
        <div class="summary-line" style="font-weight: bold; font-size: 1.2rem;"><span>Total</span><span>₹${cart.total.toFixed(2)}</span></div>
        <a href="#" class="btn" style="width: 100%; text-align: center;">Proceed to Checkout</a>
    `;
}