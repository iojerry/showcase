const params =
  new URLSearchParams(
    window.location.search
  );

const productId =
  params.get("id");

const product =
  products.find(
    p => p.id === productId
  );
const container =
  document.getElementById(
    "productContainer"
  );

if (!product) {
  
  container.innerHTML =
    "<h1>Product Not Found</h1>";
  
} else {
  
  const startingPrice =
    Object.values(product.prices)[0];
  
  const imageSection = `
<div class="product-image">
  <img src="${product.image}"
       alt="${product.name}">
</div>
`;

const priceSection = `
<div class="price-display">
  ₹<span id="selectedPrice">
    ${startingPrice}
  </span>
</div>
`;

const infoSection = `
<div class="product-info">
  <h1>${product.name}</h1>
  <p
class="description"
id="productDescription">
</p>
</div>
`;

const sizeSection = `
<h3>Select Pack Size</h3>

<div class="size-options">

${Object.entries(product.prices)
.map(([size,price],index)=>`

<label class="size-chip">

<input
type="radio"
name="size"
value="${size}"
data-price="${price}"
${index===0?"checked":""}>

<span>${size}</span>

</label>

`).join("")}

</div>
`;

const quantitySection = `
<div class="quantity-wrapper">

<h3>Quantity</h3>

<div class="quantity-selector">

<button id="minusQty">−</button>

<input
id="qtySelect"
value="1"
readonly>

<button id="plusQty">+</button>

</div>

</div>
`;

const checkoutSection = `
<div class="checkout-form">

<h3>Delivery Details</h3>

<input
type="text"
id="customerName"
placeholder="Full Name">

<input
type="tel"
id="customerPhone"
placeholder="Phone Number">

<textarea
id="customerAddress"
placeholder="Full Address">
</textarea>

<input
type="text"
id="customerCity"
placeholder="City">

<input
type="text"
id="customerPincode"
placeholder="Pincode">

</div>
`;

const reviewSection = `
<div class="reviews-section">

<h2>Customer Reviews</h2>

${product.reviews.map(review=>`

<div class="review-card">

<h4>${review.name}</h4>

<p>${"⭐".repeat(review.rating)}</p>

<p>${review.review}</p>

</div>

`).join("")}

</div>
`;

container.innerHTML = `

<div class="product-page">

${imageSection}

<div class="product-content">

${priceSection}

${infoSection}

${sizeSection}

${quantitySection}

${checkoutSection}

</div>

</div>

${reviewSection}

<div id="toast" class="toast">

<i class="fas fa-circle-exclamation"></i>

<span id="toastMessage">
Message
</span>

</div>

`;

  
  initializeProductPage();
  
}

function showToast(message) {
  
  const toast =
    document.getElementById("toast");
  
  const toastMessage =
    document.getElementById("toastMessage");
  
  toastMessage.textContent =
    message;
  
  toast.classList.add("show");
  
  setTimeout(() => {
    
    toast.classList.remove("show");
    
  }, 3000);
  
}


