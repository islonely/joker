const API_URL = 'https://v2.jokeapi.dev/joke/Any';

talkify.config.remoteService.host = 'https://talkify.net';
talkify.config.remoteService.apiKey = 'cc9ff8d2-6b67-490e-aeea-4a68dacebb7a';
let zira = new talkify.TtsPlayer().forceVoice({name: 'Zira'});

const fetchJoke = () => {
    let blacklist = [];
    document.querySelectorAll('input[type="checkbox"]').forEach(box => {
        if (box.checked) blacklist.push(box.getAttribute('id'));
    });

    $.ajax({
        url: API_URL,
        method: 'GET',
        dataType: 'json',
        data: {blacklistFlags:blacklist.join(','), type:'twopart'},
        
        success: res => {
            zira.playText(`${res.setup} ... ${res.delivery}`);
            $('audio#talkify-audio').removeAttr('controls');
            let audio = $('audio#talkify-audio').get(0).cloneNode(true);
            $(audio).attr('id', 'random');
            let joke = $('template#jokeTemplate').get(0).content.cloneNode(true);
            $(joke).find('h3#category').text(res.category);
            $(joke).find('p#setup').text(res.setup);
            $(joke).find('p#delivery').text(res.delivery);
            $(joke).find('div.w3-card-4').append(audio);
            $('#jokeContainer').prepend(joke);
        },
        
        error: res => {
            console.error(res);
        }
    });
};

const playJoke = elem => {
    let audio = $(elem).parent().find('audio').get(0);
    audio.play();
};

fetchJoke();