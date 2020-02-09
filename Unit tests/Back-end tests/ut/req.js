//функция осуществляющая GET запрос
//конкретный модуль
function reqGet(url) {     
    //возвращает обьект, в котором содержится
    //либо ответ, в случае успешного выполнения запроса
    //либо ошибка, в случае выполнения с ошибкой
    return new Promise(function (resolve, reject) {                
                                                                           
        //загрузка модуля 'request' для удобной работы
        //с http запросами
        let request = require("request");                                   
        
        //формирование параметров запроса
        const options = {
            url: "http://25.78.98.95:8080/api/v1/userModules/userModules",
            method: "GET"
        };
        request(options.url + encodeURI(url), function (error, response, body) {
            
            //при ошибке передаем для возврата ошибку
            //при успешном выполнении запроса передаем
            //то, что получили в ответ на запрос
            if(error) reject(error);                            
            else{                                               
                resolve(body);                                  
            }
        });
    })
}

//функция осуществляющая GET запрос
//которая принимает параметры: url - вызывающий
//конкретный модуль и postData - данные
//в фромате JSON для передачи серверу в запросе.
//возвращает обьект, в котором содержится
//либо ответ, в случае успешного выполнения запроса
//либо ошибка, в случае выполнения с ошибкой
function reqPost(url, postData){                                               
    return new Promise(function (resolve, reject) {                    
                                                                                
                                                                                
        //загрузка модуля 'request' для удобной работы
        //с http запросами
        let request = require("request");   
        //формирование параметров запроса
        const options = {                                                       
            url: "http://25.78.98.95:8080/api/v1/userModules/userModules",
            method: "POST"
        };
        request.post({url: options.url + encodeURI(url), form: postData}, function (error, response, body) {
            //при ошибке передаем для возврата ошибку
            //при успешном выполнении запроса передаем
            //то, что получили в ответ на запрос
            if(error) reject(error);                        
            else{                                           
                resolve(body);                              
            }
        });
    })
}

//export функций reqGet и reqPost
//чтобы их можно было вызывать из других модулей
module.exports.reqGet = reqGet;                             
module.exports.reqPost = reqPost;                           