let pesertaData = [
  { id: 1, nama: "Arjuna Pratama", kelas: "SMP 1", tanggal: "2025-03-01", status: "Aktif" },
  { id: 2, nama: "Kirana Dewi", kelas: "SMA 1", tanggal: "2025-02-15", status: "Aktif" },
  { id: 3, nama: "Bayu Saputra", kelas: "SMP 1", tanggal: "2025-01-20", status: "Cuti" }
];

let absensiLog = [
  { tanggal: "2025-03-24", nama: "Arjuna Pratama", hadir: "Hadir" },
  { tanggal: "2025-03-24", nama: "Kirana Dewi", hadir: "Hadir" },
  { tanggal: "2025-03-23", nama: "Arjuna Pratama", hadir: "Hadir" },
  { tanggal: "2025-03-23", nama: "Bayu Saputra", hadir: "Izin" }
];

function loadPage(page) {
  const mainTitle = document.getElementById("mainTitle");
  const contentDiv = document.getElementById("dynamicContent");
  
  if (page === "dashboard") {
      mainTitle.innerHTML = '<i class="fas fa-tachometer-alt"></i> Dashboard Utama';
      renderDashboard(contentDiv);
  } else if (page === "absensi") {
      mainTitle.innerHTML = '<i class="fas fa-calendar-check"></i> Absensi Harian';
      renderAbsensi(contentDiv);
  } else if (page === "peserta") {
      mainTitle.innerHTML = '<i class="fas fa-users"></i> Data Peserta';
      renderPeserta(contentDiv);
  } else if (page === "dokumentasi") {
      mainTitle.innerHTML = '<i class="fas fa-camera"></i> Dokumentasi Kegiatan';
      renderDokumentasi(contentDiv);
  } else if (page === "monitor") {
      mainTitle.innerHTML = '<i class="fas fa-chart-line"></i> Monitor & Statistik';
      renderMonitor(contentDiv);
  } else if (page === "settingan") {
      mainTitle.innerHTML = '<i class="fas fa-sliders-h"></i> Pengaturan Sistem';
      renderSettingan(contentDiv);
  }
}

function renderDashboard(container) {
  const totalPeserta = pesertaData.length;
  const hadirHariIni = absensiLog.filter(l => l.tanggal === new Date().toISOString().slice(0,10) && l.hadir === "Hadir").length;
  const totalAbsensi = absensiLog.length;
  container.innerHTML = `
      <div class="stats-grid">
          <div class="stat-card"><i class="fas fa-user-friends"></i><h3>${totalPeserta}</h3><p>Total Peserta</p></div>
          <div class="stat-card"><i class="fas fa-check-circle"></i><h3>${hadirHariIni}</h3><p>Hadir Hari Ini</p></div>
          <div class="stat-card"><i class="fas fa-chart-simple"></i><h3>${totalAbsensi}</h3><p>Total Absensi</p></div>
          <div class="stat-card"><i class="fas fa-fire"></i><h3>🔥</h3><p>Api Semangat</p></div>
      </div>
      <div class="panel-title" style="margin-top:10px;"><i class="fas fa-fire"></i> Aktivitas Terbaru</div>
      <div style="background:#1f0c0050; border-radius:20px; padding:12px;">
          ${absensiLog.slice(0,4).map(a => `<div style="border-left:3px solid #ff8833; margin:8px 0; padding:5px 10px;"><i class="fas fa-user"></i> ${a.nama} - ${a.tanggal} : ${a.hadir}</div>`).join('') || '<i>Tidak ada aktivitas</i>'}
      </div>
  `;
}

function renderAbsensi(container) {
  container.innerHTML = `
      <div class="panel-title"><i class="fas fa-edit"></i> Rekap Kehadiran</div>
      <button class="btn-fire" id="tambahAbsensiBtn" style="margin-bottom:20px;"><i class="fas fa-plus"></i> Tambah Absensi</button>
      <div style="overflow-x:auto;">
          <table>
              <thead><tr><th>Tanggal</th><th>Nama</th><th>Status</th><th>Aksi</th></tr></thead>
              <tbody id="absensiTableBody">
                  ${absensiLog.map((a, idx) => `<tr><td>${a.tanggal}</td><td>${a.nama}</td><td><span style="color:${a.hadir === 'Hadir' ? '#55ff99' : '#ffaa66'}">${a.hadir}</span></td><td><button class="btn-fire small" onclick="alert('Edit fitur demo')">Edit</button></td></tr>`).join('')}
              </tbody>
          </table>
      </div>
  `;
  document.getElementById("tambahAbsensiBtn")?.addEventListener("click", () => alert("Form tambah absensi akan terintegrasi nanti."));
}

