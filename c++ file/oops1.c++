#include<iostream>

using namespace std;

class human{
    public:
    string name;
    string occupation;
    int age;
    void speak(){
        cout<<"Hello To Every One"<<endl;
    };
    void age_speak(){
        cout<<"My Age Is: "<<age;
    };
};
int main(){

    human h1;
    human h2;
    h1.name="Alok";
    h1.occupation="Software Engineer";
    h1.age=20;

    h2.name="Naman";
    h2.occupation="Electrical Engineer";
    h2.age=20;    

    cout<<"First Object Name Is :"<<h1.name<<endl;
    cout<<"First Object Occupation Is :"<<h1.occupation<<endl;
    cout<<"First Object Age Is :"<<h1.age<<endl;

    cout<<"Second Object Name Is :"<<h2.name<<endl;
    cout<<"Second Object Occupation Is :"<<h2.occupation<<endl;
    cout<<"Second Object Age Is :"<<h2.age<<endl;



    h1.speak();
    h1.age_speak();

    cout<<"First Object Address Of Age Is :"<<&h1.age<<endl;


}