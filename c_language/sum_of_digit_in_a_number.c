#include<stdio.h>
int main()
{
    int num,remainder,reverse=0;
    printf("Enter a number: ");
    scanf("%d", &num);
    while(num!=0)
    {
        remainder=num%10;
        reverse=reverse*1+remainder;
        num /=10;
    }
    printf("sum of the digit is %d",reverse);
    return 0;
}