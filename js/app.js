// selectors
const clear=document.querySelector(".clear");
const list=document.getElementById("list");
const input=document.getElementById("input");
const dateElement=document.getElementById("date");
const inputIcon=document.getElementById("inputicon");

//date 
const options={weekday:"long", month:"short", day:"numeric"};
const today=new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US",options);
//clases selectors
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";
//VARIABLES
let LIST, id;
// local storage
let data=localStorage.getItem("TODO");
if (data){
    LIST =JSON.parse(data);
    id =LIST.length;
    loadList(LIST);
}
else{
    id=0;
    LIST=[];
}
//functions 
function loadList(arr){
    arr.forEach(element => {
        addToDo(element.name,element.trash,element.id,element.done);
    });
}
function addToDo(todo,trash,id,done){
    if (trash){
        return;
    }
    const DONE= done ? CHECK : UNCHECK;
    const LINE= done ? LINE_THROUGH : "";
    const item=`<li class="item">
            <i class="fa ${DONE} co" job="complete" id="0"></i>
            <p class="text ${LINE}"> ${todo} </p>
            <i class="fa fa-trash-o de" job="remove" id="${id}"></i>
        </li>`;
    const position ="beforeend";
    list.insertAdjacentHTML(position,item);
}
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    if (LIST[element.id].done==false){
        LIST[element.id].done=true;
    }
    else{
        LIST[element.id].done=false; 
    }
}
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;

}
//event listeners
document.addEventListener("keyup",function(e){
    if (e.keyCode==13){
        if (input.value){
            addToDo(input.value,false,id,false);
            LIST.push({
                name:input.value,
                id: id,
                done: false,
                trash: false
            })
            id++;
            localStorage.setItem("TODO",JSON.stringify(LIST));   
        }
        input.value=""; 
    } 
})
list.addEventListener("click", function(e){
    const element =e.target;
    const elementJob= element.attributes.job.value;
    if (elementJob=="complete"){
        completeToDo(element);
    }
    else if (elementJob=="remove"){
        removeToDo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
})
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})



