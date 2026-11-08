h_l=[];

let Product_details=JSON.parse(localStorage.getItem("product"))


// let delete_button_checker=[];
// for(let i=0;i<10;i++){
//     delete_button_checker[i]=0;
// }

// localStorage.setItem("delete_button_checker",JSON.stringify(delete_button_checker))
let delete_button_checker=JSON.parse(localStorage.getItem("delete_button_checker"));

 

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
        a[w].innerText=Product_details[w].raing;
        b[w].innerText=Product_details[w].item_name;
        d[w].innerText=Product_details[w].item_des;
        e[w].innerText=`Rs${Math.round(price_dis(Product_details[w].act_rate,Product_details[w].disc_per))}`;
        f[w].innerText=`Rs${Product_details[w].act_rate}`;
        g[w].innerText=`${Product_details[w].disc_per}%`;

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


let x5;

let search=function(){
    let x2=search_bar.value;
    let x4=1;
    for(let i=0;i<Product_details.length;i++){
        if(x2==Product_details[i].item_name){
            console.log(`${Product_details[i].item_name} founded at ${i}th index`);
            x5=Product_details[i];
            console.log(x5);
            x4=0;
            return x5;
        }             
    }
    if(x4==1)
        console.log("Not Founded");
}


let delete_btn_function=function(num){
    let elem1=item_a[num-1]
    elem1.removeChild(d_button);
}


let cart_num=null;
let cart_id=document.querySelector("#counters");
let profile_selector=document.querySelector("#profile");

let dynamic_cart_numbering=function(x){
    if(x==null || x==0 || x<0){
        if(x<0){
            x=0
            return
        }
        else{
            profile_selector.removeChild(cart_id);
            cart_id.innerText=x;
            return;
        }
    }
    else
        profile_selector.appendChild(cart_id);
            cart_id.innerText=x;
}
let cart_num_increaser=function(num){
    if(delete_button_checker[num-1]==0){
        cart_num++;
        dynamic_cart_numbering(cart_num);
    }
    else 
        return
}

dynamic_cart_numbering(cart_num);

let cart_num_decreaser=function(){
    cart_num--;
    dynamic_cart_numbering(cart_num);
}

let delete_function=function(num){
    let elem=item_a[num-1];
    if(delete_button_checker[num-1]==0){
        let d_button=document.createElement("button");
        d_button.innerText="Delete";
        elem.appendChild(d_button);
        d_button.classList.add("del_button");
        d_button.addEventListener("click",cart_num_decreaser);
        d_button.addEventListener("click",function(){elem.removeChild(d_button)});
        d_button.addEventListener("click",function(){delete_button_checker[num-1]=0});
        d_button.addEventListener("click",function(){delete_button_checker[num-1]=0});
        d_button.addEventListener("click",function(){localStorage.setItem("delete_button_checker",JSON.stringify(delete_button_checker));});

        delete_button_checker[num-1]=1;
        delete_button_checker[num-1]=1;
        localStorage.setItem("delete_button_checker",JSON.stringify(delete_button_checker));
    }
    else
        return;
}