async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
function renderProducts(products, containerId) {
    const productListElement = document.getElementById(containerId);
    productListElement.innerHTML = ''; 

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product', 'p1');

        const btn = document.createElement('button');
        btn.classList.add("b1")
        btn.innerText = 'Add To Cart';

    
        let discountPercentage = '';
        const productPrice = parseFloat(product.compare_at_price.replace('$', '').replace(',', ''));
        const comparePrice = parseFloat(product.price.replace('$', '').replace(',', ''));
      
        if (!isNaN(productPrice) && !isNaN(comparePrice) && comparePrice < productPrice) {
            discountPercentage = `${((productPrice - comparePrice) / productPrice * 100).toFixed(2)}% Off`;
        }

        productElement.innerHTML = `
            ${product.badge_text}
            <img src="${product.image}" alt="${product.title}" height="300px" width="300px">
            <div class="product-details">
                <h4>${product.title}</h4>
                <p>${product.vendor}</p>
                <p>Rs.${product.price} <strike>${product.compare_at_price}</strike></p>
                <p>${discountPercentage}</p>
            </div>
        `;
        productElement.appendChild(btn);
        productListElement.appendChild(productElement);
    });
}


async function init() {
    const data = await fetchData('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    if (!data) {
        console.error('Failed to fetch data.');
        return;
    }

    // Event listeners for category buttons
    document.getElementById('menBtn').addEventListener('click', function () {
        const menData = data.categories.find(category => category.category_name === 'Men');
        if (menData) {
            renderProducts(menData.category_products, 'productList');
        } else {
            console.error('Men category not found.');
        }
    });

    document.getElementById('womenBtn').addEventListener('click', function () {
        const womenData = data.categories.find(category => category.category_name === 'Women');
        if (womenData) {
            renderProducts(womenData.category_products, 'productList');
        } else {
            console.error('Women category not found.');
        }
    });

    document.getElementById('kidsBtn').addEventListener('click', function () {
        const kidsData = data.categories.find(category => category.category_name === 'Kids');
        if (kidsData) {
            renderProducts(kidsData.category_products, 'productList');
        } else {
            console.error('Kids category not found.');
        }
    });
}

init();