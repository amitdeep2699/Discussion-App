var inputSubject = document.getElementById("inputSubject");
var inputQuestion = document.getElementById("inputQuestion");
var postcontainer = document.getElementById("postcontainer");
var inputName = document.getElementById("inputName");
var inputComment = document.getElementById("inputComment");
var responsecontainer = document.getElementById("responsecontainer");

document.getElementById("post").style.display = "block";
document.getElementById("resp").style.display = "none";
var current_id = 0;
var current_r_id = 0;
var QuestionArray = [];
var CommentArray = [];
var currenQuestionId = 0;

// getting current_id
if (JSON.parse(localStorage.getItem("count")) == null) {
    localStorage.setItem("count", JSON.stringify("0"));
    current_id = 0;
} else {
    current_id = JSON.parse(localStorage.getItem("count"));
}
// getting current_r_id
if (JSON.parse(localStorage.getItem("count_res")) == null) {
    localStorage.setItem("count_res", JSON.stringify("0"));
    current_r_id = 0;
} else {
    current_id = JSON.parse(localStorage.getItem("count_res"));
}

// getting questions array
if (JSON.parse(localStorage.getItem("data")) == null) {
    QuestionArray = [];
} else {
    QuestionArray = JSON.parse(localStorage.getItem("data"));
}

function storedata() {
    let array = [];
    for (var i = 0; i < QuestionArray.length; i++) {
        if (QuestionArray[i]) {
            array.push(QuestionArray[i]);
        }
    }
    localStorage.setItem("data", JSON.stringify(array));
}

function load() {
    shortQuestion();
    for (var i = 0; i < QuestionArray.length; i++) {
        if (QuestionArray[i]) {
            CreatingDiv(QuestionArray[i].subject, QuestionArray[i].question, QuestionArray[i].id, QuestionArray[i].time, QuestionArray[i].up, QuestionArray[i].down, QuestionArray[i].fav);
        }
    }
}

// getting comments array
if (JSON.parse(localStorage.getItem("response")) == null) {
    CommentArray = [];
} else {
    CommentArray = JSON.parse(localStorage.getItem("response"));
}
function storeresponse() {
    let array = [];
    for (var i = 0; i < CommentArray.length; i++) {
        if (CommentArray[i]) {
            array.push(CommentArray[i]);
        }
    }
    localStorage.setItem("response", JSON.stringify(array));
}

function loadresponse(c_id) {
    shortComment();
    for (var i = 0; i < CommentArray.length; i++) {
        if (CommentArray[i]) {
            if (CommentArray[i].Q_id == c_id) {
                CreatingResponseDiv(CommentArray[i].name, CommentArray[i].comment, CommentArray[i].id, CommentArray[i].time, CommentArray[i].up, CommentArray[i].down, CommentArray[i].fav);

            }
        }
    }
}


function CheckPostTimeInput(value1, value2) {
    let s_flag = false;
    let q_flag = false;
    let count_space = 0;
    for (let i = 0; i < value1.length; i++) {
        if (value1[i] == " ") {
            count_space++;
        }
    }
    if (value1.length != count_space) {
        s_flag = true;
    }
    count_space = 0;
    for (let i = 0; i < value2.length; i++) {
        if (value2[i] == " ") {
            count_space++;
        }
    }
    if (value2.length != count_space) {
        q_flag = true;
    }
    if (s_flag && q_flag) {
        return true;
    } else {
        return false;
    }
}

function setfav(fabstar, fabstar_val) {
    if (fabstar_val == true) {
        fabstar.style.color = "rgb(203, 203, 62)";
    }
    else {
        fabstar.style.color = "white";
    }
}

