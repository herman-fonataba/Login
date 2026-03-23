// ========== GOOGLE SHEETS CONFIGURATION ==========
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzHERE_YOUR_DEPLOYMENT_ID/exec';

// ========== FORMAT NOMOR WHATSAPP ==========
function formatPhoneNumber(phone) {
  let cleaned = phone.replace(/\D/g, '');
  if (!cleaned) return phone;
  if (cleaned.startsWith('628')) {
    return '08' + cleaned.substring(3);
  }
  return cleaned;
}

// ========== SUBMIT LUPA PASSWORD ==========
document.addEventListener('DOMContentLoaded', function() {
  const forgotForm = document.getElementById('forgotPasswordForm');
  const sendBtn = document.getElementById('sendResetBtn');

  if (forgotForm) {
    forgotForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      let email = document.getElementById('resetEmail').value.trim();
      let phone = document.getElementById('resetPhone').value.trim();

      if (!email || !phone) {
        showNotification('Mohon isi Email dan Nomor WhatsApp!', false);
        return;
      }

      const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Format Email tidak valid!', false);
        return;
      }

      // Format nomor WhatsApp (628... -> 08...)
      phone = formatPhoneNumber(phone);

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
});
