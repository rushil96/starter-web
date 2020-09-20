let genericList=[   {listName : 'listOfProducts',
                    listData : ['Chair','Bench','Bed','Phone','TV','Pump','Handpump','Bedsheet','Phone Cover','Paint','Paintbrush']}, 
                    {listName : 'listOfNames',
                    listData : ['Rushil','Jayesh','Suparan','Vinayak','Vishal','Rupesh','Jonas']}];

let newlist = {
    listName : 'listofcars',
    listData : ['Aventador','Chiron','Regera R','Pagani Zonda','Henessey'],
    priority:2
};
genericList.push(newlist);

let newlist2 = {
    listName : 'listofbike',
    listData : ['Kawasaki H2','Ducati Pannigale','BMW 1000RR','Yamaha 1000R','Aprilla'],
    priority:1
};
genericList.push(newlist2);

let userDefVar = {};
let commonSpan = document.getElementsByClassName('common')[0];
let commonCopyButton = document.getElementsByClassName('copyButton')[0];

window.onload = function(){
    setInterval(rotation,50);
    setInterval(antiRotation,50);
    for(list in genericList){
        renderList(list);
        //document.getElementById('listOfItems').innerHTML = temp + result;
    }
}

function renderList(listIndex){
    let innerData = document.createElement('div');
    let result ='<input id=' + genericList[listIndex].listName.substring(6) + ' placeholder="Enter the name" oninput="showList(\'' + genericList[listIndex].listName + '\',\'' + genericList[listIndex].listName.substring(6) + '\')"/> <ul id='+ genericList[listIndex].listName +'></ul><br>';
    innerData.innerHTML = result;
    document.getElementById('listOfItems').appendChild(innerData);
    renderListItems(genericList[listIndex].listName, genericList[listIndex].listData)
}

function renderListItems(listName, listData){
    let result = '';
    for(listItemDataIdx in listData){
        result += '<li onclick="deleteItem(this)">' + listData[listItemDataIdx] + '</li><input type="hidden" data-id="' + listItemDataIdx +'"/>';
    }
    document.getElementById(listName).innerHTML = result;
    //return result;
}

function showList(listId, searchKey){
    let listHTML = '';
    let searchVar = document.getElementById(searchKey).value.toLowerCase();
    for(listItem of genericList){
        //Object.keys(item)[0]==listId)
        if(listItem.listName==listId){
            for(listItemData of listItem.listData){
                if(listItemData.toLowerCase().indexOf(searchVar)!=-1){
                    listHTML += '<li>' + listItemData + '</li>';
                }
            }
            document.getElementById(listId).innerHTML = listHTML;
            break;
        }
    }
}

function triArea(buttonTag){
    let parentElement = buttonTag.parentNode.children;
    //console.log(parentElement);
    let side1 = Number(parentElement[1].value);
    let side2 = Number(parentElement[2].value);
    let side3 = Number(parentElement[3].value);
    if(isNaN(side1)){
        alert('Please enter valid length of side 1');
    }
    else if(isNaN(side2)){
        alert('Please enter valid length of side 2');
    }
    else if(isNaN(side3)){
        alert('Please enter valid length of side 3');
    }
    else if((side1+side2)<=side3 | (side2+side3)<=side1 | (side1+side3)<=side2){
        alert('Sum of any two sides should always be greater than third side of triangle');
    }
    else{
        let s = (side1 + side2 + side3)/2;
        let areaT =  Math.sqrt(s*((s-side1)*(s-side2)*(s-side3)));
        parentElement[5].hidden=true;
        parentElement[4].hidden=false;
        parentElement[4].innerText='Area of triangle is ' + areaT;
    }
}

function buttonVisible(buttonTag){
    let parentElement = buttonTag.parentElement;
    parentElement.getElementsByClassName('area')[0].hidden=true;
    parentElement.getElementsByClassName('findArea')[0].hidden=false;
}

