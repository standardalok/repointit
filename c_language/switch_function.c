# include <stdio.h>
int main()
{
    int a,b;
    char symbol;
    printf("enter the two numbers:");
    scanf(" %d,%d",&a,&b);
    printf("give the symbol(+,/,-,*):");
    scanf(" %c",&symbol);
    switch(symbol)
    {
        case '+':
            printf("the sum of the two numbers is: %d",a+b);
            break;
        case '-':
            printf("the difference of two numbers is:%d ",a-b);
            break;
        case '*':
            printf("the product of two numbers is:%d",a*b);
            break;
        case '/':
            if (b != 0)
            {
                printf("the division of two numbers is: %d",a/b);
            }
            else
            {
                printf("try next time");
            }
            break;
        default:
            printf("enter the valid symbol");
    }
    return 0;
}