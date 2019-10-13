importScripts('/cache-polyfill.js');


self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('putodo').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.html?homescreen=1',
                '/?homescreen=1',
                '/assets/check.svg',
                '/assets/check.png',
                '/css/style.css',
                '/js/app.js',
                'https://kit.fontawesome.com/8428adf31a.js'
            ]);
        })
    );
});



self.addEventListener('fetch', function (event) {

    console.log(event.request.url);

    event.respondWith(

        caches.match(event.request).then(function (response) {

            return response || fetch(event.request);

        })

    );

});