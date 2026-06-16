#include<stdio.h>
int main()
{
    FILE *ptr1;
    int ch;
    ptr1=fopen("180_paragraphs_data.txt","w+");
    if(ptr1==NULL)
    {
        printf("error in opening of the file ..................");
    }
    else
    {
        printf("enter the characters............\n");
        ch=getchar();
        while(ch!=EOF)
        {
            fputc(ch,ptr1);
            ch=getchar();
        }
        printf("entered successfully................");
        fclose(ptr1);
        return 0;
    }
}