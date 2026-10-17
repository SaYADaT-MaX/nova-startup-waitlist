const page = document.body.dataset.page || "home";
const navItems = [
  ["Home","index.html","home"],
  ["Product","product.html","product"],
  ["About","about.html","about"],
  ["FAQ","faq.html","faq"],
  ["Contact","contact.html","contact"]
];
const header = document.getElementById("site-header");
if (header) {
  header.innerHTML = `
    <header class="site-header"><div class="container nav-wrap">
      <a class="brand" href="index.html" aria-label="Nova home"><span class="brand-mark">n.</span><span>nova<span class="brand-period">.</span></span></a>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
      <nav class="main-nav" aria-label="Main navigation">${navItems.map(([label,url,key])=>`<a href="${url}" ${page===key?'aria-current="page"':''}>${label}</a>`).join("")}</nav>
      <a class="btn btn-small btn-primary nav-cta" href="waitlist.html">Join waitlist <span>↗</span></a>
    </div></header>`;
  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("nav-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("nav-open"); toggle.setAttribute("aria-expanded","false");
    document.body.classList.remove("menu-open");
  }));
}
const footer = document.getElementById("site-footer");
if (footer) {
  footer.innerHTML = `<footer class="site-footer"><div class="container footer-main">
    <div class="footer-brand-col"><a class="brand brand-footer" href="index.html"><span class="brand-mark">n.</span><span>nova<span class="brand-period">.</span></span></a><p>Make room for what’s next.<br>A little more focus, a lot more momentum.</p><span class="footer-note">A fictional startup concept made for a portfolio.</span></div>
    <div class="footer-links"><strong>Explore</strong><a href="product.html">Product</a><a href="about.html">About Nova</a><a href="faq.html">FAQ</a></div>
    <div class="footer-links"><strong>Get in touch</strong><a href="waitlist.html">Join waitlist</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy policy</a></div>
    <div class="footer-news"><span class="eyebrow">THE NEXT GOOD THING</span><h3>Get on the list.</h3><p>Be the first to hear what’s coming.</p><a class="footer-signup" href="waitlist.html">Join the waitlist <span>↗</span></a></div>
  </div><div class="container footer-bottom"><span>© 2026 Nova Studio. Concept project.</span><span>Made with intention <b>✳</b></span></div></footer>`;
}
function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
const waitlistForm = document.getElementById("waitlist-form");
if (waitlistForm) {
  waitlistForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = waitlistForm.elements.name.value.trim();
    const email = waitlistForm.elements.email.value.trim();
    const role = waitlistForm.elements.role.value;
    const consent = document.getElementById("updates").checked;
    const msg = document.getElementById("form-message");
    if (name.length < 2) return showMessage(msg, "Please enter your name (at least 2 characters).", false);
    if (!validateEmail(email)) return showMessage(msg, "Please enter a valid email address.", false);
    if (!role) return showMessage(msg, "Please choose the option that best describes you.", false);
    if (!consent) return showMessage(msg, "Please agree to receive early-access updates.", false);
    showMessage(msg, `You're on the demo list, ${name.split(" ")[0]}! This preview does not send or save your details. Connect a form service before launch.`, true);
    waitlistForm.reset();
  });
}
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();
    const topic = contactForm.elements.topic.value;
    const msg = document.getElementById("contact-message");
    if (name.length < 2) return showMessage(msg, "Please enter your name.", false);
    if (!validateEmail(email)) return showMessage(msg, "Please enter a valid email address.", false);
    if (!topic) return showMessage(msg, "Please choose a topic.", false);
    if (message.length < 10) return showMessage(msg, "Please write a little more (at least 10 characters).", false);
    showMessage(msg, `Thanks, ${name.split(" ")[0]}! Your demo message has been checked, but not sent. Connect a backend or form service to receive messages.`, true);
    contactForm.reset();
  });
}
function showMessage(el, text, success) {
  if (!el) return;
  el.textContent = text;
  el.className = `form-message ${success ? "message-success" : "message-error"}`;
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:"smooth",block:"start"}); }
  });
});