function userDV(userDVDiv){
    let userVar = userDVDiv.getElementsByClassName('userDVN')[0].value;
    let userVarType = userDVDiv.getElementsByClassName('userDVT')[0].value;
    let userVarValue = userDVDiv.getElementsByClassName('userDVV')[0].value;
    let patt = new RegExp('^[a-zA-Z_$][0-9a-zA-Z_$]*$');
    if(userVar=='' | userVarValue==''){
        alert('Please fill all the details');
        return;
    }
    if(!patt.test(userVar)){
        alert('Variable name is invalid');
        return;
    }
    if(!['N','S','n','s'].includes(userVarType)){
        alert('Please enter either "S" or "N"');
        return;
    }
    else if((userVarType=='n' | userVarType=='n') & isNaN(userVarValue)){
        alert('Number should not contain alphabets or special characters');
        return;
    }
    if(['n','N'].includes(userVarType)){
        userDefVar[userVar] = Number(userVarValue);
        console.log('userDefVar["' + userVar + '"] = ' + userDefVar[userVar] + '');
    }
    else{
        userDefVar[userVar] = userVarValue;
        console.log('userDefVar["' + userVar + '"] = "' + userDefVar[userVar] + '"');
    }
    alert('Please check console');
}

function rotation(){
    let text = document.getElementById('rotate').innerText;
    //textArr = textArr[text.length-1]+textArr.substring(0, text.length-1);
    let textArr = text.split('');
    let letter1 = textArr.pop();
    textArr.unshift(letter1);
    document.getElementById('rotate').innerText = textArr.join('');
}

function antiRotation(){
    let text = document.getElementById('rotate1').innerText;
    let textArr = text.split('');
    let letter1 = textArr.shift();
    textArr.push(letter1);
    document.getElementById('rotate1').innerText = textArr.join('');
}

function getTodayDate(){
    let today = new Date();
    let string;
    let Day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    string = 'Today is '+ Day[today.getDay()];
    let time = today.getHours() +':'+ today.getMinutes() + ':' + today.getSeconds();
    let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let dateYear = today.getDate() +'-' + month[today.getMonth()] + '-' + today.getFullYear();
    string += '\nTime is ' + time + '\n';
    string += 'Date is ' + dateYear + '\n';
    let year = today.getFullYear();
    if(year%100==0 & year%400==0){
        string += "This is a leap year\n";
    }
    else if(year%4==0 & year%100!=0){
        string += "This is a leap year\n";
    }
    else{
        string += "This is not a leap year\n";
    }
    commonSpan.innerText = string;
    commonCopyButton.hidden = false;
}

function printWebpage(){
    window.print();
}

function checkDaysUntilChristmas(){
    var today = new Date();
    var cmas = new Date(today.getFullYear(), 11, 25);
    if (today.getDate == 25 && today.getMonth == 11){
        today.setFullYear(today.getFullYear()+1);
    }
    var oneDay = 1000*60*60*24;
    commonSpan.innerText = Math.ceil((cmas.getTime() - today.getTime())/oneDay) + ' days until Christmas!';
    commonCopyButton.hidden = false;
}

function checkSunday(){
    var sundayresult = '';
    for(let year=2021;year<2101;year++){
        let day = new Date(year, 0, 1);
        if(day.getDay()==0){
            sundayresult += '01-Jan-'+ year + ' will be Sunday!!\n'
        }
    }
    commonSpan.innerText = sundayresult;
    commonCopyButton.hidden = false;
}

function getURL(){
    commonCopyButton.hidden = false;
    commonSpan.innerText =  document.URL;

}

function copyContent(buttonsClassDiv){
    let tempInput = buttonsClassDiv.getElementsByClassName('temp')[0];
    tempInput.hidden = false;
    tempInput.value = commonSpan.innerText;
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);  /*For mobile devices*/
    document.execCommand("copy");           /* Copy the text inside the text field */
    tempInput.hidden = true   ;
}

function addNewElement(){
    var newElement= document.createElement("p");
    var newText= document.createTextNode("Text added using JS");
    newElement.appendChild(newText);
    document.body.appendChild(newElement);
};

var fun = function(){
    var parent= document.getElementsByTagName("body")[0];
    var child = document.getElementsByTagName("p")[1];
    parent.removeChild(child);
};

function randomGuess(){
    let guessedNumber = Number(document.getElementById('random').value);
    let validNumber = [1,2,3,4,5,6,7,8,9,10];
    if(isNaN(guessedNumber) | !validNumber.includes(guessedNumber)){
        alert('Please enter valid number between 1 and 10');
        return;
    }
    let randomNumber = Math.ceil(Math.random()*10);
    if(randomNumber==guessedNumber){
        alert('You guessed correct answer, yeah!');
    }
    else{
        alert('Oops, correct answer was ' + randomNumber + '.');
    }
}