const fs = require('fs');

const shopHtml = `
    <!-- Section 1: Fresh Arrivals Carousel -->
    <section class="section bg-cream" id="freshArrivalsSection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;">
          <h2 class="section-title">Fresh out the Roaster</h2>
          <p class="section-subtitle">The latest single-origin micro-lots, roasted within the last 48 hours.</p>
        </div>
        <div class="product-grid shop-gsap-fade">
          <div class="product-card">
            <div class="product-image-wrapper"><img src="assets/colombia.webp" alt="Roast"></div>
            <div class="product-info">
              <h3 class="product-title">Geisha Reserve</h3>
              <p class="product-roast" style="color:var(--color-copper);">Light Roast</p>
              <div class="product-price">₹1200</div>
            </div>
          </div>
          <div class="product-card">
            <div class="product-image-wrapper"><img src="assets/ethiopia.webp" alt="Roast"></div>
            <div class="product-info">
              <h3 class="product-title">Yirgacheffe Grade 1</h3>
              <p class="product-roast" style="color:var(--color-copper);">Medium Light</p>
              <div class="product-price">₹950</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Equipment Mastery -->
    <section class="section section-dark" id="equipmentSection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;">
          <h2 class="section-title text-cream">Brewing Equipment</h2>
          <p class="section-subtitle text-cream" style="opacity: 0.8">Professional grade gear for the home barista.</p>
        </div>
        <div class="product-grid shop-gsap-fade">
          <div class="product-card" style="background: var(--color-espresso); color: white; padding: 20px;">
            <h3 class="product-title" style="color: white;">Fellow Stagg EKG</h3>
            <div class="product-price">₹14000</div>
          </div>
          <div class="product-card" style="background: var(--color-espresso); color: white; padding: 20px;">
            <h3 class="product-title" style="color: white;">Comandante C40</h3>
            <div class="product-price">₹25000</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Coffee Subscriptions -->
    <section class="section bg-cream" id="subscriptionSection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;">
          <h2 class="section-title">Curated Subscriptions</h2>
          <p class="section-subtitle">Never run out of fresh coffee again.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;" class="shop-gsap-fade">
          <div style="background: white; padding: 40px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.1); text-align: center;">
            <h3>Explorer Tier</h3>
            <h2 style="color: var(--color-copper); margin: 20px 0;">₹800/mo</h2>
            <a href="404.html" class="btn btn-copper" style="width: 100%;">Subscribe</a>
          </div>
          <div style="background: var(--color-espresso); color: white; padding: 40px; border-radius: 16px; text-align: center; transform: scale(1.05);">
            <h3 style="color: white;">Connoisseur Tier</h3>
            <h2 style="color: var(--color-copper); margin: 20px 0;">₹1500/mo</h2>
            <a href="404.html" class="btn btn-copper" style="width: 100%;">Subscribe</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Merch & Apparel -->
    <section class="section" id="merchSection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;">
          <h2 class="section-title">Apparel & Merch</h2>
          <p class="section-subtitle">Wear your coffee passion.</p>
        </div>
        <div class="product-grid shop-gsap-fade">
          <div class="product-card" style="padding: 30px; text-align: center; background: var(--color-cream-soft);">
            <h3>Heavy Canvas Tote</h3>
            <p style="margin-top:10px;">₹600</p>
          </div>
          <div class="product-card" style="padding: 30px; text-align: center; background: var(--color-cream-soft);">
            <h3>Barista Apron</h3>
            <p style="margin-top:10px;">₹1800</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Brew Guides Promos -->
    <section class="section bg-cream" id="brewGuidesSection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;">
          <h2 class="section-title">Brewing Success</h2>
          <p class="section-subtitle">Check out our brew guides to get the most out of your gear.</p>
        </div>
        <div style="display: flex; justify-content: center;" class="shop-gsap-fade">
          <a href="404.html" class="btn btn-outline-copper">Read Guides</a>
        </div>
      </div>
    </section>
`;

