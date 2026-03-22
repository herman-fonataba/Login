(function() {
      // ========== MENCEGAH GOOGLE TRANSLATE ==========
      document.documentElement.setAttribute('translate', 'no');
      document.body.setAttribute('translate', 'no');
      
      if (typeof chrome !== 'undefined' && chrome.translate) {
        chrome.translate = null;
      }
      
      document.addEventListener('DOMContentLoaded', function() {
        const meta = document.createElement('meta');
        meta.name = 'google';
        meta.content = 'notranslate';
        document.head.appendChild(meta);
      });
      
      // ========== PROTEKSI INSPECT, KLIK KANAN, COPY ==========
      
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
      });
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
            (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
            (e.ctrlKey && (e.key === 'S' || e.key === 's'))) {
          e.preventDefault();
          return false;
        }
        
        if (e.ctrlKey && (e.key === 'C' || e.key === 'c')) {
          if (!(document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
            e.preventDefault();
            return false;
          }
        }
      });
      
      document.addEventListener('selectstart', function(e) {
        if (!(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
          e.preventDefault();
          return false;
        }
      });
      
      document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
      });
      
      document.addEventListener('copy', function(e) {
        if (!(document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
          e.preventDefault();
          return false;
        }
      });
      
      setInterval(function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if (widthThreshold || heightThreshold) {
          document.body.innerHTML = '<div style="position:fixed; top:0; left:0; width:100%; height:100%; background:black; color:#ff4400; display:flex; align-items:center; justify-content:center; font-family:Cinzel; text-align:center; padding:20px;"><h1>🚫 DevTools terdeteksi! Halaman ini dilindungi.</h1></div>';
        }
      }, 1000);
      
      // ========== DETEKSI SCREENSHOT ==========
      const screenshotOverlay = document.getElementById('screenshotOverlay');
      let screenshotTimer = null;
      
      function showScreenshotWarning() {
        if (screenshotOverlay) {
          screenshotOverlay.style.display = 'flex';
          
          if (screenshotTimer) clearTimeout(screenshotTimer);
          screenshotTimer = setTimeout(function() {
            screenshotOverlay.style.display = 'none';
          }, 3000);
        }
      }
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'PrintScreen' || e.code === 'PrintScreen' ||
            (e.metaKey && e.shiftKey && e.key === 's') ||
            (e.ctrlKey && e.shiftKey && e.key === 's') ||
            (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5'))) {
          showScreenshotWarning();
          e.preventDefault();
          return false;
        }
      });
      
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          sessionStorage.setItem('screenshot_risk', 'true');
        } else {
          if (sessionStorage.getItem('screenshot_risk') === 'true') {
            showScreenshotWarning();
            sessionStorage.removeItem('screenshot_risk');
          }
        }
      });
      
      // ========== BLOKIR IPHONE ==========
      function isiPhone() {
        return /iPhone/.test(navigator.userAgent) && !/iPad/.test(navigator.userAgent);
      }

      window.addEventListener('load', function() {
        const blocker = document.getElementById('iphoneBlocker');
        if (isiPhone()) {
          blocker.classList.add('show');
          document.body.style.overflow = 'hidden';
        } else {
          blocker.style.display = 'none';
        }
      });

      // ========== SHOW/HIDE PASSWORD ==========
      const togglePassword = document.getElementById('togglePassword');
      const passwordField = document.getElementById('passwordField');
      
      if (togglePassword && passwordField) {
        function togglePasswordVisibility() {
          const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
          passwordField.setAttribute('type', type);
          togglePassword.classList.toggle('fa-eye');
          togglePassword.classList.toggle('fa-eye-slash');
          passwordField.focus();
        }
        
        togglePassword.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          togglePasswordVisibility();
        });
      }

      // ========== SWITCH ANTARA HALAMAN ==========
      const loginPage = document.getElementById('loginPage');
      const forgotPage = document.getElementById('forgotPasswordPage');
      const forgotLink = document.getElementById('forgotPasswordLink');
      const backLink = document.getElementById('backToLoginLink');
      
      if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
          e.preventDefault();
          loginPage.classList.remove('visible-page');
          loginPage.classList.add('hidden-page');
          forgotPage.classList.remove('hidden-page');
          forgotPage.classList.add('visible-page');
          window.scrollTo(0, 0);
        });
      }
      
      if (backLink) {
        backLink.addEventListener('click', function(e) {
          e.preventDefault();
          forgotPage.classList.remove('visible-page');
          forgotPage.classList.add('hidden-page');
          loginPage.classList.remove('hidden-page');
          loginPage.classList.add('visible-page');
          window.scrollTo(0, 0);
        });
      }

      // ========== CANVAS PHOENIX ==========
      const canvas = document.getElementById('phoenixCanvas');
      const ctx = canvas.getContext('2d');
      let width, height;

      let particles = [];
      const PARTICLE_COUNT = 100;

      function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const isFeather = i % 4 === 0;
          particles.push({
            x: Math.random() * width,
            y: height * 0.6 + Math.random() * height * 0.3,
            size: isFeather ? Math.random() * 25 + 10 : Math.random() * 10 + 3,
            speedY: Math.random() * 1.2 + 0.4,
            speedX: (Math.random() - 0.5) * 0.6,
            opacity: Math.random() * 0.4 + 0.2,
            isFeather: isFeather,
            angle: Math.random() * Math.PI * 2,
          });
        }
      }

      function drawPhoenix() {
        ctx.clearRect(0, 0, width, height);

        ctx.save();
        ctx.filter = 'blur(15px)';
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = '#ff7700';
        ctx.beginPath();
        ctx.moveTo(0, height*0.7);
        ctx.quadraticCurveTo(width*0.3, height*0.3, width*0.2, height*0.1);
        ctx.lineTo(width*0.1, height*0.3);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(width, height*0.7);
        ctx.quadraticCurveTo(width*0.7, height*0.3, width*0.8, height*0.1);
        ctx.lineTo(width*0.9, height*0.3);
        ctx.fill();
        ctx.restore();

        for (let p of particles) {
          p.y -= p.speedY;
          p.x += p.speedX * 0.5 + Math.sin(Date.now() * 0.002 + p.y) * 0.1;

          if (p.y + p.size < 0 || p.x < -30 || p.x > width + 30) {
            p.y = height - Math.random() * height * 0.3;
            p.x = Math.random() * width;
            p.size = p.isFeather ? Math.random() * 25 + 12 : Math.random() * 10 + 4;
            p.opacity = Math.random() * 0.3 + 0.2;
          }

          let flicker = 0.7 + 0.3 * Math.sin(Date.now() * 0.008 + p.x);

          if (!p.isFeather) {
            ctx.beginPath();
            let grad = ctx.createRadialGradient(p.x-3, p.y-3, p.size*0.2, p.x, p.y, p.size*1.2);
            grad.addColorStop(0, `rgba(255, 200, 100, ${p.opacity * flicker})`);
            grad.addColorStop(0.6, `rgba(255, 80, 0, ${p.opacity * 0.7})`);
            grad.addColorStop(1, 'rgba(150, 20, 0, 0)');
            ctx.fillStyle = grad;
            ctx.arc(p.x, p.y, p.size * 1.1, 0, Math.PI*2);
            ctx.fill();
          } else {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle + Date.now() * 0.001);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(p.size*0.7, -p.size*0.4, p.size*1.2, -p.size*0.7);
            ctx.lineTo(p.size*0.8, -p.size*0.4);
            ctx.closePath();
            let fGrad = ctx.createLinearGradient(0, 0, p.size, -p.size);
            fGrad.addColorStop(0, `rgba(255, 170, 70, ${p.opacity})`);
            fGrad.addColorStop(1, `rgba(255, 60, 0, ${p.opacity*0.6})`);
            ctx.fillStyle = fGrad;
            ctx.shadowColor = '#ffaa33';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();
          }
        }
        requestAnimationFrame(drawPhoenix);
      }

      const emberContainer = document.getElementById('emberContainer');
      const EMBER_COUNT = 25;

      function createEmbers() {
        for (let i = 0; i < EMBER_COUNT; i++) {
          const ember = document.createElement('div');
          ember.className = 'ember';
          ember.style.width = (Math.random() * 10 + 2) + 'px';
          ember.style.height = ember.style.width;
          ember.style.left = Math.random() * 100 + '%';
          ember.style.bottom = '0px';
          emberContainer.appendChild(ember);
          
          animateEmber(ember);
        }
      }

      function animateEmber(el) {
        let x = parseFloat(el.style.left) / 100 * window.innerWidth;
        let y = window.innerHeight - 15;
        let speedY = Math.random() * 1.8 + 1;
        let speedX = (Math.random() - 0.5) * 0.8;
        let opacity = 0.7;

        function move() {
          y -= speedY;
          x += speedX + (Math.random() - 0.5) * 0.2;

          if (y < window.innerHeight * 0.2) opacity -= 0.01;
          if (opacity <= 0.02 || y < -20 || x < -20 || x > window.innerWidth + 20) {
            y = window.innerHeight - 20 - Math.random() * 40;
            x = Math.random() * window.innerWidth;
            opacity = 0.5 + Math.random() * 0.3;
            speedY = Math.random() * 1.8 + 1;
          }

          el.style.transform = `translate(${x}px, ${-window.innerHeight + y}px) scale(${0.6 + Math.random()*0.4})`;
          el.style.opacity = opacity;

          requestAnimationFrame(move);
        }
        requestAnimationFrame(move);
      }

      window.addEventListener('resize', function() {
        initCanvas();
      });

      initCanvas();
      drawPhoenix();
      createEmbers();

      document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('🔥 Login berhasil! (Demo)');
      });
      
      document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('📱 Permintaan reset password telah dikirim! (Demo)');
      });

    })();
