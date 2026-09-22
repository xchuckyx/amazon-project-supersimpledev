const xhr = new XMLHttpRequest();
// message = request

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
// it takes time for the request to travel across the Internet.
// xhr.response will be undefined at first.
// xhr.send() is a asynchronus code, it does not wait for the line of code to finish.

// TYpes of requests:
// GET = get some information from the backend
// POST
// PUT
// DELETE

// URL = Uniform Resource Locator 
//  - Like an address, but for the Internet
//  - Helps us locate another computer on the Internet



