const fs = require('fs');

const adminHTML = fs.readFileSync('AdminDashboard.html', 'utf8');

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
    title: 'Product Analytics',
    filename: 'Products.html',
    sections: `
      <!-- 1. Top Section: Charts Grid -->
      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Sales Volume by Type</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="productSalesChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Stock Distribution</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="stockDistributionChart"></canvas></div>
        </div>
      </section>

      <!-- 2. Flavor Profile Radar -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08); display: flex; flex-direction: column; align-items: center;">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px; width: 100%;">Signature Blend Quality Control</h2>
        <div style="position: relative; width: 100%; max-width: 500px; height: 350px;">
          <canvas id="flavorRadarChart"></canvas>
        </div>
      </section>

      <!-- 3. Velocity Trend -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Product Velocity (12 Months)</h2>
        <div style="position: relative; height: 300px; width: 100%;"><canvas id="velocityChart"></canvas></div>
      </section>

      <!-- 4. Advanced Grid -->
      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Inventory Health Grid</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
          <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="font-size: 1rem; color: #333;">Midnight Roast</h3>
            <p style="font-size: 0.8rem; color: #888; margin-bottom: 8px;">Stock: 120 / 500 bags</p>
            <div style="width: 100%; background: #eee; height: 6px; border-radius: 3px;"><div style="width: 24%; background: #ef4444; height: 100%; border-radius: 3px;"></div></div>
          </div>
          <div style="padding: 16px; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="font-size: 1rem; color: #333;">Ethiopia Yirgacheffe</h3>
            <p style="font-size: 0.8rem; color: #888; margin-bottom: 8px;">Stock: 340 / 400 bags</p>
            <div style="width: 100%; background: #eee; height: 6px; border-radius: 3px;"><div style="width: 85%; background: #10b981; height: 100%; border-radius: 3px;"></div></div>
          </div>
        </div>
      </section>
    `,
    chartsInit: `
      new Chart(document.getElementById('productSalesChart'), {
        type: 'bar',
        data: { labels: ['Single Origin', 'Blends', 'Decaf', 'Cold Brew'], datasets: [{ label: 'Sales (kg)', data: [450, 800, 120, 200], backgroundColor: '#b87333' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('stockDistributionChart'), {
        type: 'doughnut',
        data: { labels: ['Light', 'Medium', 'Dark'], datasets: [{ data: [30, 50, 20], backgroundColor: ['#fde047', '#b87333', '#1c1714'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('flavorRadarChart'), {
        type: 'radar',
        data: { labels: ['Acidity', 'Body', 'Sweetness', 'Finish', 'Aroma'], datasets: [{ label: 'Midnight Roast', data: [3, 5, 2, 4, 4], backgroundColor: 'rgba(184, 115, 51, 0.4)', borderColor: '#b87333' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('velocityChart'), {
        type: 'line',
        data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Units Sold', data: [120, 190, 300, 250, 220, 400], borderColor: '#1c1714', tension: 0.4, fill: true, backgroundColor: 'rgba(28,23,20,0.1)' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    `
  },
  {
    name: 'Orders',
    title: 'Order Operations',
    filename: 'Orders.html',
    sections: `
      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Daily Order Volume</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="orderVolumeChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Fulfillment Status</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="fulfillmentPieChart"></canvas></div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Revenue by Region</h2>
        <div style="position: relative; height: 300px; width: 100%;"><canvas id="regionBarChart"></canvas></div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Active Fulfillment Pipeline</h2>
        <div style="display: flex; gap: 16px; overflow-x: auto; padding-bottom: 12px;">
          <div style="min-width: 250px; background: #f8fafc; padding: 16px; border-radius: 8px;">
            <h3 style="font-size: 0.9rem; color: #475569; margin-bottom: 12px;">To Roast (4)</h3>
            <div style="background: #fff; padding: 12px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">#ORD-8820 - Midnight Roast</div>
          </div>
          <div style="min-width: 250px; background: #f0fdf4; padding: 16px; border-radius: 8px;">
            <h3 style="font-size: 0.9rem; color: #166534; margin-bottom: 12px;">To Pack (12)</h3>
            <div style="background: #fff; padding: 12px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">#ORD-8815 - Ethiopia</div>
          </div>
          <div style="min-width: 250px; background: #eff6ff; padding: 16px; border-radius: 8px;">
            <h3 style="font-size: 0.9rem; color: #1e3a8a; margin-bottom: 12px;">Ready to Ship (2)</h3>
            <div style="background: #fff; padding: 12px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">#ORD-8790 - Columbia</div>
          </div>
        </div>
      </section>
      
      <section class="dashboard-section gsap-dash-element" style="background: linear-gradient(135deg, #1c1714, #4a3424); color: #fff; padding: 32px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
        <h2 style="font-size: 1.2rem; margin-bottom: 16px; color: #d1d5db;">Average Order Value (AOV)</h2>
        <div style="font-size: 3rem; font-weight: 700; color: var(--color-copper);">₹1,840</div>
        <p style="font-size: 0.9rem; color: #10b981; margin-top: 8px;"><i class="fa-solid fa-arrow-trend-up"></i> +12% from last month</p>
      </section>
    `,
    chartsInit: `
      new Chart(document.getElementById('orderVolumeChart'), {
        type: 'line',
        data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'Orders', data: [12, 19, 15, 25, 22, 30, 28], borderColor: '#b87333', tension: 0.3 }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('fulfillmentPieChart'), {
        type: 'pie',
        data: { labels: ['To Pack', 'Shipped', 'Delivered', 'Cancelled'], datasets: [{ data: [15, 40, 42, 3], backgroundColor: ['#fbbf24', '#3b82f6', '#10b981', '#ef4444'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('regionBarChart'), {
        type: 'bar',
        data: { labels: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'], datasets: [{ label: 'Revenue (₹)', data: [45000, 32000, 58000, 21000, 15000], backgroundColor: '#1c1714' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    `
  },
  {
    name: 'Customers',
    title: 'Customer Insights',
    filename: 'Customers.html',
    sections: `
      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Customer Growth</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="customerGrowthChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Loyalty Tiers</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="loyaltyPolarChart"></canvas></div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">CAC vs LTV (₹)</h2>
        <div style="position: relative; height: 300px; width: 100%;"><canvas id="cacChart"></canvas></div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Customer Demographics</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="demoDoughnutChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Recent Sentiments</h2>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="padding: 12px; border-left: 4px solid #10b981; background: #f8fafc;">"Best espresso blend in India!" - <strong style="color: #10b981;">Positive (98%)</strong></div>
            <div style="padding: 12px; border-left: 4px solid #fbbf24; background: #f8fafc;">"Delivery took 4 days." - <strong style="color: #fbbf24;">Neutral (50%)</strong></div>
            <div style="padding: 12px; border-left: 4px solid #10b981; background: #f8fafc;">"The packaging is stunning." - <strong style="color: #10b981;">Positive (92%)</strong></div>
          </div>
        </div>
      </section>
    `,
    chartsInit: `
      new Chart(document.getElementById('customerGrowthChart'), {
        type: 'line',
        data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: [{ label: 'New', data: [120, 150, 180, 220], borderColor: '#b87333' }, { label: 'Returning', data: [80, 110, 140, 190], borderColor: '#1c1714' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('loyaltyPolarChart'), {
        type: 'polarArea',
        data: { labels: ['Bronze', 'Silver', 'Gold', 'VIP'], datasets: [{ data: [500, 250, 100, 20], backgroundColor: ['#cd7f32', '#c0c0c0', '#ffd700', '#1c1714'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('cacChart'), {
        type: 'bar',
        data: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], datasets: [{ label: 'CAC', data: [250, 220, 200, 180], backgroundColor: '#ef4444' }, { label: 'LTV', data: [2400, 2800, 3100, 3500], backgroundColor: '#10b981' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('demoDoughnutChart'), {
        type: 'doughnut',
        data: { labels: ['Espresso Fanatics', 'Filter Enthusiasts', 'Cold Brew Lovers'], datasets: [{ data: [45, 35, 20], backgroundColor: ['#1c1714', '#b87333', '#64748b'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    `
  },
  {
    name: 'RoastBatches',
    title: 'Roastery Telemetry',
    filename: 'RoastBatches.html',
    sections: `
      <section class="dashboard-section gsap-dash-element" style="background: #111; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 1.4rem; color: #fff;">Live Loring S7 Telemetry</h2>
          <span style="background: #ef4444; color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; animation: pulse 2s infinite;">● ROASTING</span>
        </div>
        <div style="position: relative; height: 350px; width: 100%;"><canvas id="telemetryChart"></canvas></div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Output Volume (kg)</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="outputBarChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Green Bean Inventory</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="greenBeanChart"></canvas></div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Machine Efficiency</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
          <div style="flex: 1; min-width: 200px;">
            <div style="position: relative; height: 250px; width: 100%;"><canvas id="efficiencyChart"></canvas></div>
          </div>
          <div style="flex: 2; min-width: 250px;">
            <h3 style="font-size: 1rem; color: #333; margin-bottom: 12px;">Upcoming Schedule</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                <span>10:00 AM - Midnight Roast</span> <span style="font-weight: bold; color: var(--color-copper);">20kg</span>
              </li>
              <li style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                <span>01:00 PM - Artisan Blend</span> <span style="font-weight: bold; color: var(--color-copper);">15kg</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <style>@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }</style>
    `,
    chartsInit: `
      new Chart(document.getElementById('telemetryChart'), {
        type: 'line',
        data: { labels: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00'], datasets: [{ label: 'Bean Temp (°C)', data: [20, 100, 150, 180, 200, 215, 220], borderColor: '#b87333', tension: 0.4 }, { label: 'Air Temp (°C)', data: [200, 180, 210, 230, 240, 245, 250], borderColor: '#475569', tension: 0.4, borderDash: [5, 5] }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: '#333' } }, x: { grid: { color: '#333' } } }, plugins: { legend: { labels: { color: '#fff' } } } }
      });
      new Chart(document.getElementById('outputBarChart'), {
        type: 'bar',
        data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], datasets: [{ label: 'Roasted (kg)', data: [45, 50, 30, 60, 55], backgroundColor: '#1c1714' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('greenBeanChart'), {
        type: 'bar',
        data: { labels: ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala'], datasets: [{ label: 'Stock (kg)', data: [120, 85, 200, 50], backgroundColor: '#10b981' }] },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('efficiencyChart'), {
        type: 'doughnut',
        data: { labels: ['Roasting', 'Idle', 'Cleaning'], datasets: [{ data: [75, 15, 10], backgroundColor: ['#b87333', '#cbd5e1', '#ef4444'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    `
  },
  {
    name: 'StoreSettings',
    title: 'System & Analytics',
    filename: 'StoreSettings.html',
    sections: `
      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">API Usage & Rate Limits</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="apiUsageChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Payment Gateway Split</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="gatewayPieChart"></canvas></div>
        </div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="background: #fff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(28,23,20,0.08);">
        <h2 style="font-size: 1.4rem; color: var(--color-espresso); margin-bottom: 16px;">Staff Activity Log</h2>
        <div style="position: relative; height: 300px; width: 100%;"><canvas id="staffBarChart"></canvas></div>
      </section>

      <section class="dashboard-section gsap-dash-element" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">Server Storage</h2>
          <div style="position: relative; height: 250px; width: 100%;"><canvas id="storageDoughnutChart"></canvas></div>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid rgba(28,23,20,0.08);">
          <h2 style="font-size: 1.2rem; color: var(--color-espresso); margin-bottom: 16px;">System Health</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: bold; color: #166534;">99.9%</div>
              <div style="font-size: 0.8rem; color: #475569;">Uptime</div>
            </div>
            <div style="background: #eff6ff; padding: 16px; border-radius: 8px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: bold; color: #1e3a8a;">45ms</div>
              <div style="font-size: 0.8rem; color: #475569;">Avg Latency</div>
            </div>
            <div style="background: #fff1f2; padding: 16px; border-radius: 8px; text-align: center; grid-column: 1 / -1;">
              <div style="font-size: 1.5rem; font-weight: bold; color: #be123c;">0.01%</div>
              <div style="font-size: 0.8rem; color: #475569;">Error Rate</div>
            </div>
          </div>
        </div>
      </section>
    `,
    chartsInit: `
      new Chart(document.getElementById('apiUsageChart'), {
        type: 'line',
        data: { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], datasets: [{ label: 'Requests/sec', data: [5, 2, 25, 45, 30, 15], borderColor: '#3b82f6', fill: true, backgroundColor: 'rgba(59,130,246,0.1)' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('gatewayPieChart'), {
        type: 'pie',
        data: { labels: ['Stripe', 'Razorpay', 'PayPal'], datasets: [{ data: [65, 30, 5], backgroundColor: ['#6366f1', '#3b82f6', '#0ea5e9'] }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('staffBarChart'), {
        type: 'bar',
        data: { labels: ['Yukesh', 'John', 'Sarah', 'Mike'], datasets: [{ label: 'Actions Logged', data: [150, 85, 120, 45], backgroundColor: '#b87333' }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
      new Chart(document.getElementById('storageDoughnutChart'), {
        type: 'doughnut',
        data: { labels: ['Images', 'Database', 'Logs', 'Free'], datasets: [{ data: [45, 15, 10, 30], backgroundColor: ['#1c1714', '#b87333', '#94a3b8', '#e2e8f0'] }] },
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

const beforeNav = adminHTML.substring(0, adminHTML.indexOf('<nav class="sidebar-menu">'));
const afterAsideIndex = adminHTML.indexOf('</aside>') + 8;
const afterNav = adminHTML.substring(afterAsideIndex);

const beforeMainHeader = afterNav.substring(0, afterNav.indexOf('</header>') + 9);
const afterMain = afterNav.substring(afterNav.indexOf('</main>'));
const htmlEnd = afterMain.substring(afterMain.indexOf('<script'));

// Generate the 5 new pages
pages.forEach(page => {
  let customHeader = beforeMainHeader.replace('Admin Overview', page.title);
  
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
  console.log('Created ' + page.filename + ' with Chart.js integration (Fixed Wrapper Glitch).');
});
