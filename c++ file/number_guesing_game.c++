#include<iostream>
#include<ctime>

int main(){
    using namespace std;
    srand(time(NULL));
    int n=(rand()%50)+1;
    int m;
    int tries =0;
    do{
        cout<<"Enter The Number";
        cin>>m;
        tries++;
        if(m<n){
            cout<<"Too Low \n";
        }
        else if(m>n){
            cout<<"Too High"<<"\n";
        }
        else{
            cout<<"Correct Guess"<<endl;
            cout<<"Number of Tries"<<tries;
        }
    }while(m!=n);

    return 0;

}