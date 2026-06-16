#include<stdio.h>
int main()
{
    char c='.',o='<';
    int i=1,rows,j=1,z=1,space;
    printf("enter the number of rows you want to print:");
    scanf("%d",&rows);
    for(i=1;i<=rows;i++)
    {
        for(space=1;space<=rows-i;space++)
        {
            printf(" ");
        }
        for(j=1;j<=i;j++)
        {
            printf("%d%c",z++,c);
        }
        printf("\n");
    }
    return 0;
}