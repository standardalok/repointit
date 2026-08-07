#include<stdio.h>

int main()
{
int a,i=1,factorial=1;
printf("Enter The Number:");
scanf("%ld",&a);
while(i<=a)
{
    factorial=factorial*i;
    printf("the factorial of %d is %ld \n",a,factorial);
    i+=1;
}
return 0;
}