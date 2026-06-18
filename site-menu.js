const projects = [
  { label: "Home", href: "index.html" },
  { label: "01 Aquarius", href: "Week folders/WK 2/index.html" },
  { label: "02 Emograms", href: "Week folders/WK 3/index.html" },
  { label: "03 Twist And Swirl", href: "Week folders/WK 4/index.html" },
  { label: "04 Egg Star", href: "Week folders/WK 5/index.html" },
  { label: "05 Juice!", href: "Week folders/WK 6/index.html" },
  { label: "06 Ring Toss", href: "Week folders/WK 7/index.html" },
  { label: "07 Finderscope", href: "Week folders/WK 8/index.html" },
  { label: "08 Letter Scramble", href: "Week folders/WK 9/index.html" },
  { label: "09 Elastify", href: "Week folders/WK 10/index.html" },
  { label: "10 Ultrasonic", href: "Week folders/WK 11/index.html" },
  { label: "12 cctv", href: "Week folders/WK 13/index.html" },
  { label: "13 Cookie Deco", href: "Week folders/WK 14/index.html" },
];

const currentScript = document.currentScript;
const basePath = currentScript?.dataset.base ?? "";
const button = document.createElement("button");
const panel = document.createElement("nav");

button.className = "site-menu-button";
button.type = "button";
button.setAttribute("aria-expanded", "false");
button.setAttribute("aria-controls", "site-project-panel");
button.setAttribute("aria-label", "Open project menu");
button.innerHTML = "<span></span><span></span><span></span>";

panel.id = "site-project-panel";
panel.className = "site-project-panel";
panel.setAttribute("aria-label", "Project links");
panel.setAttribute("aria-hidden", "true");

projects.forEach(({ label, href }) => {
  const link = document.createElement("a");

  link.className = "site-project-link";
  link.href = `${basePath}${href}`;
  link.tabIndex = -1;
  link.textContent = label;

  panel.appendChild(link);
});

button.addEventListener("click", () => {
  const isOpen = panel.classList.toggle("is-open");

  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", isOpen ? "Close project menu" : "Open project menu");
  panel.setAttribute("aria-hidden", String(!isOpen));

  panel.querySelectorAll(".site-project-link").forEach((link) => {
    link.tabIndex = isOpen ? 0 : -1;
  });
});

document.body.append(button, panel);
