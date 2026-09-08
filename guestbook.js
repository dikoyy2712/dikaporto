// ==========================================================
// BUKU TAMU DIGITAL - CYBERPUNK TRANSMISSION SYSTEM
// ==========================================================

// MASUKKAN URL WEB APP GOOGLE APPS SCRIPT KAMU DI SINI (Ganti link di bawah ini)
const scriptURL = 'https://script.google.com/macros/s/AKfycbxAD8SjfUgJTm7UKTZLoig_mm91xaLX7e98AHu_FIfDPgoBfGS_iYuEGonBlN3Z2Wxh/exec';

// ----------------------------------------------------------
// 1. FUNGSI UNTUK MEMUAT & MENAMPILKAN PESAN DARI DATABASE
// ----------------------------------------------------------
function loadMessages() {
    const container = document.getElementById('guestbookMessages');
    if (!container) return;
    
    container.innerHTML = '<p class="loading-text">[SYSTEM]: MENGHUBUNGKAN KE CLOUD DATABASE...</p>';

    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            if (!data || data.length === 0) {
                container.innerHTML = '<p class="empty-text">[LOG EMPTY]: Belum ada transmisi pesan. Jadilah yang pertama!</p>';
                return;
            }

            // Tampilkan pesan terbaru di paling atas
            data.reverse().forEach(item => {
                const card = document.createElement('div');
                card.className = 'message-card';
                
                // Format tanggal sederhana
                let dateFormatted = 'RECENT';
                if (item.timestamp) {
                    const d = new Date(item.timestamp);
                    dateFormatted = d.toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });
                }

                card.innerHTML = `
                    <div class="message-header">
                        <div class="sender-info">
                            <span class="sender-icon">⚡</span>
                            <span class="sender-name">${escapeHtml(item.nama)}</span>
                        </div>
                        <span class="message-date">${dateFormatted}</span>
                    </div>
                    <p class="message-body">${escapeHtml(item.pesan)}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            container.innerHTML = '<p class="error-text">[ERROR]: Gagal mengambil data transmisi.</p>';
            console.error('Error loading messages:', err);
        });
}

// ----------------------------------------------------------
// 2. FUNGSI SANITASI HTML (PENCEGAHAN XSS INJECTION)
// ----------------------------------------------------------
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ----------------------------------------------------------
// 3. JALANKAN LOAD MESSAGES SAAT HALAMAN SELESAI DIMUAT
// ----------------------------------------------------------
document.addEventListener('DOMContentLoaded', loadMessages);

// ----------------------------------------------------------
// 4. HANDLER UNTUK SUBMIT FORMULIR BUKU TAMU
// ----------------------------------------------------------
document.getElementById('cyberGuestbookForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah reload halaman

    const submitBtn = document.getElementById('submitBtn');
    const responseMsg = document.getElementById('responseMessage');

    // Ubah tampilan tombol & status saat transmisi
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
    responseMsg.className = 'status-message processing';
    responseMsg.innerText = '[SYSTEM]: Memproses transmisi data ke cloud database...';

    // Ambil data dari input form
    const formData = {
        nama: document.getElementById('nama').value,
        email: document.getElementById('email').value,
        pesan: document.getElementById('pesan').value
    };

    // Kirim data ke Google Apps Script
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        // Notifikasi Sukses
        responseMsg.className = 'status-message success';
        responseMsg.innerText = '✔ [SUCCESS]: Data berhasil dicatat dalam Google Spreadsheet!';
        
        // Reset formulir & tombol
        document.getElementById('cyberGuestbookForm').reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>TRANSMIT DATA</span>';
        
        // Muat ulang daftar pesan secara instan (jeda 1.5 detik)
        setTimeout(loadMessages, 1500);
    })
    .catch(error => {
        // Notifikasi Gagal
        responseMsg.className = 'status-message error';
        responseMsg.innerText = '✖ [ERROR]: Transmisi gagal. ' + error.message;
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>RETRY TRANSMIT</span>';
    });
});
