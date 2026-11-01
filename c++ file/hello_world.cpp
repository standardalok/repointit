#include<iostream>

namespace first{
    int x=1;
}

namespace second{
    int x=2;
}

int main(){
    
    const::std::string name="ALok";
    std::cout<<name;
    std::cout<<"\n"<<second::x;
    return 0;
}