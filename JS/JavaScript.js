(function() {
      // ========== GOOGLE SHEETS CONFIGURATION ==========
      // GANTI URL INI DENGAN LINK DEPLOYMENT APPS SCRIPT ANDA
      const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
      
      // ========== NOTIFICATION FUNCTION ==========
      function showNotification(message, isSuccess = true) {
        const notification = document.getElementById('notification');
        const messageSpan = document.getElementById('notificationMessage');
        
        notification.className = 'notification ' + (isSuccess ? 'success' : 'error');
        messageSpan.innerHTML = message;
        notification.style.display = 'flex';
        
        setTimeout(() => {
          notification.style.display = 'none';
        }, 4000);
      }
      
      // ========== SUBMIT LUPA PASSWORD KE GOOGLE SHEETS ==========
      const forgotForm = document.getElementById('forgotPasswordForm');
      const sendBtn = document.getElementById('sendResetBtn');
      
      if (forgotForm) {
        forgotForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const email = document.getElementById('resetEmail').value.trim();
          const phone = document.getElementById('resetPhone').value.trim();
          
          if (!email || !phone) {
            showNotification('Mohon isi Email dan Nomor WhatsApp!', false);
            return;
          }
          
          const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
          if (!emailRegex.test(email)) {
            showNotification('Format Email tidak valid!', false);
            return;
          }
          
          const phoneClean = phone.replace(/\D/g, '');
          if (phoneClean.length < 10) {
            showNotification('Nomor WhatsApp tidak valid (minimal 10 digit)!', false);
            return;
          }
          
          const originalText = sendBtn.innerHTML;
          sendBtn.innerHTML = 'MENGIRIM... <span class="loading"></span>';
          sendBtn.disabled = true;
          
          try {
            await fetch(SCRIPT_URL, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                email: email,
                phone: phone,
                timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jayapura' })
              })
            });
            
            setTimeout(() => {
              showNotification('✅ Permintaan reset password telah dikirim! Admin akan menghubungi Anda.', true);
              document.getElementById('resetEmail').value = '';
              document.getElementById('resetPhone').value = '';
            }, 1000);
            
          } catch (error) {
            showNotification('❌ Gagal mengirim permintaan. Silakan coba lagi.', false);
          } finally {
            setTimeout(() => {
              sendBtn.innerHTML = originalText;
              sendBtn.disabled = false;
            }, 2000);
          }
        });
      }
      
      // Tambahkan style untuk loading spinner jika belum ada di CSS
      const style = document.createElement('style');
      style.textContent = `
        .notification {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(10px);
          padding: 12px 24px;
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          z-index: 10001;
          display: none;
          align-items: center;
          gap: 10px;
          border-left: 4px solid #ff9933;
          box-shadow: 0 0 30px rgba(255,100,0,0.5);
          animation: slideUp 0.3s ease;
        }
        .notification.success { border-left-color: #00ff88; color: #aaffcc; }
        .notification.error { border-left-color: #ff4444; color: #ffaaaa; }
        .loading {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #ffaa66;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-left: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp {
          from { bottom: 0; opacity: 0; }
          to { bottom: 30px; opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    })();
