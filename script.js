let allGames = [];
let specialGames = [];

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("gamesContainer");
  container.innerHTML = '<div class="loading">Loading games...</div>';

  try {
    // Load main games
    const response = await fetch("https://pub.gamezop.com/v3/games?id=10431");
    const data = await response.json();
    allGames = data.games;
    displayGames(allGames);
    setupTabs();

    // Load special games
    const specialResponse = await fetch(
      "https://retrobowlclick.github.io/data.json"
    );
    specialGames = await specialResponse.json();
    displaySpecialGames();
    setupMenuToggle();
  } catch (error) {
    console.error("Error fetching games:", error);
    container.innerHTML =
      '<p class="error">Failed to load games. Please try again later.</p>';
  }
});

function setupMenuToggle() {
  const menuButton = document.getElementById("menuButton");
  const specialGamesMenu = document.getElementById("specialGamesMenu");

  menuButton.addEventListener("click", () => {
    specialGamesMenu.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!specialGamesMenu.contains(e.target) && e.target !== menuButton) {
      specialGamesMenu.classList.remove("active");
    }
  });
}

function displaySpecialGames() {
  const container = document.getElementById("specialGamesList");

  container.innerHTML = specialGames
    .map(
      (game) => `
    <div class="special-game-item" onclick="window.open('${game.link}', '_blank')">
      <img src="${game.thumb}" alt="${game.name}">
      <div class="special-game-info">
        <div class="special-game-title">${game.name}</div>
        <div class="special-game-description">${game.description}</div>
      </div>
    </div>
  `
    )
    .join("");
}

function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const category = button.dataset.category;
      filterGames(category);
    });
  });
}

function filterGames(category) {
  const container = document.getElementById("gamesContainer");
  container.innerHTML = '<div class="loading">Loading games...</div>';

  setTimeout(() => {
    if (category === "all") {
      displayGames(allGames);
      return;
    }

    const filteredGames = allGames.filter((game) =>
      game.categories.en.includes(category)
    );

    displayGames(filteredGames);
  }, 300); // Small delay for better UX
}

function displayGames(games) {
  const container = document.getElementById("gamesContainer");

  if (games.length === 0) {
    container.innerHTML =
      '<p class="no-games">No games found in this category.</p>';
    return;
  }

  container.innerHTML = games
    .map(
      (game) => `
        <div class="game-card">
            <img src="${game.assets.cover}" alt="${
        game.name.en
      }" class="game-image">
            <div class="game-info">
                <h2 class="game-title">${game.name.en}</h2>
                <p class="game-description">${game.description.en}</p>
                <div class="game-meta">
                    <span class="plays">Plays: ${formatNumber(
                      game.gamePlays
                    )}</span>
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
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function formatRating(rating) {
  if (!rating) return "N/A";
  return rating.toFixed(1) + "/5";
}
