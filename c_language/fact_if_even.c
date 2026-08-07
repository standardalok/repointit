#include <stdio.h>
int main()
{
    int i=1,j=1,fact=1,num;
    printf("enter the number till which you want to calculate:");
    scanf("%d",&num);
    while(i<=num)
    {
        j=1;
        if (i%2==0)
        {
            while(j<=10)
            {
                printf("the table of %d are:",i);
                printf("%dx%d=%d",i,j,i*j);
                printf("\n");
                j++;
            }
        }
        else
        {
            fact=1;
            while(j<=i)
            {
                fact=fact*j;
                j++;
            }
            printf("fact of %i is = %d",i,fact);
            printf("\n");
        }
        i++;
        printf("\n");
    }
    return 0;
}
