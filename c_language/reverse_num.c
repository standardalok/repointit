#include<stdio.h>
int main()
{
    int num,remainder,reverse=0;
    char ab='r';
    printf("enter the number");
    scanf("%d",&num);
    while(num!=0)
    {
        remainder=num%10;
        printf("reverse is %d%c\n",reverse,ab);
        reverse=reverse*10+remainder;
        printf("remainder is %d\n",remainder);
        printf("reverse is %d\n",reverse);
        num /= 10;  
    }
    return 0;
}