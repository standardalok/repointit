#include<iostream>

using namespace std;

class Stove{
    private:
    int temp=0;
    public:
    int get_Temp(){
        return temp;
    }
    void set_temp(int temp){
        this->temp=temp;
    }
};


int main(){
    Stove s1;
    cout<<"The temperature of the Stove is :"<<s1.get_Temp()<<endl;
    s1.set_temp(4);

    
    cout<<"The temperature of the Stove After Changing is :"<<s1.get_Temp()<<endl;
    
  
  
  
    return 0;
}