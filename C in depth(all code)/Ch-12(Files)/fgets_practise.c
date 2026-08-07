#include<stdio.h>
int main()
{
    FILE *ptr1;
    ptr1=fopen("180_paragraphs_data.txt","r+");
    char intake[50];
    while((fgets(intake,7,ptr1)!=NULL))
    puts(intake);
    fcloseall();
    return 0;
}