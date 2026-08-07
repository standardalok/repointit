#include <stdio.h>                                                   
int main()
{
    int a,b;
    char symbol;
    printf("give the two numbers");
    scanf(" %d.%d",&a,&b);
    printf("give the symbol(+,/,-,*):");
    scanf(" %c",&symbol);
    if(symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/' )
    {
        if (symbol == '+')
        {
            printf("the sum of the two numbers is: %d",a+b);
        }
        else if (symbol == '-')
        {
            printf("the difference of two numbers is:%d ",a-b);
        }
        else if (symbol == '*')
        {
            printf("the product of two numbers is:%d",a*b);
        }
        else if (symbol == '/')
        {
            if (b != 0)
            {
                printf("the division of two numbers is: %d",a/b);
            }
            else
            {
                printf("try next time");
            }
        }
    }
    else
    {
        printf("enter the valid symbol");
    }
    return 0;
}