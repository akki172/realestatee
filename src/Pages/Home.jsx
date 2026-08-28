import { Link } from "react-router-dom";
import "../css/Home.css";

const PROPERTIES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    status: "For sale",
    price: "₹1.85 Cr",
    name: "The Birchwood Villa",
    location: "Benz Circle, Vijayawada",
    beds: "4 bd",
    area: "3,200 sqft",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
    status: "For rent",
    price: "₹28,000/mo",
    name: "Maple Court Residency",
    location: "Gachibowli, Hyderabad",
    beds: "2 bd",
    area: "1,150 sqft",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
    status: "For sale",
    price: "₹92 L",
    name: "Cedar Garden House",
    location: "Whitefield, Bengaluru",
    beds: "3 bd",
    area: "1,840 sqft",
  },
];

const STEPS = [
  {
    mark: "01 — find",
    title: "Search and shortlist",
    body: "Filter by location, budget, and the details that actually matter to you.",
  },
  {
    mark: "02 — visit",
    title: "Book a visit",
    body: "Schedule an in-person or virtual walkthrough at a time that suits you.",
  },
  {
    mark: "03 — agree",
    title: "Negotiate terms",
    body: "Your agent handles paperwork, pricing, and the back-and-forth.",
  },
  {
    mark: "04 — move",
    title: "Get your keys",
    body: "Final signatures, handover, and a welcome kit for your new place.",
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=700&q=80",
    date: "12 June 2026",
    title: "Five questions to ask before any home visit",
    excerpt:
      "A short checklist that's saved our clients from a dozen costly surprises.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=700&q=80",
    date: "29 May 2026",
    title: "Understanding loan pre-approval in under 10 minutes",
    excerpt: "What lenders actually check, and how to get ahead of it.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=700&q=80",
    date: "3 May 2026",
    title: "Renting vs buying in 2026: what's actually changed",
    excerpt: "A grounded look at the numbers behind this year's market shift.",
  },
];

