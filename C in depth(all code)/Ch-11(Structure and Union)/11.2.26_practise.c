#include<stdio.h>
struct student {
    char name[80];
    int age;
    int rollno;
    int marks;
};
void display(struct student stu){
    printf("the name of the student is %s\n",stu.name);
    printf("the age of the %s is %d\n",stu.name,stu.age);
    printf("the rollno of the %s is %d\n",stu.name,stu.rollno);
    printf("the marks of the %s is %d",stu.name,stu.marks);
};
int main(){
    struct student stu[10]={
        {"alok",10,11,99},
        {"lokn",10,12,67},
        {"polk",10,13,92},
        {"lokp",12,14,93},
        {"aok",10,11,99},
        {"lok",10,12,67},
        {"olk",10,13,92},
        {"lok",12,14,93},
        {"pollk",10,13,92},
        {"lookp",12,14,93},
    };
    int i;
    for(i=0;i<10;i++){
        printf("the %d student is",i+1);
        display(stu[i]);
        printf("\n");
    }
    return 0;
}

