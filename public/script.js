async function getInfo() {
    try {
        const response = await fetch('/api/whoami');
        const data = await response.json();
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error fetching data';
    }
}