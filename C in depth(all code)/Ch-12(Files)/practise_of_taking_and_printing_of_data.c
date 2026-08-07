#include<stdio.h>
int main()
{
    FILE *ptr1;
    int chr;
    int input1;
    ptr1=fopen("180_paragraphs_data.txt","r+");
    if(ptr1==NULL)
    {
        printf("error in opening of the file...............");
    }
    else
    {
        printf("please choose 1 for getting data from file and 2 for putting data in the file");
        scanf("%d",&input1);
        if(input1==1)
        {
            chr=fgetc(ptr1);
            while(chr!=EOF)
            {
                printf("%c",chr);
                chr=fgetc(ptr1);

            }
            printf("successfully printed the data..................");
        }
        else
        {
        printf("enter the character to be inserted.......................");
        chr=getchar();
        while(chr!=EOF)
        {
            fputc(chr,ptr1);
            chr=getchar();
        }
        printf("successfully inserted the data....................");
        }
        fcloseall();
        return 0;

    }
}