#include<stdio.h>
int main()
{
    FILE *ptr1;
    char chr;
    ptr1=fopen("180_paragraphs_data.txt","r");
    if(ptr1==NULL)
    {
        printf("error in opening file.......................");
    }
    else
    {
        chr=fgetc(ptr1);
        while(chr!=EOF)
        {
            printf("%c",chr);
            chr=fgetc(ptr1);
        }
        printf("successfully printed the file data ......................");
        fcloseall();
        return 0;
    }
}