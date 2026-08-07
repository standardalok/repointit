#include<stdio.h>
int main()
{
    FILE *ptr1;
    int chr;
    if((ptr1=fopen("180_paragraphs_data.txt","w+"))==NULL)
    {
        printf("error in opening of file");
    }
    else
    {
        printf("Enter the text");
        while((chr=getchar())!=EOF)
        {
            fputc(chr,ptr1);
        }
        fcloseall();
        return 0;
    }
}