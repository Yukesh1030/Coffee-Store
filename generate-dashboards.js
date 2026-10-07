const fs = require('fs');

const adminHTML = fs.readFileSync('AdminDashboard.html', 'utf8');

// The common sidebar menu replacement logic
function getSidebar(activePage) {
  return `      <nav class="sidebar-menu">
        <a href="AdminDashboard.html" class="sidebar-link ${activePage === 'Overview' ? 'active' : ''}"><i class="fa-solid fa-chart-pie"></i> Overview</a>
        <a href="Products.html" class="sidebar-link ${activePage === 'Products' ? 'active' : ''}"><i class="fa-solid fa-box-archive"></i> Products (86)</a>
        <a href="Orders.html" class="sidebar-link ${activePage === 'Orders' ? 'active' : ''}"><i class="fa-solid fa-cart-flatbed"></i> Orders (18)</a>
        <a href="Customers.html" class="sidebar-link ${activePage === 'Customers' ? 'active' : ''}"><i class="fa-solid fa-users"></i> Customers</a>
        <a href="RoastBatches.html" class="sidebar-link ${activePage === 'RoastBatches' ? 'active' : ''}"><i class="fa-solid fa-fire-burner"></i> Roast Batches</a>
        <a href="StoreSettings.html" class="sidebar-link ${activePage === 'StoreSettings' ? 'active' : ''}"><i class="fa-solid fa-gear"></i> Store Settings</a>
        <a href="Login.html" class="sidebar-link" style="color: #ef4444;"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</a>
      </nav>
      <div style="padding-top: 20px; border-top: 1px solid var(--color-espresso-border);">
        <a href="index.html" class="sidebar-link"><i class="fa-solid fa-globe"></i> View Website</a>
      </div>
    </aside>`;
}

