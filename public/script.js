async function getInfo() {
    try {
        // Fetch public IP address from ipify
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        // Fetch additional info from your API
        const response = await fetch('/api/whoami');
        const data = await response.json();
        
        const result = {
            ipaddress: ipData.ip,
            ...data
        };
        
        document.getElementById('result').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error fetching data';
    }
}