#include<stdio.h>
int main()
{
    FILE *ptr1;
    char name[50];
    int age;
    ptr1=fopen("180_paragraphs_data.txt","w+");
    if(ptr1==NULL)
    {
        printf("error ...........");
    }
    printf("enter the data you want to enter of the student");
    scanf("%s%d",&name,&age);
    fprintf(ptr1,"the name of the student is %s and the age is %d",name,age);
    fcloseall();
    return 0;
}