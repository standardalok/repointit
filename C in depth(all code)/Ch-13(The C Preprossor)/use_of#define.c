#include<stdio.h>
#define sum(x,y) ((x)+(y))
#define AND &&
#define OR ||
int main()
{
    int l;
    printf("ENTER THE NUMBER:");
    scanf("%d",&l);
    if(l>=0 OR l<=10)
    {
        printf("entered number is correct");
    }
    return 0;
}