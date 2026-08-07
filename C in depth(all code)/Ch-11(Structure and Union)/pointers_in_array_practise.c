#include<stdio.h>
struct employee{
    char name[90];
    int age;
    int salary;
    int experience;
}emp1;

int main(){
    struct employee emp1={"alok",20,500000,10};
    struct employee *ptr=&emp1;
    printf("name of the employee is %s\n",(*ptr).name);
    printf("age of the employee is %d\n",ptr->age);
    printf("salary of the employee is %d\n",emp1.salary);
    printf("experience of the employee is %d",ptr->experience);
    return 0;
}
