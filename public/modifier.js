checkbox = document.querySelector("input[type=checkbox]");
select = document.querySelector("select");
produto = document.querySelector(".produto");
bomdiaV = document.querySelector(".bomdia");
queirozV = document.querySelector(".queiroz");
button = document.querySelector("button[type=submit");

fetch("json/",{cache: "no-store"})
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
        a = data[row].name.slice(0,1);
        a = a.toUpperCase();
        b = data[row].name.slice(1);
        data[row].name = a+b;
        select.innerHTML+=`<option value='${row}'>${data[row].name}</option>`;
    };
    return tempData =data;
});
produto.addEventListener("keypress",()=>{
    if(produto.value.length > 8 & bomdiaV.value > 0.10 & queirozV.value > 0.10){
        button.disabled=false
    } else {
        button.disabled=true
    }
});
bomdiaV.addEventListener("change",()=>{
    if(produto.value.length > 8 & bomdiaV.value > 0.10 & queirozV.value > 0.10){
        button.disabled=false
    } else {
        button.disabled=true
    }
});
queirozV.addEventListener("change",()=>{
    if(produto.value.length > 8 & bomdiaV.value > 0.10 & queirozV.value > 0.10){
        button.disabled=false
    } else {
        button.disabled=true
    }
});
select.addEventListener("change",()=>{
    bomdiaV.value = tempData[select.value].bomdia;
    queirozV.value = tempData[select.value].queiroz;
    produto.value = tempData[select.value].name;
    console.table(tempData[select.value])
})
checkbox.addEventListener("click",()=>{
    if(checkbox.checked == true){
        produto.style.display="none";
        select.style.display="block";
    } else {
        produto.style.display="block";
        select.style.display="none";}
});
button.addEventListener("click",(event)=>{
    event.preventDefault();
    body = `name=${produto.value}&bomdia=${bomdiaV.value}&queiroz=${queirozV.value}`
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "json/", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () =>{
        if(xhr.status == 200){
            document.querySelector(".alert").innerHTML=
		`<strong>Comparador:</strong> Você Acabou de atualizar o produto: ${produto.value} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
		document.querySelector(".alert").classList.remove("visually-hidden");
        produto.value="";
        bomdiaV.value="";
        queirozV.value="";
        select.value="";
        button.disabled=true;
        } else {
            alert(`${xhr.status} : ${xhr.responseText}`);
        }
    }
    xhr.send(body);
})