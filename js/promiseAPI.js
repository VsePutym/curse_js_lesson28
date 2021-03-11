//! Old version 1

// const output = document.getElementById('output');

// const getData = (url, outputData) => {
//     const request = new XMLHttpRequest(); //* создаём запрос 
//     request.open('GET', url); //? настраиваем его, при вызове мы будем передавать адрес нашего API
//     request.addEventListener('readystatechange', () => {
//         if(request.readyState !== 4){
//             return;
//         }
//         if(request.status === 200){
//             //? responseText возвращает текст ответа от сервера на отправленный запрос.
//             const response = JSON.parse(request.responseText);//? response - наши данные , парсим их с JSON формата в обычный объект
//             outputData(response); //? обрабатывает наши данные
//         }else{
//             console.error(request.statusText);
//         }
//     });
//     request.send(); //! вызываем метод для запроса
// };

// const urlPhoto = 'https://jsonplaceholder.typicode.com/photos';

// const outputPhotos = (data) => { //? Дата это наш массив в котор картинки
//     const random = Math.floor(Math.random() * data.length);
//     const obj = data[random]; //? у наших всех объектов будем находить тот который нам выдал рандом
//     output.innerHTML = `<h2>${obj.title}</h2>
//     <img src="${obj.url}" alt="${obj.title}">`;
// }

// getData(urlPhoto, outputPhotos);



const output = document.getElementById('output');

const getData = (url) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest(); //* создаём запрос 
        request.open('GET', url); //? настраиваем его, при вызове мы будем передавать адрес нашего API
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                //? responseText возвращает текст ответа от сервера на отправленный запрос.
                const response = JSON.parse(request.responseText); //? response - наши данные , парсим их с JSON формата в обычный объект
                resolve(response); //? обрабатывает наши данные
            } else {
                reject(request.statusText);
            }
        });
        request.send(); //! вызываем метод для запроса
    });
};


//* Получаем конкретную рандомную картинку (одну, большую) 
const urlPhoto = 'https://jsonplaceholder.typicode.com/photos';

// const outputPhotos = (data) => { //? Дата это наш массив в котор картинки
//     const random = Math.floor(Math.random() * data.length);
//     const obj = data[random]; //? из наших всех объектов будем находить тот который нам выдал рандом
//     output.innerHTML = `<h5>${obj.title}</h5>
//     <img src="${obj.thumbnailUrl}" alt="${obj.title}">`;
// }

// getData(urlPhoto)
//     .then(outputPhotos)
//     .catch((error) => {
//         console.log(error);
//     });

//!  getData Возвращает данные для указанного типа или пустую строку, если данные для указанного типа не существуют или передаваемая сущность не содержит данных

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1');
const twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');
const threeImg = getData('https://jsonplaceholder.typicode.com/photos/3');


const outputPhotos = (data) => { //? Дата это наш массив в котор картинки
    data.forEach(element => {
        output.insertAdjacentHTML('beforebegin', `<h5>${element.title}</h5>
        <img src="${element.thumbnailUrl}" alt="${element.title}">`);
    });

}

//! Выводим обе картинки рандом расположение
// oneImg
//     .then(outputPhotos)
//     .catch((error) => {
//         console.log(error);
//     });

// twoImg
//     .then(outputPhotos)
//     .catch((error) => {
//         console.log(error);
//     });

//! какую первую поймает такую и покажет 
// Promise.race([oneImg, twoImg])
//     .then(outputPhotos)
//     .catch((error) => {
//         console.log(error);
//     });

//! вывод обеих картинок в нужном порядке
Promise.all([twoImg, threeImg, oneImg])
    .then(outputPhotos)
    .catch((error) => {
        console.log(error);
    });