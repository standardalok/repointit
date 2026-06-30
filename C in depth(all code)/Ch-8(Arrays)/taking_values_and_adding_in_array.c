#include<stdio.h>
int main()
{
    int i;
    int sum=0;
    int sal[5];
    for(i=0;i<5;i++)
    {
        printf("enter the data in ar[%d]",i);
        scanf("%d",&sal[i]);
    }
    for(i=0;i<5;i++)
    {
        sum+=sal[i];
    }
    printf("%d",sum);
    return 0;
}