const aboutHtml = `
    <!-- Section 1: Our Origin Story -->
    <section class="section" id="originSection">
      <div class="container">
        <div style="text-align: center; max-width: 800px; margin: 0 auto 50px;" class="about-gsap-fade">
          <span class="section-label" style="justify-content: center;"><i class="fa-solid fa-book-open"></i> Heritage</span>
          <h2 class="section-title">Our Origin Story</h2>
          <p class="section-subtitle">Founded in a small garage in 2012, our mission was simple: bring absolute transparency to every cup of coffee.</p>
        </div>
      </div>
    </section>

    <!-- Section 2: Meet the Master Roasters -->
    <section class="section section-dark" id="roastersSection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;" class="about-gsap-fade">
          <h2 class="section-title text-cream">Meet the Master Roasters</h2>
          <p class="section-subtitle text-cream" style="opacity: 0.8">The Q-Graders behind the flavor.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;" class="about-gsap-fade">
          <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 12px; text-align: center;">
            <div style="width: 100px; height: 100px; background: var(--color-copper); border-radius: 50%; margin: 0 auto 20px;"></div>
            <h3 style="color: white;">Elena Rossi</h3>
            <p style="color: var(--color-copper); font-size: 0.9rem;">Head Roaster</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 12px; text-align: center;">
            <div style="width: 100px; height: 100px; background: var(--color-copper); border-radius: 50%; margin: 0 auto 20px;"></div>
            <h3 style="color: white;">David Chen</h3>
            <p style="color: var(--color-copper); font-size: 0.9rem;">Licensed Q-Grader</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Sustainability & Fair Trade -->
    <section class="section bg-cream" id="sustainabilitySection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;" class="about-gsap-fade">
          <h2 class="section-title">Sustainability Promise</h2>
          <p class="section-subtitle">Zero waste, 100% direct trade.</p>
        </div>
        <div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;" class="about-gsap-fade">
          <div style="text-align: center; max-width: 200px;">
            <i class="fa-solid fa-leaf text-copper" style="font-size: 2rem; margin-bottom: 15px;"></i>
            <h3>Direct Trade</h3>
            <p style="font-size: 0.9rem; margin-top: 10px;">Paying 2.5x above fair trade baseline.</p>
          </div>
          <div style="text-align: center; max-width: 200px;">
            <i class="fa-solid fa-box text-copper" style="font-size: 2rem; margin-bottom: 15px;"></i>
            <h3>Compostable</h3>
            <p style="font-size: 0.9rem; margin-top: 10px;">Fully biodegradable packaging.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Roasting Facility Tour -->
    <section class="section" id="facilitySection">
      <div class="container" style="text-align: center;">
        <h2 class="section-title about-gsap-fade">Inside the Roastery</h2>
        <p class="section-subtitle about-gsap-fade" style="max-width: 600px; margin: 0 auto 40px;">State-of-the-art Loring S7 Nighthawk roasting to precision.</p>
        <div style="background: var(--color-cream-soft); padding: 60px; border-radius: 16px; margin: 0 auto; max-width: 800px;" class="about-gsap-fade">
          <h3>Facility Tour Video Placeholder</h3>
        </div>
      </div>
    </section>

    <!-- Section 5: Community Impact -->
    <section class="section bg-cream" id="communitySection">
      <div class="container" style="text-align: center;">
        <h2 class="section-title about-gsap-fade">Community Impact</h2>
        <p class="section-subtitle about-gsap-fade" style="max-width: 600px; margin: 0 auto 30px;">1% of all revenue funds water purification in partner origins.</p>
        <a href="404.html" class="btn btn-copper about-gsap-fade">Read the Report</a>
      </div>
    </section>
`;

