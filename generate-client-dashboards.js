const fs = require('fs');

const clientHTML = fs.readFileSync('ClientDashboard.html', 'utf8');

function getSidebar(activePage) {
  return `      <nav class="sidebar-menu">
        <a href="ClientDashboard.html" class="sidebar-link ${activePage === 'Overview' ? 'active' : ''}"><i class="fa-solid fa-house-chimney"></i> Dashboard</a>
        <a href="ClientOrders.html" class="sidebar-link ${activePage === 'Orders' ? 'active' : ''}"><i class="fa-solid fa-box-open"></i> My Orders</a>
        <a href="ClientWishlist.html" class="sidebar-link ${activePage === 'Wishlist' ? 'active' : ''}"><i class="fa-solid fa-heart"></i> Wishlist</a>
        <a href="ClientMessages.html" class="sidebar-link ${activePage === 'Messages' ? 'active' : ''}"><i class="fa-solid fa-envelope"></i> Messages</a>
        <a href="ClientSettings.html" class="sidebar-link ${activePage === 'Settings' ? 'active' : ''}"><i class="fa-solid fa-sliders"></i> Settings</a>
        <a href="Login.html" class="sidebar-link" style="color: #ef4444;"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</a>
      </nav>
      <div style="padding-top: 20px; border-top: 1px solid var(--color-espresso-border);">
        <a href="index.html" class="sidebar-link"><i class="fa-solid fa-mug-saucer"></i> Explore Store</a>
      </div>
    </aside>`;
}