function Addfab_icon(col2, fabup_val, fabdown_val, fabstar_val) {
    let fabup = document.createElement("a");
    let fabdown = document.createElement("a");
    let fabstar = document.createElement("a");

    fabup.innerText = fabup_val;
    fabdown.innerText = fabdown_val;

    fabup.setAttribute("class", "up fa fa-thumbs-up");
    fabdown.setAttribute("class", "down fa fa-thumbs-down");
    fabstar.setAttribute("class", "fav fa fa-star");
    fabstar.setAttribute("value", fabstar_val);

    setfav(fabstar, fabstar_val);

    fabup.addEventListener("click", function () {
        fabup.innerText = parseInt(fabup.innerText) + 1;
        let c_id = fabup.parentNode.parentNode.parentNode.id;
        for (var i = 0; i < QuestionArray.length; i++) {
            if (QuestionArray[i].id == c_id) {
                QuestionArray[i].up = fabup.innerText;
            }
        }
        storedata();
    })

    fabdown.addEventListener("click", function () {
        fabdown.innerText = parseInt(fabdown.innerText) + 1;
        let c_id = fabdown.parentNode.parentNode.parentNode.id;
        for (var i = 0; i < QuestionArray.length; i++) {
            if (QuestionArray[i].id == c_id) {
                QuestionArray[i].down = fabdown.innerText;
            }
        }
        storedata();
    })
    fabstar.addEventListener("click", function () {
        if (fabstar.value == true) {
            fabstar.style.color = "white";
            fabstar.value = false;
        }
        else {
            fabstar.style.color = "rgb(203, 203, 62)";
            fabstar.value = true;
        }
        let c_id = fabstar.parentNode.parentNode.parentNode.id;
        for (var i = 0; i < QuestionArray.length; i++) {
            if (QuestionArray[i].id == c_id) {
                QuestionArray[i].fav = fabstar.value;
            }
        }
        storedata();
    })


    col2.appendChild(fabup);
    col2.appendChild(fabdown);
    col2.appendChild(fabstar);
    return col2;
}

function CreatingDiv(Sub, Ques, id, t, fabup_val, fabdown_val, fabstar_val) {
    let row = document.createElement("div");
    row.setAttribute("class", "row r");
    row.setAttribute("id", id);

    let col1 = document.createElement("col");
    col1.setAttribute("class", "col-12 p-2 d-flex flex-column");
    col1.style.overflowWrap = "break-word";

    let col2 = document.createElement("col");
    col2.setAttribute("class", "col-12 pb-2 d-flex justify-content-between");

    let fav = document.createElement("div");
    fav.setAttribute("class", "col-3 d-flex justify-content-around align-items-center");

    let subject = document.createElement("div");
    subject.setAttribute("class", "Subject");
    subject.innerText = Sub;
    let question = document.createElement("div");
    question.setAttribute("class", "Question");
    question.innerText = Ques;
    col1.appendChild(subject);
    col1.appendChild(question);

    let time = document.createElement("div");
    time.setAttribute("class", "time");

    time.innerText = time_calulate(parseInt(t));

    col2.appendChild(time);
    col2.appendChild(Addfab_icon(fav, fabup_val, fabdown_val, fabstar_val));


    row.appendChild(col1);
    row.appendChild(col2);
    col1.addEventListener("click", function () {
        document.getElementById("post").style.display = "none";
        document.getElementById("resp").style.display = "block";
        let c_id = col1.parentNode.id;
        currenQuestionId = c_id;
        click_for_response(c_id);
        removeAllRespone();
        loadresponse(c_id);
    })
    postcontainer.appendChild(row);

}
function SubmitQuestion() {
    if (CheckPostTimeInput(inputSubject.value, inputQuestion.value)) {
        current_id++;
        CreatingDiv(inputSubject.value, inputQuestion.value, current_id, Date.now(), 0, 0, false);
        let obj = {
            id: current_id,
            subject: inputSubject.value,
            question: inputQuestion.value,
            up: 0,
            down: 0,
            fav: false,
            time: Date.now()
        }
        QuestionArray.push(obj);
        inputSubject.value = "";
        inputQuestion.value = "";
        localStorage.setItem("count", JSON.stringify(current_id));
        storedata();

    } else {
        alert("Enter both field Subject and Question the Submit");
    }
}


// response related function

function click_for_response(col_id) {
    document.getElementById("resp_subject").innerText = document.getElementById(col_id).firstChild.firstChild.textContent;
    document.getElementById("resp_question").innerText = document.getElementById(col_id).firstChild.lastChild.textContent;

}


