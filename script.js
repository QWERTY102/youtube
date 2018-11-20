var input = document.getElementById('input-box');
var search = document.getElementById('button-addon2');
var searchURL = 'https://youtubeaccess-jcyfudmwvl.now.sh/search';
var redirect = 'https://youtubeaccess-jcyfudmwvl.now.sh/download?id=';
var close = document.querySelector('.close');

close.addEventListener('click', () => {
	close.parentNode.style.display = 'none';
});
input.addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		console.log(`Input : ${input.value}`);
		sendSearch(input.value);
	}
});


search.addEventListener('click', () => {
	console.log(`Input : ${input.value}`);
	sendSearch(input.value);
});




function sendSearch(data) {
	document.querySelector('#loading').style.display = 'initial';
	var videos = document.querySelectorAll('.videos');
	if (videos[0]) {
		var parentElement = videos[0].parentNode;
	}
	for (var i = 0; i < videos.length; i++) {
		parentElement.removeChild(videos[i]);
	}
	fetch(searchURL, {
		method: 'POST',
		body: JSON.stringify({
			term: data
		}),
		headers: {
			'content-type': 'application/json'
		}
	}).then(res => res.json())
		.then(json => process(json));
}

function process(json) {
	document.querySelector('#loading').style.display = 'none';
	json.forEach((data) => {
		var cardClone = document.getElementById('template').cloneNode(true);
		cardClone.childNodes[1].getElementsByClassName('thumbnail')[0].src = data.thumbnail;
		cardClone.childNodes[1].getElementsByClassName('video-title')[0].innerText = data.title;
		cardClone.childNodes[1].getElementsByClassName('channel-name')[0].innerText = data.channelTitle;
		cardClone.childNodes[1].getElementsByClassName('video-description')[0].innerText = data.description;
		cardClone.childNodes[1].getElementsByClassName('video-id')[0].innerText = 'ID: ' + data.videoId;
		cardClone.childNodes[1].getElementsByClassName('published-at')[0].innerText = 'Published At ' + data.publishedAt;
		cardClone.removeAttribute('id');
		cardClone.className = 'card mx-auto videos';
		cardClone.style.display = 'block';
		console.log(cardClone);
		document.getElementById('main-container').appendChild(cardClone);
	});
	//console.log(cardClone);	
}

function sendToDownload(element) {
	var videoId = element.parentNode.querySelector('.video-id').innerText.slice(4);
	console.log(videoId);
	window.open(redirect+videoId);
}