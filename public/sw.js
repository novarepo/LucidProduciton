importScripts('./dip/dip.worker.js');
importScripts('./uv/uv.sw.js');

const sw = new UVServiceWorker();
const sw2 = new DIPServiceWorker('./dip/dip.worker.js');

/*
function decode(str){
  if (!str) return str;
  let [ input, ...search ] = str.split('?');

  return decodeURIComponent(input).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char).join('') + (search.length ? '?' + search.join('?') : '');
}
*/

self.addEventListener('fetch', event => {

  if (event.request.url.startsWith(location.origin+'/d/')) {
    // Unfinished AdBlocker
    /*
    url = event.request.url;
    url = url.substr(24);
    url = decode(url);

     fs.readFile('AdBlocker.txt', function (err, data) {
      if (err) throw err;
      if(data.indexOf(url) >= 0){
       console.log("AD DETECTED: " + data)
      }
    });

    */

    event.respondWith(sw2.fetch(event));
  }

  if (event.request.url.startsWith(location.origin+'/u/')) {
    // Unfinished AdBlocker
    /*
    url = event.request.url;
    url = url.substr(24);
    url = decode(url);

     fs.readFile('AdBlocker.txt', function (err, data) {
      if (err) throw err;
      if(data.indexOf(url) >= 0){
       console.log("AD DETECTED: " + data)
      }
    });

    */
    event.respondWith(sw.fetch(event));
  }

});