const pages = [
  {
    name: 'Products',
    title: 'Product Inventory',
    filename: 'Products.html',
    sections: `
      <!-- 1. Inventory Table -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Active Inventory</h2>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--color-espresso-border);">
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">PRODUCT</th>
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">SKU</th>
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">PRICE</th>
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">STOCK</th>
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--color-espresso-border);">
                <td style="padding: 12px; font-weight: 600;">Midnight Roast</td>
                <td style="padding: 12px; font-size: 0.85rem;">MR-500-WB</td>
                <td style="padding: 12px;">₹720</td>
                <td style="padding: 12px;"><span style="background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">124 in stock</span></td>
                <td style="padding: 12px;"><a href="#" style="color: var(--color-copper); font-size: 0.85rem;">Edit</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. Add New Product Form -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Add New Origin</h2>
        <form style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div><label style="display: block; font-size: 0.8rem; margin-bottom: 6px;">Bean Name</label><input type="text" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;"></div>
          <div><label style="display: block; font-size: 0.8rem; margin-bottom: 6px;">Roast Level</label><select style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;"><option>Light</option><option>Medium</option><option>Dark</option></select></div>
          <div style="grid-column: 1 / -1;"><button class="btn btn-copper">Save Product</button></div>
        </form>
      </section>

      <!-- 3. Inventory Alerts -->
      <section class="dashboard-section gsap-dash-element" style="background: #fffef0; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #fde047;">
        <h2 style="font-size: 1.4rem; color: #854d0e; margin-bottom: 16px;"><i class="fa-solid fa-triangle-exclamation"></i> Low Stock Alerts</h2>
        <p style="font-size: 0.9rem; color: #713f12; margin-bottom: 8px;"><strong>Ethiopia Yirgacheffe:</strong> Only 4 bags left.</p>
        <p style="font-size: 0.9rem; color: #713f12;"><strong>Colombia Supremo:</strong> Only 8 bags left.</p>
      </section>

      <!-- 4. Categories -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Categories & Tags</h2>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <span style="background: var(--color-cream); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem;">Single Origin <i class="fa-solid fa-xmark"></i></span>
          <span style="background: var(--color-cream); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem;">Blends <i class="fa-solid fa-xmark"></i></span>
          <span style="background: var(--color-cream); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem;">Decaf <i class="fa-solid fa-xmark"></i></span>
          <button style="border: 1px dashed var(--color-copper); background: transparent; padding: 6px 12px; border-radius: 20px; color: var(--color-copper); cursor: pointer;">+ Add Tag</button>
        </div>
      </section>

      <!-- 5. Pricing Strategies -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Wholesale Pricing Rules</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 12px;">Active rules applied to B2B customers.</p>
        <ul style="font-size: 0.9rem; padding-left: 20px;">
          <li>Orders over 5kg: 15% discount.</li>
          <li>Orders over 10kg: 25% discount.</li>
        </ul>
      </section>
    `
  },
  {
    name: 'Orders',
    title: 'Order Management',
    filename: 'Orders.html',
    sections: `
      <!-- 1. Live Queue -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Live Queue</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px;"><h3 style="font-size: 0.9rem; color: #475569;">To Roast (4)</h3></div>
          <div style="background: #f0fdf4; padding: 16px; border-radius: 8px;"><h3 style="font-size: 0.9rem; color: #166534;">To Pack (12)</h3></div>
          <div style="background: #eff6ff; padding: 16px; border-radius: 8px;"><h3 style="font-size: 0.9rem; color: #1e3a8a;">Ready to Ship (2)</h3></div>
        </div>
      </section>
      
      <!-- 2. Dispatch -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Dispatch Integrations</h2>
        <button class="btn btn-copper">Sync with BlueDart</button>
        <button class="btn" style="background: #ddd; color: #333;">Sync with Delhivery</button>
      </section>

      <!-- 3. Order Search -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Find Order</h2>
        <input type="text" placeholder="Search by ID or Email..." style="width: 100%; max-width: 400px; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
      </section>

      <!-- 4. Returns -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Returns & Exceptions</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">No active returns or delivery exceptions today.</p>
      </section>

      <!-- 5. Packaging -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Packaging Stock</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">250g Pouches: 450 units left</p>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">500g Pouches: 120 units left</p>
      </section>
    `
  },
  {
    name: 'Customers',
    title: 'Customer Management',
    filename: 'Customers.html',
    sections: `
      <!-- 1. Directory -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Customer Directory</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Viewing 1,245 active customers.</p>
      </section>
      
      <!-- 2. VIP Club -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">STACKLY Club Subscriptions</h2>
        <div style="font-size: 1.2rem; font-weight: bold; color: var(--color-copper);">342 Active Subscribers</div>
      </section>

      <!-- 3. Support -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Support Tickets</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">2 pending inquiries regarding brewing methods.</p>
      </section>

      <!-- 4. Loyalty -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Loyalty Program</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Reward ratio: 1 Point = ₹1 spent.</p>
      </section>

      <!-- 5. Segments -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Audience Segments</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Espresso lovers: 45% | Pour-over fans: 30%</p>
      </section>
    `
  },
  {
    name: 'RoastBatches',
    title: 'Roastery Operations',
    filename: 'RoastBatches.html',
    sections: `
      <!-- 1. Telemetry -->
      <section class="dashboard-section gsap-dash-element" style="background: #111; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
        <h2 style="font-size: 1.4rem; color: #fff; margin-bottom: 16px;">Live Loring S7 Telemetry</h2>
        <div style="height: 150px; border-bottom: 1px dashed #333; display: flex; align-items: flex-end; gap: 4px;">
          <div style="width: 10%; height: 20%; background: var(--color-copper);"></div>
          <div style="width: 10%; height: 40%; background: var(--color-copper);"></div>
          <div style="width: 10%; height: 70%; background: var(--color-copper);"></div>
          <div style="width: 10%; height: 90%; background: #ef4444;"></div>
        </div>
      </section>
      
      <!-- 2. Schedule -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Today's Roast Plan</h2>
        <p style="font-size: 0.9rem;">10:00 AM - Midnight Roast (20kg)</p>
        <p style="font-size: 0.9rem;">01:00 PM - Artisan Blend (15kg)</p>
      </section>

      <!-- 3. QC -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Cupping Scores</h2>
        <p style="font-size: 0.9rem;">Batch #8892: Score 86.5 (Passed)</p>
      </section>

      <!-- 4. Green Bean -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Green Bean Silo Levels</h2>
        <p style="font-size: 0.9rem;">Silo A (Ethiopia): 120kg</p>
        <p style="font-size: 0.9rem;">Silo B (Colombia): 85kg</p>
      </section>

      <!-- 5. Maintenance -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Machine Maintenance</h2>
        <p style="font-size: 0.9rem; color: #ef4444;"><i class="fa-solid fa-wrench"></i> Drum cleaning due in 2 days.</p>
      </section>
    `
  },
  {
    name: 'StoreSettings',
    title: 'Store Settings',
    filename: 'StoreSettings.html',
    sections: `
      <!-- 1. Profile -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Store Profile</h2>
        <input type="text" value="STACKLY COFFEE" style="padding: 10px; width: 100%; max-width: 300px; border: 1px solid #ddd;">
      </section>
      
      <!-- 2. Payments -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Payment Gateways</h2>
        <label style="display: flex; gap: 10px;"><input type="checkbox" checked> Stripe</label>
        <label style="display: flex; gap: 10px; margin-top: 8px;"><input type="checkbox" checked> Razorpay</label>
      </section>

      <!-- 3. Shipping -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Shipping Zones</h2>
        <p style="font-size: 0.9rem;">Domestic: Flat ₹50 (Free over ₹1000)</p>
      </section>

      <!-- 4. Staff -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Staff Permissions</h2>
        <ul style="padding-left: 20px;">
          <li>Yukesh (Admin)</li>
          <li>John (Roaster)</li>
        </ul>
      </section>

      <!-- 5. Integrations -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">API & Webhooks</h2>
        <button class="btn btn-copper">Generate API Key</button>
      </section>
    `
  }
];

