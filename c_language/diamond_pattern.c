#include<stdio.h>
int main()
{
    int i,j,z;
    printf("enter the number");
    scanf("%d",&z);
    for(i=1;i<=z;i++)
    {
        for(j=1;j<=z-i;j++)
        {
        printf(" ");
        }
        for(j=1;j<=i;j++)
        {
        printf("* ");
        }
        printf("\n");
    }
    for(i=z-1;i>=1;i--)
    {
        for(j=1;j<=z-i;j++)
        {
        printf(" ");
        }
        for(j=1;j<=i;j++)
        {
        printf("* ");
        }
        printf("\n");
    }               
    return 0;
}