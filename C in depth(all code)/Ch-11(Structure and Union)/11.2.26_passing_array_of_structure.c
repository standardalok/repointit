#include<stdio.h>
struct student{
    char name[80];
    int age;
    int rollno;
    int marks;
};
void display(struct student stu){
    printf("the name of the student is %s\n",stu.name);
    printf("the age of the student is %d\n",stu.age);
    printf("the rollno of the student is %d\n",stu.rollno);
    printf("the marks of the student is %d",stu.marks);
};
int main(){
    int i;
    struct student stu[3]={
        {"alok",10,5,97},
        {"kola",12,6,64},
        {"akol",15,7,67}
    };
    for(i=0;i<3;i++)
    {
        printf("the %d student is ",i+1);
        display(stu[i]);
        printf("\n");
    }
    return 0;
}