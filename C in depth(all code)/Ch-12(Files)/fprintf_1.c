#include<stdio.h>
int main()
{
    FILE *ptr1;
    ptr1=fopen("180_paragraphs_data.txt","w+");
    int data,i;
    struct student{
        char name[40];
        int age;
    }st1;
    if(ptr1==NULL)
    {
        printf("error in opening of file.........");
    }
    printf("enter the number of data you want to enter................:");
    scanf("%d",&data);
    for(i=0;i<data;i++)
    {
        printf("enter name and age of the student:");
        scanf("%s%d",&st1.name,&st1.age);
        fprintf(ptr1,"%s%d",st1.name,st1.age);
    }
    printf("Data inputted successfully.............");
    fcloseall();
    return 0;
}
