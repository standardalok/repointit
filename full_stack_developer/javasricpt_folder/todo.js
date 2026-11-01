let h_l=[];

function n_e(){
    let a=document.querySelectorAll(".i");
    console.log(a[0].value,a[1].value);
    h_l.push(
        {
            item:a[0].value,
            date:a[1].value
        }
    );
}
function d_e(){
    let b=document.querySelector("#content");
    let newhtml=''
    for(let i=0;i<h_l.length;i++){
    newhtml+=`
    <span>${h_l[i].item}</span>
    <span>${h_l[i].date}</span>
    <button id="delete-button" onclick="
    h_l.splice(${i},1);
    d_e();">Delete</button>
    `
    localStorage.setItem(`h_l`,JSON.stringify(h_l));
    
};
if(h_l.length==0){
    localStorage.clear();
}
    b.innerHTML=newhtml;

}

let sm=(n1,n2)=> n1+n2;
