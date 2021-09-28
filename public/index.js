const nav_link = document.querySelectorAll("a");
const body = document.querySelector("#pages");
const tbody = document.querySelector(".tbody");

function indexPage(){
    fetch("json/")
    .then((response)=>{
        if(response.ok){
           return response.json();
        };
    }).then((data)=>{
        data = data.sort((a,b)=>{
            if(a.name > b.name){
                return 1;
            }
            if(a.name < b.name){
                return -1;
            } return 0
        });
        tablePopulate(data);
    });
}
function modifierPage(){
    fetch("modifier")
    .then((response)=>{
        if(response.ok){
            response.text().then(data =>{
                body.innerHTML=data;
            });
         }
    });
    fetch("json/")
            .then((response)=>{
                if(response.ok){
                    return response.json();
                };
                }).then((data)=>{
                data = data.sort((a,b)=>{
                    if(a.name > b.name){
                        return 1;
                    }
                    if(a.name < b.name){
                        return -1;
                    } return 0
                });
                for(row in data){
                    document.querySelector(".form-select").innerHTML+=`<option value='${data[row].name}'>${data[row].name}</option>`;
                };
                return tempdata = data;
            });
    nav_link[0].classList.remove("active");
    nav_link[2].classList.remove("active");
    nav_link[1].classList.add("active");
}
//populate table com o que foi recebido 
function tablePopulate(data){
    for(row in data){
        let {name, bomdia, queiroz, date} = data[row];
        if(bomdia < queiroz){
            bdspan = `<span class="btn btn-success">${bomdia}</span>`;
            qzspan = `<span class="btn btn-danger">${queiroz}</span>`;}
        if(bomdia > queiroz){
            bdspan = `<span class="btn btn-danger">${bomdia}</span>`;
            qzspan = `<span class="btn btn-success">${queiroz}</span>`;}
        if(bomdia == queiroz || bomdia < 0.10 || queiroz < 0.10){
            bdspan = `<span class="btn btn-secondary">${parseFloat(bomdia)}</span>`;
            qzspan = `<span class="btn btn-secondary">${parseFloat(queiroz)}</span>`;}
        tbody.innerHTML+=`<tr><td>${row}</td><td>${name}</td><td>${bdspan}</td><td>${qzspan}</td></tr>`;
    }
}
function checkbox(){
        check = document.querySelector("input[type=checkbox]");
        selec = document.querySelector(".form-select");
        input = document.querySelector(".produto");
        bomdia = document.querySelector(".bomdia");
        queiroz = document.querySelector(".queiroz");
        if(check.checked == true){
            selec.style.display ="block";
            input.style.display="none";
        } else {
            selec.style.display="none";
            bomdia.value = 0;
            queiroz.value = 0;
            input.style.display="block";
        }
        selec.addEventListener("click",(e)=>{
            console.log(tempdata[selec.value])
            bomdia.value = tempdata[selec.value].bomdia;
            queiroz.value = tempdata[selec.value].queiroz;
        });
        document.querySelector("button[type=submit]").addEventListener("click",()=>{
            if(check.checked == true){
                form = new FormData(document.querySelector("#form"));
                fetch("/json/", {
                    method: "PUT",
                    body: form
                  });
            }
        })
}
if(window.location.hash){
    switch(window.location.hash){
            case "#modifier":
                modifierPage();
            break;
            default:
                indexPage();
            break;
    }
} else {
indexPage();
}