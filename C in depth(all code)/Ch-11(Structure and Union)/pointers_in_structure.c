#include<stdio.h>
#include<string.h>
struct student{
    char name[50];
    int age;
    int rollno;
    int marks;
};
struct student st1,*ptr;
int main(){
    struct student st1= {"alok",8,10,97};
    ptr=&st1;
    printf("Name of the Student 1 is %s\n",(*ptr).name);
    printf("Name of the Student 1 is %s\n",st1.name);
    printf("Name of the Student 1 is %s",ptr->name);
}