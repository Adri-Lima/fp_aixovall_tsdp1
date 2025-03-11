const CLIENT_ID = 'aa5ec65cb98548e1ba874ff7e2d52faa';
const CLIENT_SECRET_ID = '00b6afe491c043eb9bbd3e11f8306891';
async function getAccessToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET_ID)
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
async function searchTracks() {
    const query = document.getElementById('searchimput').value;
    try {
        const token = await getAccessToken();
        
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
        )}&type=track&limit=10`;
        
        const response = await fetch(url, {
        headers: {
        Authorization: 'Bearer ' + token,
        },
        });
        
        const data = await response.json();
        
        return displayResults(data.tracks.items);
        } catch (error) {
        throw new Error('Error en la busqueda');
        }
        }