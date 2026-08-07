#include<stdio.h>
struct student{
    char name[50];
    int age;
    int rollno;
    int marks;
};
int main()
{
    struct student st1 = {"alok",4,15,159};
    struct student st2,st3,st4;
    printf("the name of first student is %c whose age is %d having rollno is %d and got the marks %d",st1.name,st1.age,st1.rollno,st1.marks);
    printf("enter the name age rollno marks of student2");
    scanf("%s %d %d %d",&st2.name,&st2.age,&st2.rollno,&st2.marks);
    printf("the name of second student is %s whose age is %d having rollno is %d and got the marks %d",st2.name,st2.age,st2.rollno,st2.marks);
    return 0;
}
