const clientId = 'df3afac39eab41a899045a53e6ac417d';
const clientSecret = '0a8d052c07ab4fbe9340b29b10c5957f';

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

async function searchSpotify() {
    const query = document.getElementById('search').value.trim();

    if (!query) {
        alert('Si us plau, introdueix el nom d\'una cançó');
        return;
    }

    try {
        const token = await getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) throw new Error('Error en la petició a la API de Spotify');
        
        const data = await response.json();
        displayResults(data.tracks.items);

    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResults(tracks) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!tracks.length) {
        resultsContainer.innerHTML = '<p>No s\'han trobat resultats.</p>';
        return;
    }

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('track');
        
        // Verifiquem si preview_url existeix abans d'afegir l'àudio
        const previewUrl = track.preview_url ? `<audio controls src="${track.preview_url}"></audio>` : '<p>Previsualització no disponible</p>';

        trackElement.innerHTML = `
            <img src="${track.album.images[0]?.url || ''}" alt="${track.name}">
            <h3>${track.name}</h3>
            <p>${track.artists.map(artist => artist.name).join(', ')}</p>
            ${previewUrl}
        `;

        resultsContainer.appendChild(trackElement);
    });
}
