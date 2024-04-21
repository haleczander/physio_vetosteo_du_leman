const NAV = document.querySelector('.nav');
const FOOTER = document.querySelector('footer');
const BODY = document.querySelector('body');
const GRILLE_TARIFAIRE = document.querySelector('.grille-tarifs');

const IMPORTS_FOLDER = '/imports';
const HTML_RESOURCES = { 
    'navigation' : `${IMPORTS_FOLDER}/navigation.html`,
    'footer' : `${IMPORTS_FOLDER}/footer.html`,
    'grille-tarifs' : `${IMPORTS_FOLDER}/grille-tarifs.html`
};

document.onload = onload();


function onloadAccueil(){
    setHeaderScroll();
    setDetailsOnClick();
}

function onload() {
    loadDivs();
    openAnchor();
    if ( BODY.id === 'accueil' ) onloadAccueil();
    if ( GRILLE_TARIFAIRE ) insertHtml(  HTML_RESOURCES['grille-tarifs'], GRILLE_TARIFAIRE );
}

function loadDivs(){
    insertHtml( HTML_RESOURCES['navigation'], NAV );
    insertHtml( HTML_RESOURCES['footer'], FOOTER );
}

function openAnchor(){
    const hash = window.location.hash;
    if( hash ){
        const anchor = document.querySelector( hash );
        if( anchor ){
            anchor.scrollIntoView();
            anchor.setAttribute( "open", "true" );
        }
    }

}

function insertHtml( url, div ){
    fetch( url )
        .then( response => response.text() )
        .then( html => div.innerHTML = html );
}

function setHeaderScroll(){
    window.addEventListener( 'scroll', () => {
        NAV.classList.toggle( 'nav_accueil' , window.scrollY < 25 );
        NAV.classList.toggle( 'shadow-dark' , window.scrollY < 25 );
    });
}

function setDetailsOnClick(){
    const details = document.querySelectorAll('details');
    const closeDetails = () => details.forEach( detail => detail.removeAttribute( 'open' ));

    details.forEach( detail => detail.addEventListener( 'click', closeDetails ));
}