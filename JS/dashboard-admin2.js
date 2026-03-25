let monitorList = [];
    let pesertaList = [
      { no: 1, nama_lengkap: 'Andi Pratama', nama_panggilan: 'Andi', jenis_kelamin: 'Laki-laki', agama: 'Islam', tempat_tinggal: 'Jl. Merdeka', asal_sekolah: 'SD Harapan', kelas: '5A', tanggal_lahir: '2015-05-10', umur: 9, berat_badan: 35, tinggi_badan: 140, sabuk_warna: 'Merah', status: 'Aktif' },
      { no: 2, nama_lengkap: 'Siti Nurhaliza', nama_panggilan: 'Siti', jenis_kelamin: 'Perempuan', agama: 'Islam', tempat_tinggal: 'Jl. Sudirman', asal_sekolah: 'SD Maju', kelas: '4B', tanggal_lahir: '2016-08-22', umur: 8, berat_badan: 32, tinggi_badan: 135, sabuk_warna: 'Kuning', status: 'Aktif' },
      { no: 3, nama_lengkap: 'Budi Santoso', nama_panggilan: 'Budi', jenis_kelamin: 'Laki-laki', agama: 'Kristen', tempat_tinggal: 'Jl. Ahmad Yani', asal_sekolah: 'SD Bina', kelas: '5C', tanggal_lahir: '2014-12-15', umur: 10, berat_badan: 40, tinggi_badan: 145, sabuk_warna: 'Hijau', status: 'Aktif' }
    ];

    function openTambahPesertaModal() {
      const nextNo = pesertaList.length + 1;
      document.getElementById('no-peserta').value = nextNo;
      document.getElementById('form-tambah-peserta').reset();
      document.getElementById('tambah-peserta-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeTambahPesertaModal() {
      document.getElementById('tambah-peserta-modal').classList.add('hidden');
    }

    document.getElementById('form-tambah-peserta').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const tanggalLahir = new Date(document.getElementById('tanggal-lahir').value);
      const today = new Date();
      let umur = today.getFullYear() - tanggalLahir.getFullYear();
      const bulanBedaan = today.getMonth() - tanggalLahir.getMonth();
      if (bulanBedaan < 0 || (bulanBedaan === 0 && today.getDate() < tanggalLahir.getDate())) {
        umur--;
      }

      const pesertaBaru = {
        no: pesertaList.length + 1,
        nama_lengkap: document.getElementById('nama-lengkap').value,
        nama_panggilan: document.getElementById('nama-panggilan').value,
        jenis_kelamin: document.getElementById('jenis-kelamin').value,
        agama: document.getElementById('agama').value,
        tempat_tinggal: document.getElementById('tempat-tinggal').value,
        asal_sekolah: document.getElementById('asal-sekolah').value,
        kelas: document.getElementById('kelas').value,
        tanggal_lahir: document.getElementById('tanggal-lahir').value,
        umur: umur,
        berat_badan: parseFloat(document.getElementById('berat-badan').value),
        tinggi_badan: parseFloat(document.getElementById('tinggi-badan').value),
        sabuk_warna: document.getElementById('sabuk-warna').value,
        status: document.getElementById('status').value
      };

      pesertaList.push(pesertaBaru);
      renderPesertaList();
      closeTambahPesertaModal();
      showToast('Peserta ' + pesertaBaru.nama_lengkap + ' berhasil ditambahkan');
    });

    document.getElementById('tanggal-lahir').addEventListener('change', function() {
      const tanggalLahir = new Date(this.value);
      const today = new Date();
      let umur = today.getFullYear() - tanggalLahir.getFullYear();
      const bulanBedaan = today.getMonth() - tanggalLahir.getMonth();
      if (bulanBedaan < 0 || (bulanBedaan === 0 && today.getDate() < tanggalLahir.getDate())) {
        umur--;
      }
      document.getElementById('umur').value = umur + ' tahun';
    });

    function renderPesertaList() {
      const container = document.getElementById('peserta-list');
      container.innerHTML = '';

      pesertaList.forEach(peserta => {
        const initials = peserta.nama_lengkap.split(' ').map(n => n[0]).join('');
        const colors = ['linear-gradient(135deg, #ff6a00, #cc0000)', 'linear-gradient(135deg, #ff9a40, #cc3d00)', 'linear-gradient(135deg, #ffd700, #ff6a00)'];
        const colorStyle = colors[peserta.no % colors.length];

        const card = document.createElement('div');
        card.className = 'rounded-xl p-5 border border-phoenix-700/30 hover:border-phoenix-400/40 transition';
        card.style.background = 'linear-gradient(135deg, rgba(26,5,0,0.6), rgba(10,10,11,0.9))';
        card.innerHTML = `
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0" style="background: ${colorStyle}; color: #fff;">
              ${initials}
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-sm truncate" style="color: #ffd4a8;">${peserta.nama_lengkap}</p>
              <p class="text-xs opacity-50 truncate">PX-${String(peserta.no).padStart(3, '0')}</p>
            </div>
          </div>
          <div class="space-y-2 text-sm mb-5 pb-5 border-b border-phoenix-700/20">
            <div class="flex justify-between items-center"><span class="opacity-50">Tingkat Sabuk</span><span class="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0" style="background: rgba(255,106,0,0.2); color: #ff9a40;">${peserta.sabuk_warna}</span></div>
            <div class="flex justify-between items-center"><span class="opacity-50">Status</span><span class="text-emerald-400 font-medium">${peserta.status}</span></div>
          </div>
          <div class="flex gap-2">
            <button onclick="infoPeserta('${peserta.nama_lengkap}', '${peserta.sabuk_warna}', '${peserta.status}')" class="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-white transition hover:opacity-80" style="background: rgba(255,106,0,0.3); color: #ff9a40; border: 1px solid rgba(255,106,0,0.5);"> <i data-lucide="info" class="w-3 h-3 inline mr-1"></i> Info </button>
            <button onclick="editPeserta(${peserta.no}, '${peserta.nama_lengkap}')" class="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-white transition hover:opacity-80" style="background: linear-gradient(135deg, #cc3d00, #ff6a00);"> <i data-lucide="edit" class="w-3 h-3 inline mr-1"></i> Edit </button>
            <button onclick="deletePeserta(${peserta.no}, '${peserta.nama_lengkap}')" class="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-white transition hover:opacity-80" style="background: linear-gradient(135deg, #cc0000, #ff3300);"> <i data-lucide="trash-2" class="w-3 h-3 inline mr-1"></i> Hapus </button>
          </div>
        `;
        container.appendChild(card);
      });
      lucide.createIcons();
    }

    function openTambahMonitorModal() {
      document.getElementById('form-tambah-monitor').reset();
      document.getElementById('tambah-monitor-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeTambahMonitorModal() {
      document.getElementById('tambah-monitor-modal').classList.add('hidden');
    }

    document.getElementById('form-tambah-monitor').addEventListener('submit', function(e) {
      e.preventDefault();

      const monitorBaru = {
        no: monitorList.length + 1,
        nama_panggilan: document.getElementById('nama-monitor').value,
        jenis_kelamin: document.getElementById('jenis-kelamin-monitor').value,
        sabuk_warna: document.getElementById('sabuk-monitor').value,
        sekolah: document.getElementById('sekolah-monitor').value,
        status: document.getElementById('status-monitor').value
      };

      monitorList.push(monitorBaru);
      renderMonitorTable();
      closeTambahMonitorModal();
      showToast('Monitor ' + monitorBaru.nama_panggilan + ' berhasil ditambahkan');
    });

    function renderMonitorTable() {
      const tbody = document.getElementById('monitor-table-body');
      tbody.innerHTML = '';

      if (monitorList.length === 0) {
        tbody.innerHTML = `
          <tr class="border-b border-phoenix-700/10">
            <td class="px-4 sm:px-6 py-4 opacity-50">-</td>
            <td class="px-4 sm:px-6 py-4" style="color: #ffd4a8;">Tidak ada data</td>
            <td class="px-4 sm:px-6 py-4 opacity-50">-</td>
            <td class="px-4 sm:px-6 py-4 opacity-50">-</td>
            <td class="px-4 sm:px-6 py-4 opacity-50">-</td>
            <td class="px-4 sm:px-6 py-4 opacity-50">-</td>
            <td class="px-4 sm:px-6 py-4 opacity-50">-</td>
          </tr>
        `;
        return;
      }

      monitorList.forEach(monitor => {
        const row = document.createElement('tr');
        row.className = 'border-b border-phoenix-700/10 hover:bg-phoenix-700/10 transition';
        row.innerHTML = `
          <td class="px-4 sm:px-6 py-4 text-xs sm:text-sm" style="color: #ffd4a8;">${monitor.no}</td>
          <td class="px-4 sm:px-6 py-4 text-xs sm:text-sm" style="color: #ffd4a8;">${monitor.nama_panggilan}</td>
          <td class="px-4 sm:px-6 py-4 text-xs sm:text-sm opacity-70">${monitor.jenis_kelamin}</td>
          <td class="px-4 sm:px-6 py-4 text-xs sm:text-sm opacity-70">${monitor.sabuk_warna}</td>
          <td class="px-4 sm:px-6 py-4 text-xs sm:text-sm opacity-70">${monitor.sekolah}</td>
          <td class="px-4 sm:px-6 py-4 text-xs sm:text-sm"><span class="px-2.5 py-1 rounded-full text-xs font-medium ${monitor.status === 'Aktif' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'}">${monitor.status}</span></td>
          <td class="px-4 sm:px-6 py-4 text-center">
            <button onclick="deleteMonitor(${monitor.no}, '${monitor.nama_panggilan}')" class="px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-white transition hover:opacity-80" style="background: linear-gradient(135deg, #cc0000, #ff3300);"> <i data-lucide="trash-2" class="w-3 h-3 inline"></i> </button>
          </td>
        `;
        tbody.appendChild(row);
      });
      lucide.createIcons();
    }

    function deleteMonitor(no, name) {
      monitorList = monitorList.filter(m => m.no !== no);
      renderMonitorTable();
      showToast(`Monitor ${name} telah dihapus`);
    }

    // Toggle sidebar
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      const hamburger = document.getElementById('hamburger-btn');
      
      sidebar.classList.toggle('active');
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
    }

    function closeSidebar() {
      document.getElementById('sidebar').classList.remove('active');
      document.getElementById('hamburger-btn').classList.remove('active');
      document.getElementById('sidebar-overlay').classList.remove('active');
    }

    // Close sidebar on nav click
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          closeSidebar();
        }
      });
    });

    // Initialize Lucide
    lucide.createIcons();

    // Page switching
    const pageTitles = {
      dashboard: 'Dashboard',
      absensi: 'Absensi',
      peserta: 'Data Peserta',
      dokumentasi: 'Dokumentasi',
      monitor: 'Monitor',
      settingan: 'Settingan'
    };

    function switchPage(page) {
      document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
      document.getElementById('page-' + page).classList.remove('hidden');

      document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active', 'text-phoenix-100');
        n.classList.add('text-phoenix-100/70');
      });
      const btn = document.querySelector(`[data-page="${page}"]`);
      if (btn) {
        btn.classList.add('active', 'text-phoenix-100');
        btn.classList.remove('text-phoenix-100/70');
      }

      document.getElementById('page-title').textContent = pageTitles[page] || page;
      createFireBackground(page);
      lucide.createIcons();
    }

    function handleLogout() {
      document.getElementById('logout-overlay').classList.remove('hidden');
      lucide.createIcons();
    }

    function saveSettings() {
      showToast('Pengaturan berhasil disimpan');
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.remove('hidden');
      setTimeout(() => t.classList.add('hidden'), 2500);
    }

    function openProfileModal() {
      document.getElementById('profile-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeProfileModal() {
      document.getElementById('profile-modal').classList.add('hidden');
    }

    function editPeserta(no, name) {
      showToast(`Edit peserta: ${name}`);
      console.log('Edit clicked for:', name);
    }

    function deletePeserta(no, name) {
      pesertaList = pesertaList.filter(p => p.no !== no);
      renderPesertaList();
      showToast(`Peserta ${name} telah dihapus`);
    }

    function infoPeserta(name, sabuk, status) {
      showToast(`${name} • Sabuk: ${sabuk} • Status: ${status}`);
      console.log('Info clicked for:', name);
    }

    // Fire Background Effects
    const fireColors = {
      dashboard: ['#ff0000', '#ff3300', '#ff6600', '#ff9900'],
      absensi: ['#00ff00', '#33ff33', '#66ff66', '#99ff99'],
      peserta: ['#0066ff', '#3399ff', '#66ccff', '#99ddff'],
      dokumentasi: ['#9900ff', '#bb33ff', '#cc66ff', '#dd99ff'],
      monitor: ['#999999', '#bbbbbb', '#cccccc', '#dddddd'],
      settingan: ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0']
    };

    function createFireBackground(pageName) {
      const container = document.getElementById('fire-background');
      container.innerHTML = '';
      
      const colors = fireColors[pageName] || fireColors.dashboard;
      
      for (let i = 0; i < 9; i++) {
        const flame = document.createElement('div');
        flame.className = 'fire-flame';
        flame.style.background = `linear-gradient(to top, ${colors[0]}, ${colors[1]}, ${colors[2]}, transparent)`;
        flame.style.boxShadow = `0 0 40px ${colors[0]}, 0 0 80px ${colors[1]}`;
        container.appendChild(flame);
      }
    }

    // Ember particles
    function spawnEmbers() {
      const container = document.getElementById('embers');
      for (let i = 0; i < 6; i++) {
        const e = document.createElement('div');
        e.className = 'ember-particle';
        e.style.left = Math.random() * 100 + '%';
        e.style.bottom = '0';
        e.style.animationDelay = Math.random() * 2 + 's';
        e.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
        e.style.width = (2 + Math.random() * 3) + 'px';
        e.style.height = e.style.width;
        container.appendChild(e);
        setTimeout(() => e.remove(), 4000);
      }
    }
    setInterval(spawnEmbers, 2000);
    spawnEmbers();

    // Element SDK
    const defaultConfig = {
      app_title: 'PHOENIX',
      welcome_text: 'Welcome back, P.T.F',
      background_color: '#0a0a0b',
      surface_color: '#1a0500',
      text_color: '#ffd4a8',
      primary_action: '#ff6a00',
      secondary_action: '#cc3d00',
      font_family: 'Outfit',
      font_size: 14
    };

    function applyConfig(config) {
      const t = config.app_title || defaultConfig.app_title;
      document.getElementById('sidebar-title').textContent = t;
      document.getElementById('welcome-text').textContent = config.welcome_text || defaultConfig.welcome_text;

      const bg = config.background_color || defaultConfig.background_color;
      const primary = config.primary_action || defaultConfig.primary_action;
      const font = config.font_family || defaultConfig.font_family;
      const size = config.font_size || defaultConfig.font_size;

      document.body.style.background = bg;
      document.body.style.fontFamily = `${font}, Outfit, sans-serif`;
      document.body.style.fontSize = size + 'px';
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => applyConfig(config),
        mapToCapabilities: (config) => ({
          recolorables: [
            { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); }},
            { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); }},
            { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); }},
            { get: () => config.primary_action || defaultConfig.primary_action, set: (v) => { config.primary_action = v; window.elementSdk.setConfig({ primary_action: v }); }},
            { get: () => config.secondary_action || defaultConfig.secondary_action, set: (v) => { config.secondary_action = v; window.elementSdk.setConfig({ secondary_action: v }); }}
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ['app_title', config.app_title || defaultConfig.app_title],
          ['welcome_text', config.welcome_text || defaultConfig.welcome_text]
        ])
      });
    }

    // Initialize peserta list on page load
    renderPesertaList();
    createFireBackground('dashboard');
