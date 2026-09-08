document.getElementById('cyberGuestbookForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Tempelkan URL Web App Google Apps Script kamu di dalam tanda petik di bawah ini
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzqRFSgKfjrS8I_ynFwsO8dIXAYyMl7bVthd0ZE9X7Y30FIu-_25KvYuPH9H6vYVJ8/exec';

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
    })
    .catch(error => {
        responseMsg.className = 'status-message error';
        responseMsg.innerText = '✖ [ERROR]: Transmisi gagal. ' + error.message;
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>RETRY TRANSMIT</span>';
    });
});
