#include<iostream>

int main(){
    using namespace std;

    string Food[12];
    fill(Food,Food+10,"aman");
    for(string i:Food){
        cout<<i<<"\n";
    }
    return 0;
}