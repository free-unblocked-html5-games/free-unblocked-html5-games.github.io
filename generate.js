const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const sharp = require("sharp");

async function fetchGames() {
  try {
    const [mainGamesRes, specialGamesRes] = await Promise.all([
      fetch("https://pub.gamezop.com/v3/games?id=10431"),
      fetch("https://retrobowlclick.github.io/data.json"),
    ]);

    const mainGames = await mainGamesRes.json();
    const specialGames = await specialGamesRes.json();

    return { mainGames, specialGames };
  } catch (error) {
    console.error("Error fetching games:", error);
    return { mainGames: [], specialGames: [] };
  }
}

async function optimizeImage(url, outputPath) {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();

    await sharp(buffer)
      .resize(300, 200, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(outputPath);

    return path.basename(outputPath);
  } catch (error) {
    console.error("Error optimizing image:", error);
    return url; // Return original URL if optimization fails
  }
}

function generateGameCards(games) {
  return games
    .map(
      (game) => `
    <a href="${
      game.url
    }" target="_blank" rel="noopener noreferrer" class="game-card">
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
        <span class="play-button">Play Now</span>
      </div>
    </a>
  `
    )
    .join("");
}

function generateSpecialGames(specialGames) {
  return specialGames
    .map(
      (game) => `
    <a href="${game.url}" target="_blank" rel="noopener noreferrer" class="special-game-item">
      <img src="${game.thumb}" alt="${game.name} - Popular HTML5 Game" loading="lazy">
      <div class="special-game-info">
        <div class="special-game-title">${game.name}</div>
        <div class="special-game-description">${game.description}</div>
      </div>
    </a>
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

async function generateSitemap(games) {
  const baseUrl = "https://free-unblocked-html5-games.github.io";
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${categories
    .filter((category) => category.slug !== "all")
    .map(
      (category) => `
  <url>
    <loc>${baseUrl}/categories/${category.slug}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  `
    )
    .join("")}
  ${games
    .map(
      (game) => `
  <url>
    <loc>${baseUrl}/game/${game.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;

  fs.writeFileSync("sitemap.xml", sitemap);
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

// Define categories at the top level
const categories = [
  { name: "All Games", slug: "all" },
  { name: "Action", slug: "action" },
  { name: "Adventure", slug: "adventure" },
  { name: "Arcade", slug: "arcade" },
  { name: "Puzzle & Logic", slug: "puzzle-logic" },
  { name: "Sports & Racing", slug: "sports-racing" },
  { name: "Strategy", slug: "strategy" },
];

async function generateHTML() {
  try {
    const { mainGames, specialGames } = await fetchGames();

    // Create images directory if it doesn't exist
    if (!fs.existsSync("images")) {
      fs.mkdirSync("images");
    }

    // Generate game cards
    const gameCards = generateGameCards(mainGames.games);
    const specialGamesHTML = generateSpecialGames(specialGames);
    const navigation = generateNavigation();

    // Generate sitemap
    await generateSitemap(mainGames.games);

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Play free HTML5 games online without downloads. Enjoy popular games like Retro Bowl, Basketball Legends, and more.">
  <meta name="keywords" content="HTML5 games, free games, online games, browser games, unblocked games">
  <title>Free HTML5 Games - Play Online Without Download</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="sitemap" type="application/xml" href="sitemap.xml">
</head>
<body>
  <header>
    <h1>Free HTML5 Games</h1>
    <p>Play amazing games right in your browser! No downloads, no registration required.</p>
    ${navigation}
  </header>

  <main>
    <div class="tabs-container">
      <div class="games-container">
        ${gameCards}
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
              (category) => `
            <li><a href="/categories/${category.slug}/">${category.name} Games</a></li>
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

    fs.writeFileSync("index.html", html);
    console.log("HTML and sitemap generated successfully!");
  } catch (error) {
    console.error("Error generating HTML:", error);
  }
}

generateHTML();
