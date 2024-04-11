let json_text;
let serverData = null;

let observer = new ResizeObserver(drawCanvas);

let lastDateMessagesMap = null;

function onStart() {
    onTypeChoose();
    // fetch('test_array.json')
    fetch('result_format.json')
        .then(response => response.text())
        .then((data) => {
            json_text = data;
            serverData = JSON.parse(json_text);

            let contentDiv = document.getElementById("content");
            contentDiv.innerHTML = "<p class='gray-text'>Server data is ready</p>";

            console.log("Data is ready!");

            let users = new Set();
            let channels = new Set();

            serverData.channels.forEach(channel => {
                channels.add(channel.name);
                channel.messages.forEach(message => users.add(message.senderName));
            });

            let usersDiv = document.getElementById("user");

            let usersList = "<option value=\"all\">All</option>";
            users.forEach(user => usersList += "<option value='" + user + "'>" + user + "</option>");
            usersDiv.innerHTML = usersList;

            let channelsDiv = document.getElementById("channel");

            let channelsList = "<option value=\"all\">All</option>";
            channels.forEach(channel => channelsList += "<option value='" + channel + "'>" + channel + "</option>");
            channelsDiv.innerHTML = channelsList;

            onTypeChoose();
        });

    // document.getElementById("type").value = "graph";
}

function onTypeChoose() {
    let typeSelector = document.getElementById("type");
    let usersSelector = document.getElementById("user");
    // let gapsSelector = document.getElementById("gap");

    if (typeSelector.value === "top") {
        usersSelector.disabled = true;
        // gapsSelector.disabled = true;
        usersSelector.value = "all";
    } else {
        usersSelector.disabled = false;
        // gapsSelector.disabled = false;
    }
}

function render() {
    let contentDiv = document.getElementById("content");

    contentDiv.innerHTML = '';

    if (serverData == null) {
        contentDiv.innerHTML = "<p class='gray-text'>No server data ready yet</p>";

        return;
    }

    let typeSelector = document.getElementById("type");
    let usersSelector = document.getElementById("user");
    let channelSelector = document.getElementById("channel");
    let attachmentSelector = document.getElementById("attachment");
    let fromInput = document.getElementById("start");
    let tillInput = document.getElementById("end");
    // let gapSelector = document.getElementById("gap");

    let unixFrom = Math.floor(new Date(fromInput.value).getTime() / 1000);
    let unixTill = Math.floor(new Date(tillInput.value).getTime() / 1000);

    // let timeGap = getTimeGap(gapSelector.value);

    if (typeSelector.value === "top") {
        let usersMessagesMap = new Map();

        let messagesTotalAmount = 0;

        serverData.channels.filter(ch => channelSelector.value === "all" || ch.name === channelSelector.value).forEach(channel => {
            channel.messages.forEach(msg => {
                if (!((msg.hasAttachment && attachmentSelector.value === "none") || (!msg.hasAttachment && attachmentSelector.value === "has") ||
                    msg.date < unixFrom || msg.date > unixTill)) {
                    if (usersMessagesMap.has(msg.senderName)) usersMessagesMap.set(msg.senderName, usersMessagesMap.get(msg.senderName) + 1);
                    else usersMessagesMap.set(msg.senderName, 1);

                    messagesTotalAmount++;
                }
            });
        });

        usersMessagesMap = new Map([...usersMessagesMap.entries()].sort((a, b) => b[1] - a[1]));

        contentDiv.innerHTML = "<div class='tile'><p class='tile-text'>Total messages: " + messagesTotalAmount + "</p></div>";

        let i = 0;
        usersMessagesMap.forEach((msgAmount, user) => {
            contentDiv.innerHTML += "<div class='tile'><p class='tile-caption'>" + (i + 1) + ". " + user + "</p><p class='tile-text'>Messages: " + msgAmount + "</p></div>"
            i++;
        });
    } else {
        let dateMessagesMap = new Map();
        let messagesTotalAmount = 0;

        let fromDate = new Date(unixFrom * 1000);
        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);

        let tillDate = new Date(unixTill * 1000);
        tillDate = new Date(tillDate.getFullYear(), tillDate.getMonth(), 1);

        let currentDate = fromDate;
        while (currentDate.getTime() <= tillDate.getTime()) {
            dateMessagesMap.set(currentDate.getTime(), 0);

            if (currentDate.getMonth() < 11) {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else {
                currentDate.setMonth(0);
                currentDate.setFullYear(currentDate.getFullYear() + 1);
            }
        }

        serverData.channels.filter(ch => channelSelector.value === "all" || ch.name === channelSelector.value).forEach(channel => {
            channel.messages.forEach(msg => {
                if (!((msg.hasAttachment && attachmentSelector.value === "none") || (!msg.hasAttachment && attachmentSelector.value === "has") ||
                    (usersSelector.value !== "all" && msg.senderName !== usersSelector.value) || msg.date < unixFrom || msg.date > unixTill)) {
                    let date = new Date(msg.date * 1000);
                    date = new Date(date.getFullYear(), date.getMonth(), 1);

                    dateMessagesMap.set(date.getTime(), dateMessagesMap.get(date.getTime()) + 1);
                    messagesTotalAmount++;
                }
            });
        });

        console.log(dateMessagesMap);
        lastDateMessagesMap = dateMessagesMap;

        contentDiv.innerHTML = "<div class='tile'><p class='tile-text'>Total messages: " + messagesTotalAmount + "</p></div>";
        contentDiv.innerHTML += "<canvas id='draw' class='draw' width='1800px' height='500px'></canvas>";

        observer.observe(document.getElementById("draw"));

        drawCanvas();
    }
}

function drawCanvas(){
    if (lastDateMessagesMap == null || document.getElementById("type").value !== "graph") return;
    let canvas = document.getElementById("draw");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    let maxMessages = 0;
    lastDateMessagesMap.forEach((msgAmount) => {
        if (msgAmount > maxMessages) maxMessages = msgAmount;
    });

    let xGap = canvas.width / (lastDateMessagesMap.size - 1);

    console.log(canvas.width);

    let i = 0;
    lastDateMessagesMap.forEach((msgAmount) => {
        let dotX = i * xGap, dotY = canvas.height - canvas.height * msgAmount / maxMessages;

        ctx.lineTo(dotX, dotY);

        console.log(dotX, dotY);

        // ctx.beginPath();
        // ctx.rect(dotX - dotRadius, dotY - dotRadius, 2 * dotRadius, 2 * dotRadius);
        // ctx.fillStyle = "#ffffff";
        // ctx.fill();
        // ctx.closePath();

        i++;
    });

    ctx.strokeStyle = "white";
    ctx.strokeWidth = 3;
    ctx.stroke();
    ctx.closePath();
}

// function getTimeGap(gapValue) {
//     if (gapValue == "month") return 2592000;
//     if (gapValue == "week") return ;
//     if (gapValue == "day") return ;
//     if (gapValue == "hour") return ;
//
//     return 10000;
// }