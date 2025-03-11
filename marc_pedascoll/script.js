const CLIENT_ID='c2ad313723324b3c8fdf18415f86be9b';
const CLIENT_SECRET='3fcc1efc757645238d0f75b71b2a2ba6';
const boto=document.getElementById('searchButton');
const input=document.getElementById('search');
async function getAccessToken() {
    try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error obteniendo el token');
    return data.access_token;
    } catch (error) {
    console.error('Error:', error);
    }
    }
const token = await getAccessToken();
console.log(token);
