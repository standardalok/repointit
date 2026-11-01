#include<iostream>

int main(){
    using namespace std;
    string name;
    int age;
    cout<<"what is your age";
    cin>>age;
    cout<<"your age is "<<age<<"\n";

    cout<<"what is your name";
    getline(cin>>ws,name);
    cout<<"your name is"<<name;
}