function Home() {
  return (
    <div className="dl-page">
      <header className="site-nav">
        <div className="wrap nav-inner">
          <div className="logo">
            DOM
            <b>LEA</b>
          </div>
          <nav className="nav-links">
            <a href="#properties">Properties</a>
            <a href="#about">About</a>
            <a href="#blog">Journal</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-right">
            <Link to="/login">Log in</Link>
            <Link to="/register" className="btn-line">
              Register
            </Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <img
          className="hero-photo"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80"
          alt="A modern home set in an open field under a clear sky"
        />
        <div className="grid-overlay">
          <div className="v" style={{ left: "8%" }} />
          <div className="v" style={{ left: "50%" }} />
          <div className="v" style={{ left: "92%" }} />
          <div className="h" style={{ top: "14%" }} />
          <div className="circle" style={{ width: 280, height: 280, left: -90, top: "8%" }} />
          <div className="circle" style={{ width: 420, height: 420, left: 60, top: "24%" }} />
        </div>

        <div className="hero-content">
          <div className="hero-grid">
            <p className="hero-caption">
              Discover curated homes in prime locations with a seamless buying and renting
              experience.
            </p>
            <div>
              <h1 className="serif hero-headline">
                Homes That Match
                <br />
                Your Pace, Not Just
                <br />
                Your Budget.
              </h1>
              <a href="#properties" className="paren-link hero-cta">
                (Explore Properties)
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap search-bar">
        <div className="search-card">
          <div className="search-field">
            <label>Location</label>
            <select>
              <option>Vijayawada, AP</option>
              <option>Hyderabad, TS</option>
              <option>Bengaluru, KA</option>
              <option>Chennai, TN</option>
            </select>
          </div>
          <div className="search-field">
            <label>Property type</label>
            <select>
              <option>Villa</option>
              <option>Apartment</option>
              <option>Independent house</option>
              <option>Plot</option>
            </select>
          </div>
          <div className="search-field">
            <label>Budget</label>
            <select>
              <option>Under ₹50L</option>
              <option>₹50L – ₹1Cr</option>
              <option>₹1Cr – ₹2Cr</option>
              <option>Above ₹2Cr</option>
            </select>
          </div>
          <div className="search-field">
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>

      <section id="properties">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured listings</p>
              <h2 className="serif section-title">
                A short list of homes worth a second look.
              </h2>
            </div>
            <a href="#" className="paren-link">
              (View all properties)
            </a>
          </div>

          <div className="prop-grid">
            {PROPERTIES.map((p) => (
              <div className="prop-card" key={p.id}>
                <div className="prop-photo-wrap">
                  <img src={p.image} alt={p.name} />
                  <div className="tag-mark">
                    <span className="dot" />
                    {p.status}
                  </div>
                  <div className="price-mark mono">{p.price}</div>
                </div>
                <div className="prop-meta">
                  <div>
                    <div className="prop-name">{p.name}</div>
                    <div className="prop-loc">{p.location}</div>
                  </div>
                  <div className="prop-specs mono">
                    {p.beds}
                    <br />
                    {p.area}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="wrap about-grid">
          <div>
            <p className="eyebrow">About Dom/Lea</p>
            <h2 className="serif about-title">
              We built the agency we wished existed when we bought our first home.
            </h2>
            <p className="about-body">
              Dom/Lea pairs a small, attentive team of agents with a catalogue built around real
              fit — light, layout, commute, and budget — rather than listing volume. Every home
              on the platform is visited and verified before it goes live.
            </p>
            <div className="stat-row">
              <div>
                <div className="stat-num serif">1,200+</div>
                <div className="stat-label">Homes placed</div>
              </div>
              <div>
                <div className="stat-num serif">14</div>
                <div className="stat-label">Cities covered</div>
              </div>
              <div>
                <div className="stat-num serif">4.9</div>
                <div className="stat-label">Average rating</div>
              </div>
            </div>
          </div>
          <div className="about-photo">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80"
              alt="Agent reviewing house keys with a client"
            />
            <div className="frame-circle" />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="serif section-title">From search to keys, in four steps.</h2>
            </div>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.mark}>
                <span className="step-mark mono">{s.mark}</span>
                <div className="step-title">{s.title}</div>
                <p className="step-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Journal</p>
              <h2 className="serif section-title">
                Notes on buying, renting, and living well.
              </h2>
            </div>
            <a href="#" className="paren-link">
              (Read the journal)
            </a>
          </div>
          <div className="blog-grid">
            {BLOG_POSTS.map((post) => (
              <div className="blog-card" key={post.id}>
                <img src={post.image} alt={post.title} />
                <span className="blog-date">{post.date}</span>
                <div className="blog-title">{post.title}</div>
                <p className="blog-excerpt">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap contact-grid">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="serif contact-title">Tell us what you're looking for.</h2>
            <p className="about-body" style={{ color: "#6b6a63" }}>
              Drop a few lines about your move and an agent will reach out within one business
              day.
            </p>
            <div className="contact-info">
              <div className="row">
                <span>Email</span>
                <span>hello@domlea.com</span>
              </div>
              <div className="row">
                <span>Phone</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="row">
                <span>Office</span>
                <span>Benz Circle, Vijayawada, Andhra Pradesh</span>
              </div>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks — we will be in touch shortly.");
            }}
          >
            <div className="form-row">
              <div className="field">
                <label>First name</label>
                <input type="text" required />
              </div>
              <div className="field">
                <label>Last name</label>
                <input type="text" required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="field">
                <label>Phone</label>
                <input type="tel" />
              </div>
            </div>
            <div className="field">
              <label>What are you looking for?</label>
              <textarea rows={4} />
            </div>
            <button className="submit-btn" type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>

      <footer className="dl-footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <div className="footer-logo">DOM/LEA</div>
              <p className="footer-tag">
                A small agency for people who'd rather find the right home than the fastest one.
              </p>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              <a href="#properties">Properties</a>
              <a href="#about">About</a>
              <a href="#blog">Journal</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Account</h4>
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </div>
            <div className="footer-col">
              <h4>Follow</h4>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter / X</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Dom/Lea Real Estate</span>
            <span>Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default  Home;
