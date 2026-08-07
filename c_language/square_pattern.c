#include<stdio.h>
#include"header_file.h"
int main()
{
    int i,columns,n,rows;
    printf("enter the number of columns and rorowss in rectangle:");
    scanf("%d,%d",&columns,&rows);

    for(i=1;i<=columns;i++)
    {
        if(i==1 || i==columns)
        {
         star(columns,rows);
        }
        else
        {
            star2(columns,rows);
        }
    }
}