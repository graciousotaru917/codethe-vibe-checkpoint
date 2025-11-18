// Product data
const products = [
    {
        id: 1,
        name: "Wireless Pro Headphones",
        description: "Premium noise-cancelling headphones with exceptional sound quality and 30-hour battery life.",
        price: 299.99,
        features: ["Active Noise Cancellation", "30h Battery Life", "Touch Controls", "Voice Assistant"],
        icon: "fas fa-headphones"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone connectivity.",
        price: 199.99,
        features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "Sleep Analysis"],
        icon: "fas fa-watch"
    },
    {
        id: 3,
        name: "Ultra HD Camera",
        description: "Professional 4K camera with advanced image stabilization and wireless streaming capabilities.",
        price: 599.99,
        features: ["4K Video Recording", "Image Stabilization", "WiFi Connectivity", "Night Mode"],
        icon: "fas fa-camera"
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = themeToggle.querySelector('i');
const toggleText = themeToggle.querySelector('.toggle-text');

// Initialize theme
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeToggle(currentTheme);

// Generate product cards
function generateProductCards() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <i class="${product.icon}"></i>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <ul class="product-features">
                ${product.features.map(feature => `
                    <li><i class="fas fa-check"></i>${feature}</li>
                `).join('')}
            </ul>
            <button class="buy-button" onclick="handleBuyClick(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
    
    // Add theme change animation
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
});

function updateThemeToggle(theme) {
    if (theme === 'dark') {
        toggleIcon.className = 'fas fa-sun';
        toggleText.textContent = 'Light Mode';
    } else {
        toggleIcon.className = 'fas fa-moon';
        toggleText.textContent = 'Dark Mode';
    }
}

// Buy button handler
function handleBuyClick(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Add purchase animation
        const button = event.target;
        const originalText = button.textContent;
        
        button.textContent = 'Adding...';
        button.classList.add('loading');
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Added to Cart!';
            button.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('loading');
                button.disabled = false;
                button.style.background = '';
                
                // Show purchase notification
                showNotification(`${product.name} added to cart!`);
            }, 1500);
        }, 1000);
    }
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize
function init() {
    generateProductCards();
    
    // Observe product cards for scroll animations
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add keyboard shortcut for theme toggle (Ctrl/Cmd + T)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // You can add responsive behavior here if needed
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateProductCards, handleBuyClick };
}
