//подключение функций из модуля req.js
let req = require('./req.js');              

//переменная в которой хранится состояние теста "пройден"/"не пройден"
let isFailed = false;         
//вспомогательная переменная для хранения id компекса
let complexId;                              

//выполнение запроса на авторицию администратора
req.reqGet("/signInAdmin/admin/admin").then(response =>{    

    //обработка ответа
    //если код ответа не 200 (код, который возвращается
    //при удачном запросе), тогда меняем
    //статус на "не пройден"
    let json = JSON.parse(response);                            
    if(json.code !== 200) isFailed = true;                      

    //формирование JSON-обьекта для передачи
    //в POST запрос для добавления комплекса
    let complexBody ={                                          
        name: "testName",                                       
        description: "testDescription",
        category: "Спина",
        sex: "Мужской",
        difficult: "Легко",
        minWeight: "66",
        maxWeight: "99"
    };
    //выполнение запроса на добавление комплекса
    //в ответе приходит id созданного комплекса
    return req.reqPost("/addComplex/", complexBody);        
                                                                
}).then(response =>{
    let json = JSON.parse(response);
    if(json.code !== 200) isFailed = true;
    
    //добавляем значение переменной complexId
    //для использования далее
    complexId = json.id;                                        
    
    //формирование JSON-обьекта для передачи
    //в POST запрос для изменения комплекса
    //в нем присутсутвует id
    let complexBody ={                                          
        complexId: json.id,                                     
        name: "testNameUpdate",                                 
        description: "testDescriptionUpdate",
        category: "Спина",
        sex: "Мужской",
        difficult: "Легко",
        minWeight: "33",
        maxWeight: "66"
    };
    //выполнение запроса на
    //изменение комлекса
    return req.reqPost("/updateComplexById/", complexBody);         
}).then(response =>{
    let json = JSON.parse(response);
    if(json.code !== 200) isFailed = true;
    
    //выполнеие запроса на удаление
    //созданного и измененного комплекса
    return req.reqGet("/deleteComplexById/" + complexId);           
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