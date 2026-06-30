#include<stdio.h>
struct st
{
    int age;
    char name[20];
};
struct st func(struct st car)
{
    car.age++;
    return car;
}
int main()
{
    struct st var ={10,"akola"};
    var=func(var);
    printf("%d",var.age);
    return 0;
}