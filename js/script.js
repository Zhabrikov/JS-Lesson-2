var inputData = document.querySelector('input[type="text"]');
var ulSpisok = document.getElementById('Spisok');
var spans = document.getElementsByTagName('span');
var saveBtn = document.getElementById('save');
var clearBtn = document.getElementById('clear');

var deleteSvg = document.getElementsByClassName('svgSpan');
var crossedOutText = document.getElementsByClassName('textSpan');
console.log(crossedOutText);
// console.log(spans);


var d = new Date();
var day = d.getDate();
if(day < 10){
    day = '0' + day;
}
var month = d.getMonth() + 1;
if(month < 10){
    month = '0' + month;
}
var year = d.getFullYear();
var currentDate = (day + "." + month + "." + year);

// addEventListener - Обработчик события с последующим вызовом функции

function deleteTodo(){
    for(let span of deleteSvg){
        span.addEventListener('click', function(){
            span.parentElement.remove();
            event.stopPropagation();
        });
    }
};

function crossedOutTodo(){
    for(let span of crossedOutText){
        span.addEventListener('click', function(){  
                span.style.textDecoration = 'line-through';
        });        
    }
};


function loadTodo(){
    if(localStorage.getItem('MyApplicationTodo')){
        ulSpisok.innerHTML = localStorage.getItem('MyApplicationTodo');
    }
    deleteTodo();
    crossedOutTodo();
    
};


inputData.addEventListener('keypress', function(keyPressed){
    if(this.value != ""){   
        if(keyPressed.which === 13){
            var newLi = document.createElement('li');
            var leftSpan = document.createElement('span');

            var textSpan = document.createElement('span');
            textSpan.className = "textSpan";
            textSpan.style.textDecoration = 'none';

            var dateSpan = document.createElement('span');
            dateSpan.className = "dateSpan";
            dateSpan.innerHTML = currentDate;

            var svgSpan = document.createElement('span');
            svgSpan.className = "svgSpan";
            svgSpan.innerHTML = '<i class="fas fa-trash-alt"></i>';

            var newInfo = this.value;
            this.value = "";


            ulSpisok.appendChild(newLi);
                newLi.append(leftSpan);
                    leftSpan.append(textSpan);
                        textSpan.append(newInfo);
                    leftSpan.append(dateSpan);
                newLi.append(svgSpan);
        }
        deleteTodo();        
        crossedOutTodo();
        
    }
});


saveBtn.addEventListener('click', function(){
    localStorage.setItem('MyApplicationTodo', ulSpisok.innerHTML);
});

clearBtn.addEventListener('click', function(){
    ulSpisok.innerHTML = "";
    localStorage.setItem('MyApplicationTodo', ulSpisok.innerHTML);
});

function show(state){
    document.getElementById('modal').style.display = state;
    document.getElementById('filter').style.display = state;
}


deleteTodo();

loadTodo();

crossedOutTodo();
