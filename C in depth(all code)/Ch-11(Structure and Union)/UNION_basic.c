#include<stdio.h>
#include<string.h>
union class{
    int rollno;
    int marks;
    int age;
}a1,a2,a3;

int main(){;
    a1.age=5;
    printf("the student of age %d  \n",a1.age);
    a1.marks=98;
    printf("got makrks %d\n",a1.marks);
    a1.rollno=15;
    printf("size of the union is %u\n",sizeof(a1));
    printf("of rollno %d",a1.rollno);
    return 0;
}
