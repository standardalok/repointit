#include<stdio.h>
int main()
{
    int i;
    int sal[5];
    for(i=0;i<5;i++)
    {
        printf("enter the value of sal[%d]:",i);
        scanf("%d",&sal[i]);
    }
    int lar_val=sal[0];
    int small_val=sal[0];
    for(i=0;i<5;i++)
    {
        if(sal[i]>lar_val)
        {
            lar_val=sal[i];
        }
        else if(sal[i]<small_val)
        {
            small_val=sal[i];
        }
    }
    printf("the largest number is %d",lar_val);
    printf("the smallest number is %d",small_val);
    return 0;
}