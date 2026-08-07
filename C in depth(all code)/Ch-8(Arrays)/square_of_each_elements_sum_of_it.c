#include<stdio.h>
int main()
{
    int i,j;
    char temp='j';
    char temp1='c';
    int dum1[10]={56,78,96,35,3,97};
    int dum[50];
    int sal[10]={12,23,34,56,67,78,89};
    for(i=0;i<=10;i++)
    {
        for(j=0;j<=10;j++)
        {
            printf("%c%d\n",temp,j);
        }
        printf(".................................%c%d\n",temp1,i);
    }
    return 0;
}