//подключение функций из модуля req.js
let req = require('./req.js');      

//переменная в которой хранится состояние теста "пройден"/"не пройден"
let isFailed = false;              

//запрос на добавление пользователя
req.reqGet("/addUser/testLogin/testPass").then(response =>{         
    //обработка ответа
    let json = JSON.parse(response);
    
    //если код ответа не 200 (код, который возвращается
    // при удачном запросе), тогда меняем
    //статус на "не пройден"
    if(json.code !== 200) isFailed = true;                              
    
    //выполняем запрос на авторицию
    return req.reqGet("/signIn/testLogin/testPass");                
}).then(response =>{
    let json = JSON.parse(response);
    if(json.code !== 200) isFailed = true;
    //запрос на обновление данных пользователя
    return req.reqGet("/setUserData/testLogin/Мужской/180/80/Средне");  
}).then(response =>{
    let json = JSON.parse(response);
    if(json.code !== 200) isFailed = true;
    
    //запрос на получение комплекса
    //упражненй для пользователя
    return req.reqGet("/getUserComplex/testLogin/Мужской/80/Средне/Ягодицы");   	
}).then(response =>{
    let json = JSON.parse(response);
    if(json.code !== 200) isFailed = true;
    //в случае если какая-либо
    //из функций отработала
    //с ошибкой, меняем статус
    //теста на "не пройден"
}).catch(error => {                                     
    isFailed = true;                                    

}).then(final =>{
    //вывод в консоль, в зависимости от статуса
    //теста, соответствующего сообщения
    if(isFailed) console.log("fail");                   
    else console.log("success");                        
});