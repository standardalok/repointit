 let win_s= localStorage.getItem("win");
            let lost_s= localStorage.getItem("lost");
            let tie_s= localStorage.getItem("tie");
            let a=document.getElementById("s1");
            let b=document.getElementById("s2");
            let c=document.getElementById("s3");
            let d=document.getElementById("yc");
            let e=document.getElementById("cc");
            
            
            if(win_s==null || lost_s==null || tie_s==null){
                localStorage.setItem("win",0);
                localStorage.setItem("tie",0);
                localStorage.setItem("lost",0);
                a.innerText= "win="+0;
                b.innerText= "lost="+0;
                c.innerText= "tie="+0;
        }
            let result={
            win:win_s,
            lost:lost_s,
            tie:tie_s,
            display:function(){
                return `number of won ${result.win} \n and lost ${result.lost} \n and tie ${result.tie}`;
            }
            }
            a.innerText= "win="+win_s;
            b.innerText= "lost="+lost_s;
            c.innerText= "tie="+tie_s;


            let cmpchoice;
            let randomno;
            function cmpchoice1(){
                randomno=Math.random()*10;
                if(randomno>0 && randomno<=3 ){
                cmpchoice=`Rock`;
            }
            else if(randomno>3 && randomno<=7){
                cmpchoice=`Paper`
            }
            else{
                cmpchoice=`Scissor`;
            }
            return cmpchoice;
        }
        function won(x,y){
            let msg1=`You Choose Rock`;
            let msg2=`You Choose Paper`;
            let msg3=`You Choose Scissor`;
            if(x===`Rock`){
                if(y===`Rock`){
                    result.tie++;
                }
                else if(y===`Paper`){
                    result.lost++;
                }
                else{
                    result.win++;                    
                } 
            }
            else if(x===`Scissor`){
                if(y===`Rock`){
                    result.win++;
                }
                else if(y===`Paper`){
                    result.lost++
                }
                else{
                    result.tie++;
                } 
            }
            if(x===`Paper`){
                if(y===`Rock`){
                    result.lost++;
                }
                else if(y===`Paper`){
                    result.tie++;
                }
                else{
                    result.win++;
                } 
            }
        localStorage.setItem("win",result.win);
        localStorage.setItem("tie",result.tie);
        localStorage.setItem("lost",result.lost);

        a.innerText= "win="+result.win;
        b.innerText= "lost="+result.lost;
        c.innerText= "tie="+result.tie;
        e.innerText= "computer choice="+cmpchoice;
        }