const contactHtml = `
    <!-- Section 1: Global Flagships -->
    <section class="section bg-cream" id="flagshipSection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;">
          <h2 class="section-title contact-gsap-fade">Global Flagship Locations</h2>
          <p class="section-subtitle contact-gsap-fade">Come sip with us.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;" class="contact-gsap-fade">
          <div style="background: white; padding: 30px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.1);">
            <h3 style="color: var(--color-espresso);">New York</h3>
            <p style="margin: 10px 0; font-size: 0.9rem;">123 Roaster Ave, Brooklyn, NY</p>
            <p style="color: var(--color-copper); font-size: 0.9rem;">Open 7AM - 6PM</p>
          </div>
          <div style="background: white; padding: 30px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.1);">
            <h3 style="color: var(--color-espresso);">Tokyo</h3>
            <p style="margin: 10px 0; font-size: 0.9rem;">45 Omotesando, Shibuya</p>
            <p style="color: var(--color-copper); font-size: 0.9rem;">Open 8AM - 8PM</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Interactive FAQ Accordion -->
    <section class="section" id="faqSection">
      <div class="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 50px;">
          <h2 class="section-title contact-gsap-fade">Frequently Asked Questions</h2>
        </div>
        <div style="max-width: 700px; margin: 0 auto;" class="contact-gsap-fade">
          <div style="padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.1);">
            <h3 style="font-size: 1.1rem; color: var(--color-espresso);">How fresh is the coffee?</h3>
            <p style="font-size: 0.9rem; margin-top: 10px; color: #666;">We roast to order. Your coffee is roasted within 24 hours of shipping.</p>
          </div>
          <div style="padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.1);">
            <h3 style="font-size: 1.1rem; color: var(--color-espresso);">Do you ship internationally?</h3>
            <p style="font-size: 0.9rem; margin-top: 10px; color: #666;">Yes, we offer global shipping via DHL Express.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Wholesale Inquiries -->
    <section class="section section-dark" id="wholesaleSection">
      <div class="container" style="text-align: center;">
        <h2 class="section-title text-cream contact-gsap-fade">Wholesale Partnerships</h2>
        <p class="section-subtitle text-cream contact-gsap-fade" style="opacity: 0.8; max-width: 600px; margin: 0 auto 30px;">Serve STACKLY coffee at your cafe, restaurant, or office.</p>
        <a href="404.html" class="btn btn-copper contact-gsap-fade">Apply for Wholesale</a>
      </div>
    </section>

    <!-- Section 4: Careers -->
    <section class="section" id="careersSection">
      <div class="container" style="text-align: center;">
        <h2 class="section-title contact-gsap-fade">Join the Crew</h2>
        <p class="section-subtitle contact-gsap-fade" style="max-width: 600px; margin: 0 auto 30px;">We are always looking for passionate baristas and roasters.</p>
        <a href="404.html" class="btn btn-outline-copper contact-gsap-fade">View Openings</a>
      </div>
    </section>

    <!-- Section 5: Social Media Wall -->
    <section class="section bg-cream" id="socialSection">
      <div class="container" style="text-align: center;">
        <h2 class="section-title contact-gsap-fade">@STACKLYCOFFEE</h2>
        <p class="section-subtitle contact-gsap-fade" style="max-width: 600px; margin: 0 auto 30px;">Follow our journey on Instagram.</p>
        <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;" class="contact-gsap-fade">
          <div style="width: 150px; height: 150px; background: #ddd; border-radius: 8px;"></div>
          <div style="width: 150px; height: 150px; background: #ddd; border-radius: 8px;"></div>
          <div style="width: 150px; height: 150px; background: #ddd; border-radius: 8px;"></div>
          <div style="width: 150px; height: 150px; background: #ddd; border-radius: 8px;"></div>
        </div>
      </div>
    </section>
`;

function inject(file, html) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('<!-- Footer -->', html + '\\n  <!-- Footer -->');
  fs.writeFileSync(file, content);
  console.log('Injected ' + file);
}

inject('Shop.html', shopHtml);
inject('About.html', aboutHtml);
inject('Contact.html', contactHtml);
