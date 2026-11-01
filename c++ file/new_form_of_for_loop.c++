#include<iostream>

int main(){
using namespace std;

string names[]={"Alok","Aman","Abhishek","Anjana moti ka","Aditya","Akoda","Alias","Alex"};
char grades[]={'A','B','C','D','E','F','G','H','I'};


for(string i : names){
    cout<<i<<"\t";
}
cout<<"\n";

for(char a:grades){
    cout<<a<<"\t";
}

return 0;

}