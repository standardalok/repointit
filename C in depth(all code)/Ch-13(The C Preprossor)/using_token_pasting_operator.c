#include<stdio.h>
#define sum(a,b,c,d) printf("the number is %d",(a##b)+(c##d));

int main()
{
    int m1=40,m2=20,m3=50;
    sum(m,1,m,2);
    return 0;

}