const productGrid =
document.getElementById(
"productGrid"
);

products.forEach(product => {

const startingPrice =
Math.min(
...Object.values(product.prices)
);

productGrid.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p class="product-price">
Starting from ₹${startingPrice}
</p>

<a
href="product.html?id=${product.id}"
class="buy-btn">

View Details

</a>

</div>

`;

});