#include<stdio.h>
int n,columns,rows;
int star(int columns,int rows)
    {
         for(n=1;n<=rows;n++)
            {
            printf("*");
            }
            printf("\n"); 
    }
int star2(int columns,int rows)
{
    for(n=1;n<=rows;n++)
            {
                if(n==1 || n==rows)
                {
                    printf("*");
                }
                else
                {
                    printf(" ");
                }
            }
            printf("\n");
}      