function renderPeserta(container) {
  container.innerHTML = `
      <div class="panel-title"><i class="fas fa-id-card"></i> Manajemen Peserta</div>
      <button class="btn-fire" id="tambahPesertaBtn" style="margin-bottom:20px;"><i class="fas fa-user-plus"></i> Tambah Peserta</button>
      <div style="overflow-x:auto;">
          <table>
              <thead><tr><th>ID</th><th>Nama Lengkap</th><th>Unit</th><th>Bergabung</th><th>Status</th><th>Aksi</th></tr></thead>
              <tbody>
                  ${pesertaData.map(p => `<tr><td>${p.id}</td><td>${p.nama}</td><td>${p.kelas}</td><td>${p.tanggal}</td><td>${p.status}</td><td><button class="btn-fire small" onclick="alert('Edit peserta ${p.id}')">Edit</button></td></tr>`).join('')}
              </tbody>
          </table>
      </div>
  `;
  document.getElementById("tambahPesertaBtn")?.addEventListener("click", () => alert("Fitur tambah peserta akan diintegrasikan."));
}

function renderDokumentasi(container) {
  container.innerHTML = `
      <div class="panel-title"><i class="fas fa-images"></i> Galeri Dokumentasi</div>
      <div class="gallery-grid">
          <div class="gallery-card"><i class="fas fa-image"></i><p>Latihan 15 Maret</p><button class="btn-fire small">Lihat</button></div>
          <div class="gallery-card"><i class="fas fa-video"></i><p>Kejuaraan Kota</p><button class="btn-fire small">Lihat</button></div>
          <div class="gallery-card"><i class="fas fa-camera-retro"></i><p>Upacara Sabuk</p><button class="btn-fire small">Lihat</button></div>
      </div>
      <div style="margin-top:30px"><button class="btn-fire" id="uploadBtn"><i class="fas fa-upload"></i> Upload Dokumentasi Baru</button></div>
  `;
  document.getElementById("uploadBtn")?.addEventListener("click", () => alert("Upload dokumentasi (simulasi) siap diintegrasi."));
}

function renderMonitor(container) {
  const persentaseKehadiran = (absensiLog.filter(a => a.hadir === "Hadir").length / (absensiLog.length || 1) * 100).toFixed(1);
  container.innerHTML = `
      <div class="panel-title"><i class="fas fa-chart-pie"></i> Statistik Kehadiran</div>
      <div class="stats-grid">
          <div class="stat-card"><i class="fas fa-percent"></i><h3>${persentaseKehadiran}%</h3><p>Kehadiran Aktif</p></div>
          <div class="stat-card"><i class="fas fa-calendar-week"></i><h3>${absensiLog.length}</h3><p>Total Data Absensi</p></div>
          <div class="stat-card"><i class="fas fa-users"></i><h3>${pesertaData.length}</h3><p>Peserta Terdaftar</p></div>
      </div>
      <div style="background:#1e0a00; border-radius:20px; padding:15px; margin-top:15px; text-align:center;">
          <i class="fas fa-chart-line fa-3x" style="color:#ff884d;"></i>
          <p style="margin-top:10px;">Grafik kehadiran akan ditampilkan di sini (integrasi dengan data real)</p>
      </div>
  `;
}

function renderSettingan(container) {
  container.innerHTML = `
      <div class="panel-title"><i class="fas fa-cog"></i> Pengaturan Umum</div>
      <div class="settings-form">
          <div><label>Nama Organisasi</label><input type="text" value="Phoenix Taekwondo Family" id="orgName"></div>
          <div><label>Email Admin</label><input type="email" value="admin@phoenix.com" id="adminEmail"></div>
          <button class="btn-fire" id="saveSettingBtn"><i class="fas fa-save"></i> Simpan Perubahan</button>
      </div>
  `;
  document.getElementById("saveSettingBtn")?.addEventListener("click", () => alert("Pengaturan disimpan (demo)."));
}

document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  if(confirm("Apakah Anda yakin ingin logout?")){
      alert("Anda telah logout. (Redirect ke halaman login)");
  }
});

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");
const menuToggle = document.getElementById("menuToggleBtn");

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
}

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("active");
}

if (menuToggle) {
  menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains("open")) {
          closeSidebar();
      } else {
          openSidebar();
      }
  });
}

overlay.addEventListener("click", closeSidebar);

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  if(link.id !== 'logoutBtn'){
      link.addEventListener('click', function(e){
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
          const page = this.getAttribute('data-page');
          if(page) loadPage(page);
          else loadPage('dashboard');
          if(window.innerWidth <= 768) closeSidebar();
      });
  }
});

function updateClock(){
  const now = new Date();
  document.getElementById('currentTime').innerText = now.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

loadPage('dashboard');
