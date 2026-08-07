#include<stdio.h>
struct student{
    char name[20];
    int class;
    int rollno;
    int marks;
};
int main()
{
    struct student st1= {"alok",4,15,89};
    int size1;
    size1=sizeof(struct student);
    printf("first student is %s whose class is %d rollno is %d marks is %d",st1.name,st1.class,st1.rollno,st1.marks);
    printf("\n");
    printf("The size of structure student is %d",size1);
    return 0;
}