#include<iostream>

using namespace std;


class Pizza{
    public:
    string topping_1;
    string topping_2;

    Pizza(){
        cout<<"The base type of the pizza"<<endl;
    }
    Pizza(string topping_1){
        this->topping_1=topping_1;
    }

    Pizza(string topping_1,string topping_2){
        this->topping_1=topping_1;
        this->topping_2=topping_2;
    }
};



int main(){
    Pizza p1;
    Pizza p2("Tomato");
    Pizza p3("Paneer","Onion");

    cout<<p2.topping_1<<endl;
    cout<<p3.topping_1<<endl;
    cout<<p3.topping_2<<endl;

    return 0;

}