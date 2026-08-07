#include<stdio.h>
int main()
{
    FILE *ptr1;
    ptr1=fopen("180_paragraphs_data.txt","r");
    if (ptr1==NULL)
    {
        printf("during file opening their is an error ..............\n");
    }
    else
    {
        printf("successfully opened the file........................\n");
    };
    int n=fcloseall();
    if (n==EOF)
    {
        printf("error in closing");
    }
    else
    {
        printf("successfully closed the file.................w........");
    };
    return 0;
}