const pages = [
  {
    name: 'Orders',
    title: 'My Orders & Subscriptions',
    filename: 'ClientOrders.html',
    sections: `
      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Spending Habits (12 Months)</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="spendingChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Most Ordered Roasts</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="mostOrderedChart"></canvas></div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Active Subscriptions</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid var(--color-copper); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <h3 style="font-size: 1.1rem; color: #333;">The Connoisseur Tier</h3>
            <p style="font-size: 0.85rem; color: #666; margin-top: 4px;">Next delivery: Oct 12th (Midnight Roast - 250g)</p>
          </div>
          <a href="404.html" class="btn btn-copper" style="padding: 8px 16px; text-decoration: none;">Manage Subscription</a>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Quick Reorder</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
          <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px; text-align: center;">
            <h3 style="font-size: 1rem; color: #333; margin-bottom: 10px;">Ethiopia Yirgacheffe</h3>
            <a href="404.html" class="btn" style="background: var(--color-espresso); color: #fff; width: 100%; padding: 8px; display: block; text-align: center; text-decoration: none;">Reorder (₹850)</a>
          </div>
          <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px; text-align: center;">
            <h3 style="font-size: 1rem; color: #333; margin-bottom: 10px;">Colombia Supremo</h3>
            <a href="404.html" class="btn" style="background: var(--color-espresso); color: #fff; width: 100%; padding: 8px; display: block; text-align: center; text-decoration: none;">Reorder (₹720)</a>
          </div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Order History</h2>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--color-espresso-border);">
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">ORDER ID</th>
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">DATE</th>
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">STATUS</th>
                <th style="padding: 12px; font-size: 0.85rem; color: var(--color-text-muted);">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--color-espresso-border);">
                <td style="padding: 12px;"><a href="404.html" style="font-weight: 600; color: var(--color-copper); text-decoration: none;">#ORD-1024</a></td>
                <td style="padding: 12px; font-size: 0.85rem;">Oct 01, 2026</td>
                <td style="padding: 12px;"><span style="background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">Delivered</span></td>
                <td style="padding: 12px;">₹1,570</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-espresso-border);">
                <td style="padding: 12px;"><a href="404.html" style="font-weight: 600; color: var(--color-copper); text-decoration: none;">#ORD-0988</a></td>
                <td style="padding: 12px; font-size: 0.85rem;">Sep 15, 2026</td>
                <td style="padding: 12px;"><span style="background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">Delivered</span></td>
                <td style="padding: 12px;">₹850</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `,
    chartsInit: `
      new Chart(document.getElementById('spendingChart'), {
        type: 'line',
        data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Monthly Spend (₹)', data: [1200, 850, 2400, 1500, 3200, 1800], borderColor: '#b87333', tension: 0.4, fill: true, backgroundColor: 'rgba(184,115,51,0.1)' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('mostOrderedChart'), {
        type: 'doughnut',
        data: { labels: ['Midnight Roast', 'Ethiopia', 'Decaf Blend'], datasets: [{ data: [55, 30, 15], backgroundColor: ['#1c1714', '#b87333', '#94a3b8'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    `
  },
  {
    name: 'Wishlist',
    title: 'My Wishlist & Favorites',
    filename: 'ClientWishlist.html',
    sections: `
      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08); display: flex; flex-direction: column; align-items: center;">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px; width: 100%;">My Flavor Profile Match</h2>
          <div style="position: relative; width: 100%; max-width: 400px; height: 300px;"><canvas id="wishlistRadarChart"></canvas></div>
          <p style="font-size: 0.8rem; color: #666; text-align: center; margin-top: 10px;">Based on your saved items, you prefer high acidity and floral aromas.</p>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Wishlist Categories</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="wishlistBarChart"></canvas></div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Saved Coffees</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
          <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px; position: relative;">
            <i class="fa-solid fa-heart" style="color: #ef4444; position: absolute; top: 12px; right: 12px;"></i>
            <h3 style="font-size: 1rem; color: #333; margin-bottom: 6px;">Geisha Reserve</h3>
            <p style="font-size: 0.8rem; color: #888; margin-bottom: 12px;">Light Roast • Floral</p>
            <a href="404.html" class="btn btn-copper" style="width: 100%; padding: 8px; font-size: 0.85rem; display: block; text-align: center; text-decoration: none;">Add to Cart (₹1,500)</a>
          </div>
          <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px; position: relative;">
            <i class="fa-solid fa-heart" style="color: #ef4444; position: absolute; top: 12px; right: 12px;"></i>
            <h3 style="font-size: 1rem; color: #333; margin-bottom: 6px;">Monsoon Malabar</h3>
            <p style="font-size: 0.8rem; color: #888; margin-bottom: 12px;">Dark Roast • Earthy</p>
            <a href="404.html" class="btn btn-copper" style="width: 100%; padding: 8px; font-size: 0.85rem; display: block; text-align: center; text-decoration: none;">Add to Cart (₹650)</a>
          </div>
        </div>
      </section>
      
      <section class="dashboard-section gsap-dash-element" style="background: #fffef0; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #fde047;">
        <h2 style="font-size: 1.4rem; color: #854d0e; margin-bottom: 16px;"><i class="fa-solid fa-tag"></i> Price Drop Alerts</h2>
        <p style="font-size: 0.9rem; color: #713f12;">Great news! The <strong>Monsoon Malabar</strong> on your wishlist is currently 10% off this week.</p>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Tasting Journal</h2>
        <form id="tastingJournalForm" novalidate>
          <div style="margin-bottom: 10px;">
            <textarea id="tastingNotes" style="width: 100%; height: 100px; padding: 12px; border: 1px solid #ddd; border-radius: 8px; resize: none; box-sizing: border-box;" placeholder="Log your tasting notes here for future reference..." required></textarea>
          </div>
          <button type="submit" class="btn btn-copper">Save Note</button>
        </form>
      </section>
    `,
    chartsInit: `
      new Chart(document.getElementById('wishlistRadarChart'), {
        type: 'radar',
        data: { labels: ['Acidity', 'Body', 'Sweetness', 'Finish', 'Floral'], datasets: [{ label: 'My Ideal Cup', data: [4, 2, 4, 3, 5], backgroundColor: 'rgba(184, 115, 51, 0.4)', borderColor: '#b87333' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('wishlistBarChart'), {
        type: 'bar',
        data: { labels: ['Single Origin', 'Blends', 'Equipment', 'Merch'], datasets: [{ label: 'Saved Items', data: [8, 3, 2, 1], backgroundColor: '#1c1714' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    `
  },
  {
    name: 'Messages',
    title: 'Messages & Support',
    filename: 'ClientMessages.html',
    sections: `
      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Support Ticket Status</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="ticketPieChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Avg Response Time (hrs)</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="responseTimeChart"></canvas></div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Inbox & Roaster Feed</h2>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <a href="404.html" style="display: block; text-decoration: none; padding: 14px; background: #f8fafc; border-left: 3px solid var(--color-copper); border-radius: 6px; transition: transform 0.2s;">
            <h4 style="font-weight: 600; font-size: 0.92rem; color: #333;">Master Roaster Update</h4>
            <p style="font-size: 0.85rem; color: #555; margin-top: 4px;">"We just received an incredible micro-lot from Panama. Exclusive pre-order drops tomorrow for club members!"</p>
          </a>
          <a href="404.html" style="display: block; text-decoration: none; padding: 14px; background: #f0fdf4; border-left: 3px solid #16a34a; border-radius: 6px; transition: transform 0.2s;">
            <h4 style="font-weight: 600; font-size: 0.92rem; color: #166534;">Ticket #442 Resolved</h4>
            <p style="font-size: 0.85rem; color: #15803d; margin-top: 4px;">Your missing tracking link for Order #1024 has been updated in your profile.</p>
          </a>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">New Conversation</h2>
        <form id="clientMessageForm" novalidate style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <input type="text" id="msgSubject" placeholder="Subject (e.g. Brew Advice)" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; width: 100%; box-sizing: border-box;">
          </div>
          <div>
            <textarea id="msgBody" placeholder="Type your message..." required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; width: 100%; height: 100px; resize: none; box-sizing: border-box;"></textarea>
          </div>
          <button type="submit" class="btn btn-copper" style="align-self: flex-start;">Send Message</button>
        </form>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #1c1714; color: #fff; padding: 32px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
        <h2 style="font-size: 1.4rem; margin-bottom: 12px;">Need Instant Brew Advice?</h2>
        <p style="font-size: 0.9rem; color: #aaa; margin-bottom: 20px;">Check out our comprehensive knowledge base for dial-in guides and extraction tips.</p>
        <a href="404.html" class="btn" style="background: var(--color-copper); color: #fff; text-decoration: none; display: inline-block;">Visit Knowledge Base</a>
      </section>
    `,
    chartsInit: `
      new Chart(document.getElementById('ticketPieChart'), {
        type: 'doughnut',
        data: { labels: ['Resolved', 'Open', 'Pending'], datasets: [{ data: [12, 1, 0], backgroundColor: ['#10b981', '#ef4444', '#f59e0b'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('responseTimeChart'), {
        type: 'bar',
        data: { labels: ['Jan', 'Feb', 'Mar', 'Apr'], datasets: [{ label: 'Avg Hours', data: [4, 3.5, 2, 1.2], backgroundColor: '#b87333' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    `
  },
  {
    name: 'Settings',
    title: 'Account & Settings',
    filename: 'ClientSettings.html',
    sections: `
      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Loyalty Points Earned</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="loyaltyLineChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">My Brew Methods</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="brewMethodsChart"></canvas></div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Personal Profile</h2>
        <form id="clientProfileForm" novalidate style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div><label style="font-size: 0.8rem; color: #555; display: block; margin-bottom: 4px;">First Name</label><input type="text" id="settingFirstName" value="Valued" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;"></div>
          <div><label style="font-size: 0.8rem; color: #555; display: block; margin-bottom: 4px;">Last Name</label><input type="text" id="settingLastName" value="Connoisseur" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;"></div>
          <div style="grid-column: 1 / -1;"><label style="font-size: 0.8rem; color: #555; display: block; margin-bottom: 4px;">Email Address</label><input type="email" id="settingEmail" value="client@stackly.com" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;"></div>
          <div style="grid-column: 1 / -1;"><button type="submit" class="btn btn-copper">Save Changes</button></div>
        </form>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Security</h2>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <a href="404.html" class="btn" style="background: #f1f5f9; color: #334155; align-self: flex-start; text-decoration: none;">Change Password</a>
          <a href="404.html" class="btn" style="background: #f1f5f9; color: #334155; align-self: flex-start; text-decoration: none;">Enable Two-Factor Auth (2FA)</a>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Notification Preferences</h2>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <label style="display: flex; align-items: center; gap: 10px;"><input type="checkbox" checked> Receive exclusive roast drop emails</label>
          <label style="display: flex; align-items: center; gap: 10px;"><input type="checkbox" checked> Order status SMS updates</label>
          <label style="display: flex; align-items: center; gap: 10px;"><input type="checkbox"> Marketing and promotional offers</label>
        </div>
      </section>
    `,
    chartsInit: `
      new Chart(document.getElementById('loyaltyLineChart'), {
        type: 'line',
        data: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], datasets: [{ label: 'Points', data: [150, 420, 310, 850], borderColor: '#10b981', tension: 0.4, fill: true, backgroundColor: 'rgba(16,185,129,0.1)' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('brewMethodsChart'), {
        type: 'pie',
        data: { labels: ['Espresso Machine', 'V60 Pour Over', 'French Press'], datasets: [{ data: [60, 30, 10], backgroundColor: ['#1c1714', '#b87333', '#94a3b8'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
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

// String parsing logic for ClientDashboard.html
const beforeNav = clientHTML.substring(0, clientHTML.indexOf('<nav class="sidebar-menu">'));
const afterAsideIndex = clientHTML.indexOf('</aside>') + 8;
const afterNav = clientHTML.substring(afterAsideIndex);

const beforeMainHeader = afterNav.substring(0, afterNav.indexOf('</header>') + 9);
const afterMain = afterNav.substring(afterNav.indexOf('</main>'));
const htmlEnd = afterMain.substring(afterMain.indexOf('<script'));

// 1. Overwrite ClientDashboard.html with the synced sidebar
let newClientHTML = beforeNav + getSidebar('Overview') + afterNav;
fs.writeFileSync('ClientDashboard.html', newClientHTML);
console.log('Updated ClientDashboard.html with active sidebar links.');

// 2. Generate the 4 new Client pages
pages.forEach(page => {
  let customHeader = beforeMainHeader.replace('Client Dashboard', page.title);
  
  let chartsInitSafe = page.chartsInit.split('new Chart').filter(s => s.trim()).map(s => {
    return 'try { new Chart' + s + ' } catch (e) { console.error("Error initializing chart:", e); }';
  }).join('\n');

  let newPageHTML = beforeNav + getSidebar(page.name) + customHeader + 
    '\n\n      <!-- Dynamic Sections -->\n      <div style="display: flex; flex-direction: column; gap: 0;">\n' + 
    page.sections + 
    '\n      </div>\n' + 
    '    </main>\n  </div>\n\n' +
    '  <!-- GSAP & Chart.js CDNs -->\n' +
    '  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n' +
    '  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n' +
    '  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n' +
    '  <script>\n    document.addEventListener("DOMContentLoaded", function() {\n' + chartsInitSafe + '\n    });\n  </script>\n' +
    htmlEnd.replace('</body>', gsapScript + '\n</body>');
  
  fs.writeFileSync(page.filename, newPageHTML);
  console.log('Created ' + page.filename + ' with Chart.js and GSAP.');
});
