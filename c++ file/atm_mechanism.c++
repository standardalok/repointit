#include<iostream>

using namespace std;
int d_bank_acc_no=26586;
int d_pin=84;

void acc_num_change();
void pin_change();

int main(){
    int choice;
    int bank_acc;
    int pin;
    
    cout<<"#################################";
    cout<<"Enter The Bank Account Number";
    cin>>bank_acc;
    cout<<"The size of the string";
    cout<<sizeof(bank_acc);
    cout<<"#################################";
    cout<<"Enter The Pin Of The Account";
    cin>>pin;
    cout<<"The size of the string";
    cout<<sizeof(bank_acc);
    
    
    // while(bank_acc!=d_bank_acc_no || pin!=d_pin ||sizeof(bank_acc)!=4||sizeof(pin)!=4){
    //     cout<<"#################################";
    //     cout<<"Enter The Bank Account Number"<<endl;
    //     cin>>bank_acc;
    //     cout<<"#################################";
    //     cout<<"Enter The Pin Of The Account"<<endl;
    //     cin>>pin;
    
    // };
    if(bank_acc==d_bank_acc_no && pin==d_pin){
            cout<<"#################################\n";
            cout<<"Choose The Respected Number Correspond To The Service\n";
            cout<<"1.For the account balance\n";
            cout<<"2.For the changing the account number\n";
            cout<<"3.For the changing the pin\n";
            cout<<"4.For the request of ATM card \n";
            cin>>choice;
            switch(choice){
                case 1:
                cout<<"Your Balance is 7 crore";
                break;

                case 2:
                acc_num_change();
                break;

                case 3:
                pin_change();
                break;

                case 4:
                cout<<"Your request has been registered and the atm card will be dispatched within 5 days";
                break;
            }
        }
    return 0;
}

void acc_num_change(){
    cout<<"enter the new account number";
    cin>>d_bank_acc_no;
    cout<<"Your New account number is :"<<d_bank_acc_no;
}

void pin_change(){
    cout<<"enter the new pin number";
    cin>>d_pin;
    cout<<"Your New account number is :"<<d_pin;
}