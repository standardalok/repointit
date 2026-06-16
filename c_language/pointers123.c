#include<stdio.h>

int main()
{
    int a=10,*p1=&a;
    int z,w,s;
    printf("the numbers are %p,%p,%p \n",&a,&p1,&*p1);
    z=p1++;
    w=*p1++;
    s=z-w;
    printf("%p,%p,%p",&p1,&*p1,&s);
    return 0;
}