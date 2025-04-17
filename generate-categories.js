const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const categories = [
  "Action",
  "Adventure",
  "Arcade",
  "Puzzle & Logic",
  "Sports & Racing",
  "Strategy",
];

async function fetchGames() {
  try {
    const response = await fetch("https://pub.gamezop.com/v3/games?id=10431");
    const data = await response.json();
    return data.games;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

function generateGameCards(games) {
  return games
    .map(
      (game) => `
    <div class="game-card">
      <img src="${game.assets.cover}" alt="${
        game.name.en
      } - Free HTML5 Game" class="game-image" loading="lazy">
      <div class="game-info">
        <h2 class="game-title">${game.name.en}</h2>
        <p class="game-description">${game.description.en}</p>
        <div class="game-meta">
          <span class="plays">Plays: ${formatNumber(game.gamePlays)}</span>
          <span class="rating">${formatRating(game.rating)}</span>
        </div>
        <a href="${
          game.url
        }" target="_blank" rel="noopener noreferrer" class="play-button">
          Play Now
        </a>
      </div>
    </div>
  `
    )
    .join("");
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

function formatRating(rating) {
  if (!rating) return "N/A";
  return rating.toFixed(1) + "/5";
}

function generateNavigation(currentCategory = "all") {
  const categories = [
    { name: "All Games", slug: "all" },
    { name: "Action", slug: "action" },
    { name: "Adventure", slug: "adventure" },
    { name: "Arcade", slug: "arcade" },
    { name: "Puzzle & Logic", slug: "puzzle-logic" },
    { name: "Sports & Racing", slug: "sports-racing" },
    { name: "Strategy", slug: "strategy" },
  ];

  return `
    <nav class="main-nav">
      <ul>
        ${categories
          .map(
            (category) => `
          <li>
            <a href="${
              category.slug === "all" ? "/" : `/categories/${category.slug}/`
            }" 
               class="${currentCategory === category.slug ? "active" : ""}">
              ${category.name}
            </a>
          </li>
        `
          )
          .join("")}
      </ul>
    </nav>
  `;
}

function generateCategoryPage(category, games) {
  const categoryGames = games.filter((game) =>
    game.categories.en.includes(category)
  );
  const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const navigation = generateNavigation(slug);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Play free ${category} HTML5 games online without downloads. Enjoy the best ${category.toLowerCase()} games in your browser.">
  <meta name="keywords" content="HTML5 games, free games, online games, ${category.toLowerCase()} games, browser games">
  <title>Free ${category} HTML5 Games - Play Online Without Download</title>
  <link rel="stylesheet" href="../../styles.css">
  <link rel="canonical" href="https://free-unblocked-html5-games.github.io/categories/${slug}/">
</head>
<body>
  <header>
    <h1>${category} Games</h1>
    <p>Play amazing ${category.toLowerCase()} games right in your browser! No downloads, no registration required.</p>
    ${navigation}
  </header>

  <main>
    <div class="tabs-container">
      <div class="games-container">
        ${generateGameCards(categoryGames)}
      </div>
    </div>
  </main>

  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h3>About Us</h3>
        <p>We provide free HTML5 games that you can play directly in your browser.</p>
      </div>
      <div class="footer-section">
        <h3>Categories</h3>
        <ul>
          ${categories
            .map(
              (cat) => `
            <li><a href="../categories/${cat.slug}/">${cat.name} Games</a></li>
          `
            )
            .join("")}
        </ul>
      </div>
    </div>
    <p class="copyright">&copy; 2024 Free HTML5 Games. All rights reserved.</p>
  </footer>
</body>
</html>
  `;

  // Create category directory if it doesn't exist
  const categoryDir = path.join("categories", slug);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  // Write HTML file
  fs.writeFileSync(path.join(categoryDir, "index.html"), html);
}

async function generateCategoryPages() {
  const games = await fetchGames();

  // Create categories directory if it doesn't exist
  if (!fs.existsSync("categories")) {
    fs.mkdirSync("categories");
  }

  // Generate pages for each category
  categories.forEach((category) => {
    generateCategoryPage(category, games);
  });

  console.log("Category pages generated successfully!");
}

function generateCategoryCards(categories) {
  return categories
    .map(
      (category) => `
    <a href="${category.url}" class="category-card">
      <img src="${category.thumb}" alt="${category.name} Games" class="category-image" loading="lazy">
      <div class="category-info">
        <h2 class="category-title">${category.name}</h2>
        <p class="category-description">${category.description}</p>
        <span class="category-count">${category.count} Games</span>
      </div>
    </a>
  `
    )
    .join("");
}

generateCategoryPages();
