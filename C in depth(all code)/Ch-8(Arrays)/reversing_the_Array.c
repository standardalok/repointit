#include<stdio.h>
int main()
{
    int i,j,temp;
    int sal[5]={10,25,23,65,86};
    int dum[5];
    for(i=4,j=0;j<5,i>=0;j++,i--)
    {
        temp=sal[i];
        dum[j]=temp;
        sal[i]=temp;
    }
    for(j=0;j<5;j++)
    {
        printf("rev array is %d\n",dum[j]);
    }
    return 0;
}