const gsapScript = '<script>\n' +
  '  document.addEventListener("DOMContentLoaded", () => {\n' +
  '    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {\n' +
  '      gsap.registerPlugin(ScrollTrigger);\n' +
  '      gsap.utils.toArray(".gsap-dash-element").forEach((el, i) => {\n' +
  '        gsap.from(el, {\n' +
  '          scrollTrigger: {\n' +
  '            trigger: el,\n' +
  '            start: "top 85%",\n' +
  '            toggleActions: "play none none reverse"\n' +
  '          },\n' +
  '          y: 40,\n' +
  '          opacity: 0,\n' +
  '          duration: 0.6,\n' +
  '          ease: "power2.out",\n' +
  '          delay: i * 0.05\n' +
  '        });\n' +
  '      });\n' +
  '    }\n' +
  '  });\n' +
  '</script>';

const beforeNav = adminHTML.substring(0, adminHTML.indexOf('<nav class="sidebar-menu">'));
// We find where the sidebar ends to capture everything after it
const afterAsideIndex = adminHTML.indexOf('</aside>') + 8;
const afterNav = adminHTML.substring(afterAsideIndex);

const beforeMainHeader = afterNav.substring(0, afterNav.indexOf('</header>') + 9);
const afterMain = afterNav.substring(afterNav.indexOf('</main>'));
const htmlEnd = afterMain.substring(afterMain.indexOf('<script'));

// 1. Update AdminDashboard.html to have the correct sidebar links (including the bottom div)
let newAdminHTML = beforeNav + getSidebar('Overview') + afterNav;
fs.writeFileSync('AdminDashboard.html', newAdminHTML);
console.log('Updated AdminDashboard.html');

// 2. Generate the 5 new pages
pages.forEach(page => {
  let customHeader = beforeMainHeader.replace('Admin Overview', page.title);
  
  let newPageHTML = beforeNav + getSidebar(page.name) + customHeader + 
    '\n\n      <!-- Dynamic Sections -->\n      <div style="display: flex; flex-direction: column; gap: 0;">\n' + 
    page.sections + 
    '\n      </div>\n' + 
    '    </main>\n  </div>\n\n' +
    '  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n' +
    '  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n' +
    htmlEnd.replace('</body>', gsapScript + '\n</body>');
  
  fs.writeFileSync(page.filename, newPageHTML);
  console.log('Created ' + page.filename);
});
