
let addmessage = document.querySelector('.textbox'),
    addbutton = document.querySelector('.addbtn'),
    outlist = document.querySelector('.addlist'),
    contextMenu = document.querySelector('#myContextMenu'),
    contextmenuitem1 = document.querySelector('#item1');

let toDoList = [];


// Loading previous tasks
if(localStorage.getItem("outlist")){
    toDoList = JSON.parse(localStorage.getItem("outlist"));
    displayMessages();
};


// Adding new task
addmessage.addEventListener('keyup', (event)=>
{
    if (event.key === "Enter") {addNewItem();}
});

addbutton.addEventListener('click', addNewItem);

function addNewItem(){
    let code = true;
    let regex = /^\s*$/;
    if( regex.test(addmessage.value)) {code = false;};
    if(toDoList.length != 0) {
        toDoList.forEach(element=>{
            if( addmessage.value === element.todo) {code = false;}
        });
    };

    if(code)
    {
        let newTask = {
            todo: addmessage.value,
            checked: false,
            completed: false
        };
    
        toDoList.push(newTask);
        displayMessages();
        localStorage.setItem("outlist", JSON.stringify(toDoList))
        
    }
    addmessage.value = "";
}

// Drawing content of existing Task List
function displayMessages(){

    let displayMessage = '';
    if(toDoList.length === 0) outlist.innerHTML = '';

    toDoList.forEach(function(item, i){
        displayMessage += `
        <li>
        <input type='checkbox' id ='item_${i}' ${item.checked ?'checked' : ''}>
        <label for="item_${i}" style="${item.checked ?"text-decoration: line-through;":""}">${item.todo}</label>
        </li>`
        
        outlist.innerHTML = displayMessage;

    });
};


// Check-box events
outlist.addEventListener("change",function(event){
   let valuelabel = outlist.querySelector('[for ='+ event.target.getAttribute("id") + ']').innerHTML;
    
   toDoList.forEach(function(item){
    if (item.todo === valuelabel) {
        item.checked = !item.checked;
        localStorage.setItem("outlist", JSON.stringify(toDoList));
        displayMessages();
    }
   });

});


// Context-menu events
outlist.addEventListener('contextmenu',(event)=>{
    event.preventDefault();
    contextMenu.style.top = event.pageY + "px";
    contextMenu.style.left = event.pageX + "px";
    contextMenu.style.display = "block";
    contextmenuitem1.addEventListener('click',function(){
        toDoList.forEach(function(item,i){
            if(item.todo === event.target.innerHTML){

                toDoList.splice(i,1);   
                displayMessages();
                localStorage.setItem("outlist", JSON.stringify(toDoList));
            }
            contextMenu.style.display = "none";
        })

    })
})

document.addEventListener("click", function(event) {
    if (!contextMenu.contains(event.target)) {
      contextMenu.style.display = "none";
    }
});