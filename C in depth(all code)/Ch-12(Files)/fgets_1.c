#include<stdio.h>
int main()
{
    FILE *ptr1;
    ptr1=fopen("180_paragraphs_data.txt","r+");
    char input[10];
    while(fgets(input,5,ptr1)!=NULL)
    puts(input);
    fcloseall();
    return 0;
}