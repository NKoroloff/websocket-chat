const WebSocket = require('ws');

const server = new WebSocket.Server( {port:3000} );

let date = new Date();
let weekday = new Array(7);
weekday[0] = "Воскресенье";
weekday[1] = "Понедельник";
weekday[2] = "Вторник";
weekday[3] = "Среда";
weekday[4] = "Четверг";
weekday[5] = "Пятница";
weekday[6] = "Суббота";

let lastMessageTime = false;


server.on('connection' , (ws, req) => {
    //const ip = req.connection.remoteAddress;
    ws.on('message' , message => {
        lastMessageTime = new Date();
        setTimeout(function () {
        message = message.toLowerCase();
        }, 3000)
        server.clients.forEach(client => {
            setTimeout(() => {
                if ((new Date()) - lastMessageTime > 14500) {
                    ws.send("Ты тут?");
                    setTimeout(() => {
                        if ((new Date()) - lastMessageTime > 29500) {
                            ws.send("через 3 секунды я уйду");
                            for (let i = 1; i <= 3; i++)
                                setTimeout(() => {
                                    if ((new Date()) - lastMessageTime > 30000 + 1000 * 1) {
                                        if (i < 3)
                                            ws.send(i);
                                        else {
                                            ws.send(i + " всё, до свидания!");
                                            ws.close();
                                        }
                                    }
                                }, 1000*i);
                        }
                    }, 15000);
                }
            }, 15000);

            if(client.readyState === WebSocket.OPEN){
                switch (message){
                    case 'привет':
                        client.send('привет');
                        break;
                    case 'как дела':
                        client.send('отлично, я же бот');
                        break;
                    case 'какой день месяца':
                        client.send(`${date.getDate()}`);
                        break;
                    case 'какой год':
                        client.send(`А год нынче такой: ${date.getFullYear()}`);
                        break;
                    case 'какой день':
                        client.send(`Сегодня   ${weekday[date.getDay()]}`);
                        break;
                    case 'сколько время':
                        client.send(`Сейчас   ${date.toLocaleTimeString()} . Еще вопросы будут?`);
                        break;
                    case 'пока ':
                        client.send(`до свидания`);
                        break;

                }
                console.log((new Date()) +  'Получено сообщение: %s', message  );
            }
        })

    });
    ws.send('Привет, это автоматическое сообщение от NODE.JS server')
    lastMessageTime = (new Date()).getTime();
});