function CreatingResponseDiv(Name, Comment, id, t, fabup_val, fabdown_val, fabstar_val) {
    let row = document.createElement("div");
    row.setAttribute("class", "row r res");
    row.setAttribute("id", id);

    let col1 = document.createElement("col");
    col1.setAttribute("class", "col-12 p-2 d-flex flex-column");
    col1.style.overflowWrap = "break-word";

    let col2 = document.createElement("col");
    col2.setAttribute("class", "col-12 pb-2 d-flex justify-content-between");

    let fav = document.createElement("div");
    fav.setAttribute("class", "col-3 d-flex justify-content-around align-items-center");

    let name = document.createElement("div");
    name.setAttribute("class", "Subject");
    name.innerText = Name;
    let comment = document.createElement("div");
    comment.setAttribute("class", "Question");
    comment.innerText = Comment;
    col1.appendChild(name);
    col1.appendChild(comment);

    let time = document.createElement("div");
    time.setAttribute("class", "time");

    time.innerText = time_calulate(parseInt(t));

    col2.appendChild(time);
    col2.appendChild(Addfab_icon_res(fav, fabup_val, fabdown_val, fabstar_val));


    row.appendChild(col1);
    row.appendChild(col2);
    responsecontainer.appendChild(row);
}

function time_calulate(t_value){
    let curr=parseInt(Date.now());
    
    let sec=parseInt((curr-t_value)/1000);
    let s=sec%60;
    let min=parseInt(sec/60);
    let m=min%60;
    let hour=parseInt(min/60);
    let h=hour%24;
    let day=parseInt(hour/24);
    
    if(m==0){
        return s+" seconds ago";
    }
    else if(h==0 && min<60){
        return m+" minutes ago";
    }
    else if(day==0 && h<24)
        return h+" hours ago";
    else
        return day+" day ago";
}
function SubmitComment() {
    if (CheckPostTimeInput(inputName.value, inputComment.value)) {
        current_r_id++;
        CreatingResponseDiv(inputName.value, inputComment.value, current_r_id, Date.now(), 0, 0, false);
        let obj = {
            Q_id: currenQuestionId,
            id: current_r_id,
            name: inputName.value,
            comment: inputComment.value,
            up: 0,
            down: 0,
            fav: false,
            time: Date.now()
        }
        CommentArray.push(obj);
        inputName.value = "";
        inputComment.value = "";
        localStorage.setItem("count_res", JSON.stringify(current_r_id));
        storeresponse();
    } else {
        alert("Enter both field Subject and Question the Submit");
    }
}

function Addfab_icon_res(col2, fabup_val, fabdown_val, fabstar_val) {
    let fabup = document.createElement("a");
    let fabdown = document.createElement("a");
    let fabstar = document.createElement("a");

    fabup.innerText = fabup_val;
    fabdown.innerText = fabdown_val;

    fabup.setAttribute("class", "up fa fa-thumbs-up");
    fabdown.setAttribute("class", "down fa fa-thumbs-down");
    fabstar.setAttribute("class", "fav fa fa-star");
    fabstar.setAttribute("value", fabstar_val);

    setfav(fabstar, fabstar_val);

    fabup.addEventListener("click", function () {
        fabup.innerText = parseInt(fabup.innerText) + 1;
        let c_id = fabup.parentNode.parentNode.parentNode.id;
        for (var i = 0; i < CommentArray.length; i++) {
            if (CommentArray[i].Q_id == currenQuestionId) {
                if (CommentArray[i].id == c_id) {
                    CommentArray[i].up = fabup.innerText;
                }
            }
        }
        storeresponse();

    })

    fabdown.addEventListener("click", function () {
        fabdown.innerText = parseInt(fabdown.innerText) + 1;
        let c_id = fabdown.parentNode.parentNode.parentNode.id;
        for (var i = 0; i < CommentArray.length; i++) {
            if (CommentArray[i].Q_id == currenQuestionId) {
                if (CommentArray[i].id == c_id) {
                    CommentArray[i].down = fabdown.innerText;
                }
            }
        }
        storeresponse();
    })
    fabstar.addEventListener("click", function () {
        if (fabstar.value == true) {
            fabstar.style.color = "white";
            fabstar.value = false;
        }
        else {
            fabstar.style.color = "rgb(203, 203, 62)";
            fabstar.value = true;
        }
        let c_id = fabstar.parentNode.parentNode.parentNode.id;
        for (var i = 0; i < CommentArray.length; i++) {
            if (CommentArray[i].Q_id == currenQuestionId) {
                if (CommentArray[i].id == c_id) {
                    CommentArray[i].fav = fabstar.value;
                }
            }
        }
        storeresponse();
    })


    col2.appendChild(fabup);
    col2.appendChild(fabdown);
    col2.appendChild(fabstar);
    return col2;
}

