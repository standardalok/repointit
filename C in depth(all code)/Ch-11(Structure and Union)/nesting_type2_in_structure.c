#include<stdio.h>
struct date{
    int day;
    int month;
    int year;
};
struct student{
    char name[90];
    int age;
    int marks;
    int rollno;
    struct date birthdate;
};
int main()
{
    struct student st1 ={"alok",45,79,73,{1999,1346,7359}};
    printf("the name of the student is %s of age %d having rollno %d get marks %d whose admission date is %d and enrollment date is %d and course completion date is %d",st1.name,st1.age,st1.rollno,st1.marks,st1.birthdate.day,st1.birthdate.month,st1.birthdate.year);
    return 0;
}