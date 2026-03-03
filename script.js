let allProducts = [];

const loadTrendingProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;

      if (document.getElementById("trending-products")) {
        displayTrendingProducts();
      }

      if (document.getElementById("all-products-container")) {
        displayAllItems();
      }
    });
};

const displayTrendingProducts = () => {
  const trendingContainer = document.getElementById("trending-products");
  trendingContainer.innerHTML = "";

  const sortedProducts = [...allProducts].sort(
    (p1, p2) => p2.rating.rate - p1.rating.rate,
  );
  const topThree = sortedProducts.slice(0, 3);

  for (let product of topThree) {
    const card = generateProductHTML(product);
    trendingContainer.append(card);
  }
};

const displayAllItems = () => {
  const allContainer = document.getElementById("all-products-container");
  allContainer.innerHTML = "";

  for (let product of allProducts) {
    const card = generateProductHTML(product);
    allContainer.append(card);
  }
};

const generateProductHTML = (product) => {
  const card = document.createElement("div");
  card.innerHTML = `
    <div class="bg-gray-100 rounded-lg shadow flex flex-col overflow-hidden h-full">
      <div class="h-48 flex flex-col items-center justify-center p-4">
      <img src="${product.image}" alt="${product.title}" class="h-full object-contain">
      <div class="flex justify-between items-start w-full px-4">
        <span class="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">${product.category}</span>
        <span class="flex items-center text-yellow-500 font-semibold text-sm">
          ★ ${product.rating.rate} (${product.rating.count})
        </span>
      </div>
      </div>
      <div class="px-4 py-4 flex-1 flex flex-col">
        <h3 class="font-semibold text-sm mb-1 line-clamp-2">${product.title}</h3>
        <p class="text-lg font-bold mb-3">$${product.price}</p>
        <div class="mt-auto flex gap-2">
          <button class="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-200">Details</button>
          <button class="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Add</button>
        </div>
      </div>
    </div>
  `;
  return card;
};

loadTrendingProducts();