function removeAllRespone() {
    while (responsecontainer.hasChildNodes()) {
        responsecontainer.removeChild(responsecontainer.firstChild);
    }
}
function removeAllpost() {
    while (postcontainer.hasChildNodes()) {
        postcontainer.removeChild(postcontainer.firstChild);
    }
}

function removeQuestion() {
    for (var i = 0; i < CommentArray.length; i++) {
        if (CommentArray[i]) {
            if (CommentArray[i].Q_id == currenQuestionId) {
                delete CommentArray[i];
            }
        }

    }
    storeresponse();
    for (var i = 0; i < QuestionArray.length; i++) {
        if (QuestionArray[i]) {
            if (QuestionArray[i].id == currenQuestionId) {
                delete QuestionArray[i];
            }
        }

    }
    storedata();
    document.getElementById("post").style.display = "block";
    document.getElementById("resp").style.display = "none";
    removeAllpost();
    load();
}

function shortQuestion() {
    QuestionArray.sort(sortFunction);
    function sortFunction(a, b) {
        if (a.up-a.down>b.up-b.down) {
            return -1;
        }
        else if(a.up-a.down<b.up-b.down){
            return 1
        }
        else return 0;
    }
}
function shortComment() {
    CommentArray.sort(sortFunction);
    function sortFunction(a, b) {
        if (a.up-a.down>b.up-b.down) {
            return -1;
        }
        else if(a.up-a.down<b.up-b.down){
            return 1
        }
        else return 0;
    }
}

function newQuestionForm(){
    document.getElementById("post").style.display = "block";
    document.getElementById("resp").style.display = "none";
}
var value="";
document.getElementById("search").addEventListener("keydown",function(event){
    if(event.key=="Backspace"){
        if(value.length>0){
            value=value.substring(0,value.length-1);
        }
    }else{
      value+=event.key;   
    }
    value=value.toUpperCase();
    removeAllpost();
    for(var i=0;i<QuestionArray.length;i++){
        if(QuestionArray[i].subject.toUpperCase().includes(value) || QuestionArray[i].question.toUpperCase().includes(value)){
            CreatingDiv(QuestionArray[i].subject, QuestionArray[i].question, QuestionArray[i].id, QuestionArray[i].time, QuestionArray[i].up, QuestionArray[i].down, QuestionArray[i].fav);
        }
    }
});

var f_flag=true;
function fav_Question(){
    if(f_flag){
        document.getElementById("fav_btn").style.backgroundColor="rgb(227, 230, 232)";
        document.getElementById("fav_btn").style.color="black";
        removeAllpost();
        for(var i=0;i<QuestionArray.length;i++){
            if(QuestionArray[i].fav==true){
                CreatingDiv(QuestionArray[i].subject, QuestionArray[i].question, QuestionArray[i].id, QuestionArray[i].time, QuestionArray[i].up, QuestionArray[i].down, QuestionArray[i].fav);
            }
        }
        f_flag=false;
    }
    else{
        f_flag=true;
        document.getElementById("fav_btn").style.backgroundColor="rgb(224, 168, 0)";
        document.getElementById("fav_btn").style.color="white";
        removeAllpost();
        load();
    }
}
setInterval(function(){
 removeAllpost();
 load();
},59000);