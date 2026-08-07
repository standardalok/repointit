#include<stdio.h>
struct student{
    char name[20];
    int age;
    int rollno;
    int marks;
    struct date{
        int admission_date;
        int enrollment_date;
        int course_complete_date;
}birthdate;
}st1,st2,st3;
int main()
{
    struct student st1 ={"alok",45,79,73,{1999,1346,7359}};
    printf("the name of the student is %s of age %d having rollno %d get marks %d whose admission date is %d and enrollment date is %d and course completion date is %d",st1.name,st1.age,st1.rollno,st1.marks,st1.birthdate.admission_date,st1.birthdate.enrollment_date,st1.birthdate.course_complete_date);
    return 0;
}