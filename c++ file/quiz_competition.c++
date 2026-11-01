#include<iostream>

using namespace std;

int main(){

    string q[]={
        "1.What is The Name Of The Owner Of This Computer.",
        "2.What Is The Time Is It Being Coded.",
        "3.What is The Favourite Color Of Alok.",
        "4.What Is The Date Of Birth Of Alok.",
        "5.According To Alok Which Is The Best App For Vibe Coding."
    };

    string A[][5]={
        {"A.Admin","B.Naman","C.Alok","D.Gupta Ji"},
        {"A.27-September","B.2-October","C.15-August","D.29-November"},
        {"A.Green","B.Blue","C.Red","D.Orange"},
        {"Nhi Batane wala hu","Kuch Bhi Krlo","Chalo Try Krlo","@20 ka Ho Gya hu Thats it"},
        {"A.Codex","B.AntiGravity","C.Cursor","D.Loveable"}
    };

    char B[]={'C','A','C','D','B'};
    
    cout<<"The Following Questions Are As Follows"<<"\n";
    cout<<"######################################"<<"\n";
    for(int i=0;i<4;i++){
        cout<<q[i]<<"\n";
        for(int j=0;j<5;j++){
                cout<<A[i][j]<<"\n";
            };
            cout<<"##############################################"<<"\n";
        };
    
    cout<<"######################################";
}