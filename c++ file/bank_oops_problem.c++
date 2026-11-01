#include<iostream>

using namespace std;


class Bank{
    private:
        string name;
        int Balance;
        int pin;
        int acc_no;
    public:
    Bank(string name,int Balance,int pin,int acc_no){
        this->name=name;
        this->Balance=Balance;
        this->pin=pin;
        this->acc_no=acc_no;
    };
    void get_cust_info(){
        cout<<"The Name of The Customer is:"<<name<<endl;
        cout<<"The Balance Of The : "<<name<<" is "<<Balance<<endl;
        cout<<"The Pin Number Of The Customer Is"<<pin<<endl;
        cout<<"The Account Number Of The Customer Is "<<acc_no;
    };

    void deposit(int y,int x,int w){
        if(x==pin && y==acc_no){
            Balance+=w;
        }
        else
            cout<<"The Pin Or Acc No Is Incorrect"<<endl;
            return;
    };

    void withdraw(int y,int x,int w){
        if(x==pin && y==acc_no){
            Balance-=w;
        }
        else
            cout<<"The Pin Or Acc No Is Incorrect"<<endl;
            return;
    }; 
    void check_balance(int y,int x){
        if(y==acc_no && x==pin){
            cout<<"The Balance Of:"<<name<<"Is"<<Balance;
        }
        else
           cout<<"The Pin Or Acc No Is Incorrect"<<endl;
    };
};


int main(){

    Bank c1("Kola",5000,2525,24);
    Bank c2("Alok",700000,2165,33360);
    cout<<"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"<<endl;
    cout<<"The Data Of the First Customer Is"<<endl;
    c1.get_cust_info();
    c1.deposit(24,2525,12563);
    c1.check_balance(24,2525);
    cout<<"\n";
    c1.withdraw(24,2525,5000);
    c1.check_balance(24,2525);
    cout<<endl;
    cout<<"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"<<endl;
    cout<<"The Data Of The Second Customer Is"<<endl;
    c2.get_cust_info();
    c2.deposit(33360,2165,12563);
    c2.check_balance(33360,2165);
    cout<<"\n";
    c2.withdraw(33360,2165,5000);
    c2.check_balance(33360,2165);
    cout<<endl;


    return 0;
}