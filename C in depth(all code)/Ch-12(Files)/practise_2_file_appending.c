#include<stdio.h>
int main()
{
    FILE *ptr1;
    ptr1=fopen("180_paragraphs_data.txt","w+");
    char chr;
    if(ptr1==NULL)
    {
        printf("error in opening of file...........");
    }
    else
    {
        printf("start typing.................");
        chr=getchar();
        while(chr!=EOF)
        {
            fputc(chr,ptr1);
            chr=getchar();
        }
        printf("successfully put the character ...............");
        fcloseall();
        return 0;
    }
}