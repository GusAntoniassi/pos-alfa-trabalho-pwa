const OFFLINE_VERSION = 1;
const CACHE_NAME = "ifud";
const OFFLINE_URL = "ifud/offline";

self.addEventListener('install', function (event) {
    // guardar as informações no cache
    caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll([
            'ifud/index.php',
            'ifud/offline',
            'ifud/images/logo.png',
            'ifud/images/404.png',
            'ifud/images/load.gif',
            'ifud/css/materialize.min.css',
            'ifud/css/style.css',
            'ifud/css/jquery-3.4.1.min.js',
            'ifud/css/materialize.min.js',
            'ifud/js/all.js',
            'ifud/js/home.js',
            'ifud/js/produto.js',
            'ifud/js/categoria.js',
            'ifud/js/carrinho.js',
            'ifud/home',
        ])
    })
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })());
});

this.addEventListener('fetch', event => {
    event.respondWith(
        // caches.match(event.request).then(response => {
        //     return response || fetch(event.request)
        // }).catch(() => {
        //     return caches.match(OFFLINE_URL);
        // })

        caches.match(event.request).then(function (response) { 
            return response || fetch(event.request, { credentials: 'include' })
        }).catch(() => {
            return caches.match(OFFLINE_URL);
        })
    )
})