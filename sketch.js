const weekFolders = [
  "WK 2",
  "WK 4",
  "WK 5",
  "WK 6",
  "WK 7",
  "WK 8",
  "WK 9",
  "WK 10",
  "WK 11",
  "WK 12",
  "WK 13",
  "WK 14",
];

const patternBoard = document.querySelector(".pattern-board");
const menuButton = document.querySelector(".menu-button");
const weekGrid = document.querySelector("#week-grid");

weekFolders.forEach((folderName) => {
  const weekLink = document.createElement("a");

  weekLink.className = "week-link";
  weekLink.href = `Week folders/${encodeURIComponent(folderName)}/index.html`;
  weekLink.tabIndex = -1;
  weekLink.textContent = folderName;

  weekGrid.appendChild(weekLink);
});

menuButton.addEventListener("click", () => {
  const isOpen = patternBoard.classList.toggle("is-open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close week menu" : "Open week menu");

  weekGrid.querySelectorAll(".week-link").forEach((weekLink) => {
    weekLink.tabIndex = isOpen ? 0 : -1;
  });
});
