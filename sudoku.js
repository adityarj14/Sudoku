const gameboard =document.querySelector("#gameboard");
const digits =document.querySelector("#digits");
const deleteNum = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");
let lastSelected =null;
let error = 0;

const puzzle = [
    "8-6-1----",
    "--3-64-9-",
    "9-----816",
    "-8-396---",
    "7-2-4-3-9",
    "---572-8-",
    "521-----4",
    "-3-75-2--",
    "----2-1-5",

//  "856917423",
//     "213864597",
//     "947235816",
//     "185396724",
//     "762148359",
//     "394572681",
//     "521683974",
//     "439751268",
//     "----29135",
];

const solution = [
    "856917423",
    "213864597",
    "947235816",
    "185396724",
    "762148359",
    "394572681",
    "521683974",
    "439751268",
    "678429135"
];

window.onload=(()=>{
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
          const div = document.createElement("div");
          div.classList.add("tile");
          div.addEventListener("click",selectTile);
          div.setAttribute("row",i);
          div.setAttribute("col",j);


          if(puzzle[i][j]!="-"){
            div.innerText= puzzle[i][j];
            div.classList.add("filled");
          }

          if(i==2|| i==5){
            div.classList.add("border-bottom");
          }

          if(j==2|| j==5){
            div.classList.add("border-right");
          }

         gameboard.appendChild(div);
       }
    }

   for(let i=0; i<9; i++){
    const div = document.createElement("div");
        div.classList.add("tile");
        div.addEventListener("click", addNumber);
        div.innerText = i+1;
        div.style.height = gameboard.querySelector(".tile").clientHeight+"px";
        digits.appendChild(div);
   }
});


function selectTile(){
    if(lastSelected !=null){
        lastSelected.classList.remove("select-tile");
    }
    lastSelected = this;
    lastSelected.classList.add("select-tile");
}
function addNumber(){
    if(lastSelected.innerText=="" || lastSelected.classList.contains("danger")){
        lastSelected.innerText = this.innerText;
    }
   
   let row = lastSelected.getAttribute("row");
    let col = lastSelected.getAttribute("col");
    if(solution[row][col]==lastSelected.innerText){
        lastSelected.classList.remove("danger");
       // alert("आपके द्वारा चुना गया नंबर सही है| (Correct)")
    }else{
        lastSelected.classList.add("danger");
       addErrorandDisplay();
        //alert("आपके द्वारा चुना गया नंबर गलत है| (Wrong)");

    }
    if(error>2){
        alert("Tumse naa ho payega!");
        location.reload();
    }

    if(isAllTilesfilled()){
        const allTiles = gameboard.querySelectorAll(".tile"); 
        let useranswer = [...allTiles].map((tile)=>{
          return tile.innerText;
        });
        let num = 0;
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                if(solution[i][j]!=useranswer[num]){
                    allTiles[num].classList.add("danger");
                }
                num++;
            }
        }


       let dangerclass = [...allTiles].some((tile)=>{
        return tile.classList.contains("danger");
       });

       if(dangerclass){
         if(error>2){
            alert("tumse naa ho payega!");
            location.reload();
         }
       }else{
        alert(" badhai ho aap jeet gaye hai !");
       }
    }
}

deleteNum.onclick=()=>{
    if(!lastSelected.classList.contains("filled")){
        lastSelected.innerText = "";
    }
    
}

function addErrorandDisplay(){
    error++;
    mistake.innerText = error;
}

function isAllTilesfilled(){
   const allTiles = gameboard.querySelectorAll(".tile");  // 3 dot se array me convert hota hai
  // console.log(allTiles);
   return [...allTiles].every((tile)=>{
        return tile.innerText!="";

   });
}
