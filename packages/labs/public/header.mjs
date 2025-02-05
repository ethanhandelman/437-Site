import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");

class NavBar extends HTMLElement {
  constructor() {
    super();
    // Get current page filename.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Define the template markup with CSS and HTML.
    TEMPLATE.innerHTML = `
      <nav aria-label="Main navigation">
        <style>
          /* Default styles: horizontal layout */
          nav a[aria-current="page"] {
            font-weight: bold;
          }
          nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
          }
          nav li {
            margin-right: 1rem;
          }
          /* Hide the menu toggle button on larger screens */
          nav .menu-toggle {
            display: none;
          }
          
          /* Mobile styles: for viewports less than 600px */
          @media (max-width: 600px) {
            /* Hide the nav links by default and stack vertically */
            nav ul {
              display: none;
              flex-direction: column;
              margin-top: 0.5rem;
            }
            nav li {
              margin: 0.5rem 0;
            }
            /* Show the menu button */
            nav .menu-toggle {
              display: block;
              background: none;
              border: 1px solid #ccc;
              padding: 0.5rem;
              margin-bottom: 0.25rem;
              font-size: 1rem;
              cursor: pointer;
            }
            /* When the nav element has an "open" class, display the links */
            nav.open ul {
              display: flex;
            }
          }
        </style>
        <!-- The menu button appears only on mobile (via CSS) -->
        <button class="menu-toggle">Menu</button>
        <ul>
          <li>
            <a href="index.html" ${currentPage === "index.html" ? 'aria-current="page"' : ""}>Home</a>
          </li>
          <li>
            <a href="gallery.html" ${currentPage === "gallery.html" ? 'aria-current="page"' : ""}>Gallery</a>
          </li>
        </ul>
      </nav>
    `;

    // Bind the document click handler for later removal.
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  connectedCallback() {
    // Attach the shadow DOM using the correct TEMPLATE variable.
    const shadowRoot = attachShadow(this, TEMPLATE);

    // Get references to the menu button and nav element.
    const menuButton = shadowRoot.querySelector(".menu-toggle");
    const navElement = shadowRoot.querySelector("nav");

    if (menuButton && navElement) {
      // Toggle the "open" class on the nav element when the menu button is clicked.
      menuButton.addEventListener("click", () => {
        navElement.classList.toggle("open");
      });
    }

    // Listen for clicks anywhere in the document.
    document.addEventListener("click", this.handleDocumentClick);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  /**
   * Closes the menu if the click occurred outside of this nav bar on mobile.
   */
  handleDocumentClick(event) {
    if (window.innerWidth < 600) {
      // event.composedPath() includes nodes from the shadow DOM.
      if (!event.composedPath().includes(this)) {
        const navElement = this.shadowRoot.querySelector("nav");
        if (navElement && navElement.classList.contains("open")) {
          navElement.classList.remove("open");
        }
      }
    }
  }
}

customElements.define("nav-bar", NavBar);
