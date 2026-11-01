#include<stdio.h>
int prime_check(int n);
int main(){
    int n;
    printf("enter the number:");
    scanf("%d",&n);
    prime_check(n);
    return 0;
}
int prime_check(int n){
    int i;
    for(i=2;i<n;i++)
        if(n%i==0)
           printf("given number is not prime");
}