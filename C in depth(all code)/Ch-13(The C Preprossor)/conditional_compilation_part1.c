#include<stdio.h>
#define FLAG 8
int main()
{
    #if defined(FLAG)
        printf("YESSS DEFINED\n");
    #endif
    #if FLAG>8
        printf("value of the flag is greater than 3");
    #elif FLAG==8
        printf("the value is 8");
    #else
        printf("the value is less than 3");
     

    #endif
    return 0;
}