document.addEventListener("DOMContentLoaded", function () {

    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
        .then(response => response.json())
        .then(data => {

            displayProductData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


    function displayProductData(data) {


        const productVendor = data.product.vendor;
        const productTitle = data.product.title;
        const productPrice = parseFloat(data.product.price.replace('$', '').replace(',', ''));
        const comparePrice = parseFloat(data.product.compare_at_price.replace('$', '').replace(',', ''));

        if (!isNaN(productPrice) && !isNaN(comparePrice) && comparePrice > productPrice) {

            const discountPercentage = ((comparePrice - productPrice) / comparePrice) * 100;

            const productimage = data.product.images


            let colorOptionsHTML = '<h3>Choose Color:</h3>';
            data.product.options.find(option => option.name === 'Color').values.forEach((value, index) => {
                const colorName = Object.keys(value)[0];
                colorOptionsHTML += `
      <label class="color-option" style="background-color: ${colorName}" for="color${index}">
        <input type="checkbox" id="color${index}" name="color" value="${colorName}">
      </label>`;
            });




            let sizeOptionsHTML = '<h3>Choose Size:</h3>';
            data.product.options.find(option => option.name === 'Size').values.forEach(value => {
                sizeOptionsHTML += `
            <label>
              <input type="radio" name="size" value="${value}"> ${value}
            </label>`;
            });


            const htmlContent = `
        <img class="rectangle-6-Rjs" src="./images/rectangle-4.png"/>

       
          <h2 class="one"> ${productVendor} </h2>
  
         
          <h2 class="two"> ${productTitle}</h2>
          <h2 class="three"> $${productPrice.toFixed(2)}</h2>
          <h2 class="four"><del> $${comparePrice.toFixed(2)}</del></h2>
          <h2 class="five"> ${discountPercentage.toFixed(2)}%off</h2>
  
          
  
          <div class="six">${colorOptionsHTML}</div>
          <div class="size-option">${sizeOptionsHTML}</div>
          <div class="quantity-container">
            <button class="quantity-button decrease">-</button>
            <input type="text" class="quantity-input" value="1">
            <button class="quantity-button increase">+</button>
            <button class="add-to-cart-button">&#128722; Add to Cart</button>
          </div>
          
          <div class="ten">
              <p >    ${data.product.description}</p>
              </div>
  
              <img class="eleven" src="./images/rectangle-6.png"/>
              <img class="twelve" src="./images/rectangle-5-Ley.png"/>
              <img class="thirteen" src="./images/rectangle-7.png"/>
              <img class="fourteen" src="./images/rectangle-8-981.png"/>
              
  
        `;


            document.getElementById('productData').innerHTML = htmlContent;


            document.querySelector('.add-to-cart-button').addEventListener('click', function () {

                const selectedColors = document.querySelectorAll('input[name="color"]:checked');
                const colors = Array.from(selectedColors).map(color => color.value).join(', ');


                const selectedSize = document.querySelector('input[name="size"]:checked');
                const size = selectedSize ? selectedSize.value : 'Not Selected';


                const quantity = document.querySelector('.quantity-input').value;


                const submittedData = `
           <div id='border'>
              <h2>Added to Cart:</h2>
            <p>Product: ${productTitle}</p>
            <p>Vendor: ${productVendor}</p>
            <p>Color(s): ${colors}</p>
            <p>Size: ${size}</p>
            <p>Quantity: ${quantity}</p>
              
              
              </div>
          `;
                document.getElementById('submittedData').innerHTML = submittedData;
                document.getElementById('submittedData').style.display = 'block';
            });

            document.querySelector('.quantity-button.decrease').addEventListener('click', function () {
                const quantityInput = document.querySelector('.quantity-input');
                let currentValue = parseInt(quantityInput.value);
                if (!isNaN(currentValue) && currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });

            document.querySelector('.quantity-button.increase').addEventListener('click', function () {
                const quantityInput = document.querySelector('.quantity-input');
                let currentValue = parseInt(quantityInput.value);
                if (!isNaN(currentValue)) {
                    quantityInput.value = currentValue + 1;
                }
            });

        } else {

            const htmlContent = `
          <h2>Vendor: ${productVendor}</h2>
          <h2>Title: ${productTitle}</h2>
          <h2>Price: $${productPrice.toFixed(2)}</h2>
          <div >${colorOptionsHTML}</div>
          <div class="size-option">${sizeOptionsHTML}</div>
          <div class="quantity-container">
            <button class="quantity-button decrease">-</button>
            <input type="text" class="quantity-input" value="1">
            <button class="quantity-button increase">+</button>
            <button class="add-to-cart-button">&#128722; Add to Cart</button>
          </div>
          <h1 class="ten">${data.product.description}</h1>
        `;


            document.getElementById('productData').innerHTML = htmlContent;


            document.querySelector('.add-to-cart-button').addEventListener('click', function () {

                const selectedColors = document.querySelectorAll('input[name="color"]:checked');
                const colors = Array.from(selectedColors).map(color => color.value).join(', ');


                const selectedSize = document.querySelector('input[name="size"]:checked');
                const size = selectedSize ? selectedSize.value : 'Not Selected';

                const quantity = document.querySelector('.quantity-input').value;

                const submittedData = `
            <h2>Added to Cart:</h2>
            <p>Product: ${productTitle}</p>
            <p>Vendor: ${productVendor}</p>
            <p>Color(s): ${colors}</p>
            <p>Size: ${size}</p>
            <p>Quantity: ${quantity}</p>
          `;
                document.getElementById('submittedData').innerHTML = submittedData;
                document.getElementById('submittedData').style.display = 'block';
            });


            document.querySelector('.quantity-button.decrease').addEventListener('click', function () {
                const quantityInput = document.querySelector('.quantity-input');
                let currentValue = parseInt(quantityInput.value);
                if (!isNaN(currentValue) && currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });

            document.querySelector('.quantity-button.increase').addEventListener('click', function () {
                const quantityInput = document.querySelector('.quantity-input');
                let currentValue = parseInt(quantityInput.value);
                if (!isNaN(currentValue)) {
                    quantityInput.value = currentValue + 1;
                }

            });

        }
    }

});