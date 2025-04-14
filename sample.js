// Sample data for demonstration
const products = {
    1: {
        name: "Edgar Moran Kobhy Chair",
        price: "$150.00",
        discount: "35% OFF",
        description: "Description for Product 1",
        images: [
            "image1_url.jpg",
            "image2_url.jpg",
            "image3_url.jpg"
        ]
    },
    2: {
        name: "Modern Sofa",
        price: "$250.00",
        discount: "20% OFF",
        description: "Description for Product 2",
        images: [
            "sofa1.jpg",
            "sofa2.jpg",
            "sofa3.jpg"
        ]
    }
};

// Get productId from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

// Fetch product data
const product = products[productId];

// Update page elements if product data exists
if (product) {
    document.querySelector('.product-details h2').textContent = product.name;
    document.querySelector('.product-details h3').textContent = product.price;
    document.querySelector('.product-details h4').textContent = product.discount;
    document.querySelector('.product-details p').textContent = product.description;

    // Update image gallery
    const productImg = document.getElementById('productImg');
    productImg.src = product.images[0]; // Default image

    const btns = document.getElementsByClassName('btn');
    btns[0].addEventListener('click', () => productImg.src = product.images[0]);
    btns[1].addEventListener('click', () => productImg.src = product.images[1]);
    btns[2].addEventListener('click', () => productImg.src = product.images[2]);
}
