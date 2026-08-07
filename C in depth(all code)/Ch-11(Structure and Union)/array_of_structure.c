#include<stdio.h>
struct student{
    char name[20];
    int age;
    int rollno;
    int marks;
};
int main(){
struct student st[2]={{"ljnafjsak",15,456,986},{"kola",74,78,3478}};
printf("the name of first student is %s whose age is %d having rollno is %d and got the marks %d",st[0].name,st[0].age,st[0].rollno,st[0].marks);
return 0;
}