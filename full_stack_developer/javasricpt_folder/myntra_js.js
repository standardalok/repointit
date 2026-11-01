h_l=[];
let product=[
    {raing:'4.5|1.4k',item_name:"payjama",item_des:"pehno chaap ke",act_rate:4562,disc_per:83},
    {raing:'4.3|5k',item_name:"lungi",item_des:"ghuma ke pehno",act_rate:361,disc_per:73},
    {raing:'4.5|1.4k',item_name:"dhoti",item_des:"ganda bohot jaldi hota hai",act_rate:80,disc_per:90},
    {raing:'4.5|1.4k',item_name:"white wali dhoti",item_des:"isko toh pehno hi mat",act_rate:10000,disc_per:50},
    {raing:'4.5|1.4k',item_name:"very white wali dhoti",item_des:"arram se pehno",act_rate:150,disc_per:5},
    {raing:'1.5|4k',item_name:"shirt",item_des:"button lagake",act_rate:7000,disc_per:60},
    {raing:'3.8|300',item_name:"narangi shirt",item_des:"dhyan se button lagana",act_rate:821,disc_per:29},
    {raing:'5|5630',item_name:"vilayati shirt",item_des:"button ke saath zip bhi laga lena",act_rate:433,disc_per:19},
    {raing:'4.5|1.4k',item_name:"tshirt",item_des:"turant pehn lo",act_rate:1000,disc_per:21},
    {raing:'4.7|7k',item_name:"rumali roti",item_des:"khao pehne wali chiz nhi hai",act_rate:799,disc_per:42}
];



//----------------item selector section--------------------
let a=document.querySelectorAll(".rc");
let b=document.querySelectorAll(".pn");
let d=document.querySelectorAll(".pd");
let e=document.querySelectorAll(".price");
let f=document.querySelectorAll(".d_price");
let g=document.querySelectorAll(".d_perc");
let item_a=document.querySelectorAll(".cb1")
let search_bar=document.querySelector("#i110")
let a1=document.querySelectorAll(".cb2")
//---------------------------------------


let price_dis=function(price,dis_pers){
    let n=(price-((price*dis_pers)/100));
    return n;
}





let c=function(){
    for(let w=0;w<a.length;w++){
        a[w].innerText=product[w].raing;
        b[w].innerText=product[w].item_name;
        d[w].innerText=product[w].item_des;
        e[w].innerText=`Rs${Math.round(price_dis(product[w].act_rate,product[w].disc_per))}`;
        f[w].innerText=`Rs${product[w].act_rate}`;
        g[w].innerText=`${product[w].disc_per}%`;

    }
}
c();


let p=function(){
    for(let w=0;w<10;w++){
        let v=Math.round((Math.random(2)*10));
        console.log(v,"1st");
        newhtml=`
        <img src="/assets/c${v}.jpg">
        `
        a1[w].innerHTML=newhtml;
        console.log(v); 
    }
}
p()

let num1=0

let add_item=function(indexs){
    let itema=item_a[indexs-1];
    console.log(itema);
    num1++;
    console.log(num1);
}

let bag_Adder=function(){
    
}


let x5;

let search=function(){
    let x2=search_bar.value;
    let x4=1;
    for(let i=0;i<product.length;i++){
        if(x2==product[i].item_name){
            console.log(`${product[i].item_name} founded at ${i}th index`);
            x5=product[i];
            console.log(x5);
            x4=0;
            return x5;
        }             
    }
    if(x4==1)
        console.log("Not Founded");
}


let delete_function=function(num){
    let elem=item_a[num-1];
    let d_button=document.createElement("button");
    d_button.innerText="Delete";
    elem.appendChild(d_button);
    d_button.classList.add("del_button");
}

let delete_btn_function=function(num){
    let elem1=item_a[num-1]
    elem1.removeChild(d_button);
}

const b1=document.querySelector(".del_button");
b1.addEventListener("click",delete_btn_function(5));
