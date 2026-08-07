#include<stdio.h>
#define FBAAP(FNAME,DATATYPE) \
DATATYPE FNAME(DATATYPE X,DATATYPE Y){if(X>Y){printf("THE first character %d IS GREATEST",X);}else{printf("THE second character  %d IS GREATEST",Y);}}

FBAAP(max_int,int);
int main()
{
max_int(5,10);
}