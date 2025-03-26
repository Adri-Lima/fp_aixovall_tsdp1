const clientId = 'f323a1418193476b97723d977ccb837d';
const clientSecret = '38af148325a141e9a419707b0ba9232d';
async function getAccessToken() {
try {
const response = await fetch('https://accounts.spotify.com/api/token', {
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
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
    const query = document.getElementById('searchInput').value.trim();
    
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

    function displayResults(tracks){
    console.log(tracks);

    const resultsDiv = document.getElementById('results')

    console.log(resultsDiv);
    
}