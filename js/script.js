const global = {
	currentPage: window.location.pathname,
};

async function displayPopularMovies() {
	const { results } = await fetchAPIData('movie/popular');
	results.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
					movie.poster_path
						? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
						: `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
				}
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `;

		document.querySelector('#popular-movies').appendChild(div);
	});
}

// Fetch data from TMBD API
async function fetchAPIData(endpoint) {
	const API_KEY = '5cf7b79c47f0d7fd79b6409b5489d2ac';
	const API_URL = 'https://api.themoviedb.org/3/';

	showSpinner();
	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);

	const data = await response.json();

	hideSpinner();
	return data;
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
}

// Init App
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies();
			break;
		case '/shows.html':
			console.log('Shows');
			break;
		case '/movie-details.html':
			console.log('Movie Details');
			break;
		case '/tv-details.html':
			console.log('TV Details');
			break;
		case '/search.html':
			console.log('Search');
			break;
	}

	highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
