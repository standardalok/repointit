#include<stdio.h>
int main()
{
    int i;
    char w='>';
    int sal[100];
    sal[0]=5,
    sal[1]=6,
    sal[2]=7,
    sal[3]=8,
    sal[4]=9,
    sal[5]=10,
    sal[10]=11,
    sal[11]=12,
    sal[12]=13,
    sal[130]=15;
    for(i=0;i<=150;i++)
    {
        printf("%d %c %d",sal[i],w,i);
        printf("\n");
    }
    return 0;
}