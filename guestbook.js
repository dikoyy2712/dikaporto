// MASUKKAN URL WEB APP GOOGLE APPS SCRIPT KAMU DI SINI
const scriptURL = 'https://script.google.com/macros/s/AKfycbxAD8SjfUgJTm7UKTZLoig_mm91xaLX7e98AHu_FIfDPgoBfGS_iYuEGonBlN3Z2Wxh/exec';

// Fungsi untuk mengambil dan menampilkan pesan dari Google Sheets
function loadMessages() {
    const container = document.getElementById('guestbookMessages');
    if (!container) return;
    
    container.innerHTML = '<p class="loading-text">[SYSTEM]: Mengambil data pesan...</p>';

    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            if (data.length === 0) {
                container.innerHTML = '<p class="empty-text">Belum ada pesan. Jadilah yang pertama!</p>';
                return;
            }

            // Tampilkan pesan terbaru di paling atas
            data.reverse().forEach(item => {
                const card = document.createElement('div');
                card.className = 'message-card';
                
                // Format tanggal sederhana
                const date = item.timestamp ? new Date(item.timestamp).toLocaleDateString('id-ID') : '';

                card.innerHTML = `
                    <div class="message-header">
                        <span class="sender-name">👤 ${escapeHtml(item.nama)}</span>
                        <span class="message-date">${date}</span>
                    </div>
                    <p class="message-body">${escapeHtml(item.pesan)}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            container.innerHTML = '<p class="error-text">Gagal memuat pesan.</p>';
            console.error('Error loading messages:', err);
        });
}

// Mencegah XSS Injection
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Muat data saat halaman selesai dibuka
document.addEventListener('DOMContentLoaded', loadMessages);

// Event Submit Form
document.getElementById('cyberGuestbookForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const responseMsg = document.getElementById('responseMessage');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>TRANSMITTING...</span>';
    responseMsg.className = 'status-message processing';
    responseMsg.innerText = '[SYSTEM]: Memproses transmisi data ke cloud database...';

    const formData = {
        nama: document.getElementById('nama').value,
        email: document.getElementById('email').value,
        pesan: document.getElementById('pesan').value
    };

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        responseMsg.className = 'status-message success';
        responseMsg.innerText = '✔ [SUCCESS]: Data berhasil dicatat dalam Google Spreadsheet!';
        document.getElementById('cyberGuestbookForm').reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>TRANSMIT DATA</span>';
        
        // Muat ulang daftar pesan secara instan!
        setTimeout(loadMessages, 1500);
    })
    .catch(error => {
        responseMsg.className = 'status-message error';
        responseMsg.innerText = '✖ [ERROR]: Transmisi gagal. ' + error.message;
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>RETRY TRANSMIT</span>';
    });
});
