#include<stdio.h>
struct student{
    char name[44];
    int rollno;
    int age;
    int marks;
};
void display(char name[],int rollno,int age,int marks){
    printf("The name of the student is %s\n",name);
    printf("the rollno of the student is %d\n",rollno);
    printf("the age of the student is %d\n",age);
    printf("the marks of the student is %d\n",marks);
};
int main(){
    struct student st1={"alok",1,45,87};
    struct student st2={"kola",2,23,97};
    struct student *ptr1=&st1;
    struct student *ptr2=&st2;
    display(ptr1->name,ptr1->rollno,ptr1->age,ptr1->marks);
    return 0;
}