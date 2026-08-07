#include<stdio.h>
int main()
{
    int i,z;
    for(i=1;i<=10;i++)
    {
        for(z=1;z<=i;z++)
        {
            if(z==1 || z==i)
            {
                printf("* ");
            }
            else
            {
                printf(" ");
            }
        }
        printf("\n");
    }
    return 0;
}