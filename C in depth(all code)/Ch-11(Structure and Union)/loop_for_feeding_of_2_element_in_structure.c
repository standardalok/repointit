#include<stdio.h>
struct teacher{
    char name[50];
    int age;
    int experience;
    int salary;
};
int main()
{
    int i;
    struct teacher tech[2];
    for(i=0;i<2;i++)
    {
        printf("Enter the name age experience and  salary");
        scanf("%s %d %d %d",&tech[i].name,&tech[i].age,&tech[i].experience,&tech[i].salary);
    }
    for(i=0;i<2;i++)
    {
        printf("name of %d teacher whose name is %s of age %d and having experience %d got salary %d",i,tech[i].name,tech[i].age,tech[i].experience,tech[i].salary);
        printf("\n");
    }
    return 0;
}