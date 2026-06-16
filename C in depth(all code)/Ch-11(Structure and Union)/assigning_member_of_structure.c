#include<stdio.h>
#include<string.h>
struct student{
    char name[50];
    int age;
    int rollno;
    int marks;
}st1,st2,st3;
int main()
{
    struct student st1 = {"Marry",10,4,76};
    strcpy(st2.name,"john");
    st2.age =20;
    st2.rollno=49;
    st2.marks=79;
    printf("the name of second student is %s of age %d having roll no %d got the marks %d",st2.name,st2.age,st2.rollno,st2.marks);
    return 0;
}