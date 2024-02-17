const headerNav = document.getElementsByTagName('header')[0].getElementsByTagName('nav')[0];
window.onscroll=function(){
    if ( document.title == getPageTitle('Accueil') && window.scrollY <= 25) {headerNav.classList.add('welcome-hero-nav');} 
    else {headerNav.classList.remove('welcome-hero-nav');}
};

const defilementArrow = document.getElementsByClassName('welcome-hero-defilement-button')?.item(0);
defilementArrow?.addEventListener('click', function() {
    window.scrollTo(0, window.innerHeight);
});

const siteName = "Physio Vet'Ostéo du Léman";
const pageMapping = {
    'Accueil': {path: 'accueil.html', url: ''},
    'Physiothérapie': {path: 'physio.html', url: 'physio'},
    'Tarifs': {path: 'tarifs.html', url: 'tarifs'},
    'Contact': {path: 'contact.html', url: 'contact'},
    'Conditions Générales d\'utilisation': {path: 'cgu.html', url: 'cgu'},
    'Mentions Légales': {path: 'mentions-legales.html', url: 'mentions'},
};

const main = document.getElementsByTagName('main')[0];
function loadPage(pageTitle) {
    if (!pageMapping[pageTitle]) pageTitle = 'accueil';
    const { path, url } = pageMapping[pageTitle];
    fetch( getPageImportPath(path) )
        .then(res =>  
            res.ok ? res.text() : Promise.reject(res.status)
            )
        .then( html => main.innerHTML = html )
        .then ( () => updatePageTitle(pageTitle, url) );
}

function updatePageTitle( pageTitle, url ) {
    const newPageTitle = getPageTitle(pageTitle);
    document.title = newPageTitle;
    const infos = {additionalInformation: `Updated URL to ${url} with JS`};
    window.history.pushState(infos, newPageTitle, url);
    window.scrollTo(0,0);
}

function getPageTitle( pageTitle ) {
    return `${siteName} - ${pageTitle}`;
}

function getPageImportPath( path ) {
    return `./imports/${path}`;
}

document.querySelectorAll('a').forEach(
    link => link.addEventListener('click', onLinkClink)
);

function onLinkClink( event ) {
    event.preventDefault();
    loadPage( event.target.getAttribute('title') );
}