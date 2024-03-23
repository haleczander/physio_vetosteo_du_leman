const siteName = "Physio Vet'Ostéo du Léman";
const pageMapping = {
    'Accueil': {path: 'accueil.html', displayedUrl: 'accueil', customFn: pageAccueilCustomFn},
    'Physiothérapie': {path: 'physio.html', displayedUrl: 'physiotherapie'},
    'Tarifs': {path: 'tarifs.html', displayedUrl: 'tarifs', customFn: loadTarifs},
    'Contact': {path: 'contact.html', displayedUrl: 'contact'},
    'Conditions Générales d\'utilisation': {path: 'cgu.html', displayedUrl: 'cgu'},
    'Mentions Légales': {path: 'mentions-legales.html', displayedUrl: 'mentions-legales', customFn: loadTarifs},
};

function getMappingKeyFromHref( href ) {
    return Object.keys(pageMapping).find( key => pageMapping[key].displayedUrl === href ) || 'Accueil';
}

const headerNav = document.querySelector('header nav');

function resetCustomFn() {
    Object.values(pageMapping).forEach( page => page.customFn && page.customFn(false) );
}


function pageAccueilCustomFn( initiate = true ) {
    const setNav = () => headerNav.classList.add('welcome-hero-nav');
    const resetNav = () => headerNav.classList.remove('welcome-hero-nav');
    const scrollFn = () => window.scrollY <= 25 ? setNav() : resetNav();
    if ( initiate ) {
        const defilementArrow = document.getElementsByClassName('welcome-hero-defilement-button')?.item(0);
        defilementArrow?.addEventListener('click', () => scrollToDiv('section:nth-child(2)', 'smooth') );  
        scrollFn();
        window.onscroll = scrollFn;
    } else {
        window.onscroll = null;
        resetNav();
    }   
}

function scrollToDiv( selector = null, behavior = "smooth" ) {
    if ( selector ) {
        const div = document.querySelector(selector);
        console.log( selector, div );
        if ( div ) {
            return div.scrollIntoView({behavior: behavior});
        }
    } 
    return scrollTo(0, 0);
}

function loadTarifs ( initiate = true ) {
    if ( initiate ) {
        const divTarifs = document.querySelector('.grille-tarifs');
        fetchContent( divTarifs, buildPageImportPath('grille-tarifs.html') );
    }
}




document.onload = loadPageFromUrl();


function loadPageFromUrl() {
    const url = new URL( window.location.href );
    loadPage( url.pathname.split('/').pop() );
}


function loadPage( href ) {
    const [baseUrl, hashTag] = href.split('#');
    const pageKey = getMappingKeyFromHref( baseUrl );
    console.log( baseUrl, '#',hashTag,'->', pageKey );
    const { path, displayedUrl, customFn } = pageMapping[pageKey];
    const main = document.querySelector('main');
    fetchContent( main, buildPageImportPath(path) )
        .then ( () => updatePageTitle( pageKey, displayedUrl ) )
        .then ( () => scrollToDiv( `#${hashTag}` ) )
        .then ( () => resetCustomFn() )
        .then ( customFn );
}

async function fetchContent( div, path ) {
    return fetch( path )
        .then(res =>  
            res.ok ? res.text() : Promise.reject(res.status)
            )
        .then( html => div.innerHTML = html )
}

function updatePageTitle( pageKey, displayedUrl ) {
    const newPageTitle = getPageTitle(pageKey);
    document.title = newPageTitle;
    document.url = displayedUrl;
    const infos = {additionalInformation: `Updated URL to "${displayedUrl}" (page : "${pageKey}") with JS`};
    window.history.pushState(infos, newPageTitle, displayedUrl);
    window.scrollTo(0,0);
}

function getPageTitle( pageTitle ) {
    return `${siteName} - ${pageTitle}`;
}

function buildPageImportPath( path ) {
    return `./imports/${path}`;
}

document.querySelectorAll('a').forEach(
    link => link.addEventListener('click', onLinkClink)
);

function onLinkClink( event ) {
    if ( event.target.target !== '_blank') {
        event.preventDefault();
        loadPage( event.target.getAttribute('href') );
    }
}