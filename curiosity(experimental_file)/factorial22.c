#include<stdio.h>
int main()
{
    int i,z,fact=1;
    printf("enter the number:");
    scanf("%d",&i);
    for(z=1;z<=i;z++)
    {
        fact=fact*z;
    }
    printf("%d",fact);
    return 0;
}
