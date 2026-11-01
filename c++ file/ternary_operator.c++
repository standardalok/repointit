#include<iostream>
int main(){
    using namespace std;
    int age[10]={40,50,69,0,48,34,82,20};
    int y=0;
    for(int i=0;i<10;i++)
    {
        age[i]>60?y=1:y=0;
    }
    y==0?cout<<"old":cout<<"young";
    return 0;
}