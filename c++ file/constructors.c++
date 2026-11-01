#include<iostream>

using namespace std;


class Student{
    public:
    string name;
    int age;
    double cgpa;    

    Student(string name, int age ,double cgpa){
        this->name=name;
        this->age=age;
        this->cgpa=cgpa;
    }
};

int main(){

    Student s1("Alok",20,8.9);
    cout<<"The name of the student is :"<<s1.name<<endl;
    cout<<"The age of the student is :"<<s1.age<<endl;
    cout<<"The cgpa of the student is :"<<s1.cgpa<<endl;        

    return 0;
}