function initializeProductPage() {

  const descElement =
document.getElementById(
"productDescription"
);

const maxLength = 100;

let expanded = false;

function renderDescription(){

if(
expanded ||
product.description.length <= maxLength
){

descElement.innerHTML =

`${product.description}

<span
class="show-more-link">

Show Less

</span>`;

}else{

descElement.innerHTML =

`${product.description.slice(
0,
maxLength
)}...

<span
class="show-more-link">

Show More

</span>`;

}

const link =
document.querySelector(
".show-more-link"
);

if(link){

link.addEventListener(
"click",
()=>{

expanded =
!expanded;

renderDescription();

});

}

}

renderDescription();
  
  const stickyPrice =
    document.getElementById(
      "stickyPrice"
    );
  
  
  document.getElementById(
      "customerName"
    ).value =
    localStorage.getItem(
      "customerName"
    ) || "";
  
  document.getElementById(
      "customerPhone"
    ).value =
    localStorage.getItem(
      "customerPhone"
    ) || "";
  
  document.getElementById(
      "customerAddress"
    ).value =
    localStorage.getItem(
      "customerAddress"
    ) || "";
  
  document.getElementById(
      "customerCity"
    ).value =
    localStorage.getItem(
      "customerCity"
    ) || "";
  
  document.getElementById(
      "customerPincode"
    ).value =
    localStorage.getItem(
      "customerPincode"
    ) || "";
  
  const priceElement =
    document.getElementById(
      "selectedPrice"
    );
  
  const totalElement =
    document.getElementById(
      "totalPrice"
    );
  
  const qtyInput =
    document.getElementById(
      "qtySelect"
    );
  
  function updateTotal() {
    
    const selectedRadio =
      document.querySelector(
        'input[name="size"]:checked'
      );
    
    const price =
      parseInt(
        selectedRadio.dataset.price
      );
    
    const qty =
      parseInt(
        qtyInput.value
      );
    
    const total =
      price * qty;
    
    priceElement.textContent = price;
    
    if (stickyPrice) {
      stickyPrice.textContent = total;
    }
    
  }
  document
    .querySelectorAll(
      'input[name="size"]'
    )
    .forEach(radio => {
      
      radio.addEventListener(
        "change",
        updateTotal
      );
      
    });
  
  document
    .getElementById("plusQty")
    .addEventListener(
      "click",
      () => {
        
        qtyInput.value =
          parseInt(qtyInput.value) + 1;
        
        updateTotal();
        
      }
    );
  
  document
    .getElementById("minusQty")
    .addEventListener(
      "click",
      () => {
        
        const current =
          parseInt(qtyInput.value);
        
        if (current > 1) {
          
          qtyInput.value =
            current - 1;
          
          updateTotal();
          
        }
        
      }
    );
  
  
  
  
  
  const stickyBtn =
    document.getElementById(
      "stickyOrderBtn"
    );
  
  if (stickyBtn) {
    
    stickyBtn.addEventListener(
      "click",
      () => {
        
        const name =
          document.getElementById(
            "customerName"
          ).value.trim();
        
        const phone =
          document.getElementById(
            "customerPhone"
          ).value.trim();
        
        const address =
          document.getElementById(
            "customerAddress"
          ).value.trim();
        
        const city =
          document.getElementById(
            "customerCity"
          ).value.trim();
        
        const pincode =
          document.getElementById(
            "customerPincode"
          ).value.trim();
        
        if (
          !name ||
          !phone ||
          !address ||
          !city ||
          !pincode
        ) {
          
          showToast(
            "Please fill delivery details."
          );
          
          document
            .getElementById(
              "customerName"
            )
            .scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          
          return;
          
        }
        
        const selectedRadio =
          document.querySelector(
            'input[name="size"]:checked'
          );
        
        const size =
          selectedRadio.value;
        
        const price =
          parseInt(
            selectedRadio.dataset.price
          );
        
        const qty =
          parseInt(
            qtyInput.value
          );
        
        const total =
          price * qty;
        
        const message =
          
          `*🌶️ TAVYA FOODS ORDER*

📦 Product: *${product.name}*
⚖️ Pack Size: *${size}*
🛒 Quantity: *${qty}*

👤 Name: *${name}*
📱 Phone: *${phone}*

🏠 Address: ${address}

🏙️ City: *${city}*
📍 Pincode: *${pincode}*

💰 Order Total: *₹${total}*

💸 *Please confirm my order*`;
        
        localStorage.setItem(
          "customerName",
          name
        );
        
        localStorage.setItem(
          "customerPhone",
          phone
        );
        
        localStorage.setItem(
          "customerAddress",
          address
        );
        
        localStorage.setItem(
          "customerCity",
          city
        );
        
        localStorage.setItem(
          "customerPincode",
          pincode
        );
        
        showToast(
          "Opening WhatsApp..."
        );
        
        setTimeout(() => {
          
          window.open(
            `https://wa.me/916269847325?text=${encodeURIComponent(message)}`,
            "_blank"
          );
          
        }, 500);
        
      });
    
  }
  updateTotal();
  
}
